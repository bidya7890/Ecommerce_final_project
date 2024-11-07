from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView  # Import APIView here
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from .models import Product, Cart, Order
from .serializer import ProductSerializer, CartSerializer, OrderSerializer, UserSerializer, UserCreateSerializer
from decimal import Decimal
from rest_framework.exceptions import ValidationError

from rest_framework.decorators import action
from django.db.models import Q  # For filtering




class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserCreateViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]  # Allow any user to register

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    @action(detail=False, methods=['get'], url_path='sort-price')
    def sort_by_price(self, request):
        # Filter products sorted by price low to high
        sorted_products = self.queryset.order_by('price')
        serializer = self.get_serializer(sorted_products, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='filter-price')
    def filter_by_price(self, request):
        min_price = request.query_params.get('min_price', None)
        if min_price is not None:
            try:
                min_price = Decimal(min_price)
                filtered_products = self.queryset.filter(price__gte=min_price)
                serializer = self.get_serializer(filtered_products, many=True)
                return Response(serializer.data)
            except Decimal.InvalidOperation:
                return Response({'error': 'Invalid price format'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'error': 'min_price parameter is required'}, status=status.HTTP_400_BAD_REQUEST)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [permissions.AllowAny]  # Allow any user to access

    def create(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        try:
            product = Product.objects.get(id=product_id)
            cart_item, created = Cart.objects.get_or_create(
                product=product,
                defaults={'quantity': quantity}
            )
            if not created:
                cart_item.quantity += quantity
                cart_item.save()

            return Response({'message': 'Product added to cart', 'cart_item': CartSerializer(cart_item).data}, status=status.HTTP_201_CREATED)

        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)


# class OrderViewSet(viewsets.ModelViewSet):
#     queryset = Order.objects.all()
#     serializer_class = OrderSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can create orders

    def create(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return Response({'error': 'User must be logged in to place an order.'}, status=status.HTTP_401_UNAUTHORIZED)
        
        user = request.user  # Now we can be sure it's a User instance
        total_amount = request.data.get('total_amount')
        payment_method = request.data.get('payment_method')
        cart_items = request.data.get('items')

        if not total_amount or not payment_method:
            return Response({'error': 'Missing payment method or total amount'}, status=status.HTTP_400_BAD_REQUEST)

        # Create the order and assign the authenticated user
        order = Order.objects.create(
            user=user,
            total_amount=total_amount,
            payment_method=payment_method,
        )

        # Add products to the order
        for item in cart_items:
            cart_item = Cart.objects.get(id=item['id'])
            order.products.add(cart_item)

        # Return the created order data with correct total_amount and user
        return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)    
    

class LoginView(APIView):  # LoginView inherits from APIView
    permission_classes = [permissions.AllowAny]  # Allow any user to login

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
