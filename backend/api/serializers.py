from rest_framework import serializers
from .models import CustomUser, Category, Product, Order, OrderItem, CartItem, Cart
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'price', 'stock', 'image', 'category']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
        return None

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'slug']

class UserRegistrationSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['email', 'password1', 'password2']

    def validate_email(self, value):
        if get_user_model().objects.filter(email=value).exists():
            raise serializers.ValidationError("Un utilisateur avec cet email existe déjà.")
        return value

    def validate(self, data):
        if data['password1'] != data['password2']:
            raise serializers.ValidationError({
                "password2": "Les mots de passe ne correspondent pas."
            })
        return data

    def create(self, validated_data):
        try:
            email = validated_data['email']
            username = email.split('@')[0]
            
            # Générer un username unique
            base_username = username
            counter = 1
            while get_user_model().objects.filter(username=username).exists():
                username = f"{base_username}{counter}"
                counter += 1

            user = get_user_model().objects.create_user(
                username=username,
                email=email,
                password=validated_data['password1']
            )
            # Spécifier le backend
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            return user
        except Exception as e:
            raise serializers.ValidationError(str(e))

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        user = authenticate(
            self.context['request'],
            username=data['email'],  # Django utilise username en interne
            email=data['email'],
            password=data['password']
        )
        
        if not user:
            raise serializers.ValidationError("Email ou mot de passe incorrect")
        
        data['user'] = user
        return data

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'total_amount', 'status', 'created_at']

class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'added_at']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'created_at', 'updated_at']
