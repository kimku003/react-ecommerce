from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.backends import ModelBackend
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer, UserRegistrationSerializer, UserLoginSerializer

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AuthViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def register(self, request):
        print("Données reçues:", request.data)
        serializer = UserRegistrationSerializer(data=request.data)
        
        # Vérifions d'abord si l'utilisateur existe
        User = get_user_model()
        email = request.data.get('email')
        if User.objects.filter(email=email).exists():
            return Response({
                "message": "Un compte existe déjà avec cet email. Veuillez vous connecter."
            }, status=status.HTTP_400_BAD_REQUEST)
            
        if serializer.is_valid():
            try:
                user = serializer.save()
                # Spécifier le backend lors de la connexion
                login(request, user, backend='django.contrib.auth.backends.ModelBackend')
                return Response({
                    "message": "Inscription et connexion réussies",
                    "email": user.email
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                print("Erreur création:", str(e))
                return Response({
                    "message": f"Erreur lors de l'inscription: {str(e)}"
                }, status=status.HTTP_400_BAD_REQUEST)
        print("Erreurs validation:", serializer.errors)
        return Response({
            "message": "Erreur de validation",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not email or not password:
            return Response({
                "message": "Email et mot de passe requis"
            }, status=status.HTTP_400_BAD_REQUEST)

        # Utiliser le backend ModelBackend explicitement
        user = authenticate(
            request, 
            username=email,
            password=password,
            backend='django.contrib.auth.backends.ModelBackend'
        )
        
        if user:
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            return Response({
                "message": "Connexion réussie",
                "email": user.email
            })
        else:
            # Vérifions si l'utilisateur existe
            User = get_user_model()
            user_exists = User.objects.filter(email=email).exists()
            
            if user_exists:
                return Response({
                    "message": "Mot de passe incorrect"
                }, status=status.HTTP_401_UNAUTHORIZED)
            else:
                return Response({
                    "message": "Aucun compte trouvé avec cet email"
                }, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=False, methods=['post'])
    def logout(self, request):
        logout(request)
        return Response({"message": "Déconnexion réussie"})
