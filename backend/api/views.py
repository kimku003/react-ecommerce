from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout, get_user_model
from django.contrib.auth.backends import ModelBackend
from djstripe.models import Customer, PaymentIntent
from django.shortcuts import get_object_or_404
from .models import Product, Category, Order
from .serializers import ProductSerializer, CategorySerializer, UserRegistrationSerializer, UserLoginSerializer, OrderSerializer
import stripe
from django.conf import settings

stripe.api_key = settings.STRIPE_SECRET_KEY

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

class PaymentViewSet(viewsets.ViewSet):
    @action(detail=False, methods=['post'])
    def create_payment(self, request):
        try:
            # Récupérer ou créer le client Stripe
            customer, created = Customer.get_or_create(request.user)
            
            # Créer la commande
            order = Order.objects.create(
                user=request.user,
                stripe_customer=customer,
                total_amount=request.data['total_amount']
            )

            # Créer l'intention de paiement
            payment_intent = PaymentIntent.create(
                amount=int(float(order.total_amount) * 100),
                currency='eur',
                customer=customer.id,
                metadata={'order_id': order.id}
            )

            order.payment_intent = payment_intent
            order.save()

            return Response({
                'client_secret': payment_intent.client_secret,
                'order_id': order.id
            })

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'])
    def check_status(self, request, pk=None):
        order = get_object_or_404(Order, id=pk)
        return Response({
            'status': order.status,
            'payment_intent': order.payment_intent.status if order.payment_intent else None
        })

@api_view(['POST'])
def create_payment_intent(request):
    try:
        # Récupérer ou créer un client Stripe pour l'utilisateur connecté
        user = request.user
        customer, created = Customer.get_or_create(subscriber=user)

        # Créer une intention de paiement
        payment_intent = stripe.PaymentIntent.create(
            amount=int(request.data['amount'] * 100),  # Montant en centimes
            currency="eur",
            customer=customer.id,
            metadata={"user_id": user.id},
        )

        return Response({
            "client_secret": payment_intent.client_secret
        })
    except Exception as e:
        return Response({"error": str(e)}, status=400)
