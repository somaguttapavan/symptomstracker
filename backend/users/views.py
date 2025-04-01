
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny

class RegisterView(APIView):
    """
    API endpoint for user registration.
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        # Get user data from request
        username = request.data.get('email')
        email = request.data.get('email')
        password = request.data.get('password')
        name = request.data.get('name')
        
        # Validate input
        if not all([username, email, password, name]):
            return Response(
                {"error": "Please provide all required fields"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if user already exists
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "User with this email already exists"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create new user
        try:
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                first_name=name.split()[0],
                last_name=' '.join(name.split()[1:]) if len(name.split()) > 1 else ''
            )
            
            return Response(
                {"message": "User created successfully"}, 
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class LoginView(APIView):
    """
    API endpoint for user login.
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        
        # Get user by email
        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username
        except User.DoesNotExist:
            return Response(
                {"error": "Invalid credentials"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        
        # Authenticate user
        user = authenticate(username=username, password=password)
        
        if user:
            # Get or create token
            token, created = Token.objects.get_or_create(user=user)
            
            return Response({
                "token": token.key,
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": f"{user.first_name} {user.last_name}".strip()
                }
            })
        else:
            return Response(
                {"error": "Invalid credentials"}, 
                status=status.HTTP_401_UNAUTHORIZED
            )

class GoogleLoginView(APIView):
    """
    API endpoint for Google OAuth login.
    """
    permission_classes = [AllowAny]
    
    def post(self, request):
        # In a real implementation, you would verify the Google token
        # and extract user information from it
        
        # Mock implementation for development
        google_token = request.data.get('token')
        if not google_token:
            return Response(
                {"error": "No Google token provided"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Mock user data that would come from Google
        email = request.data.get('email', 'user@gmail.com')
        name = request.data.get('name', 'Google User')
        
        # Get or create user
        try:
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': email,
                    'first_name': name.split()[0],
                    'last_name': ' '.join(name.split()[1:]) if len(name.split()) > 1 else ''
                }
            )
            
            # Create token
            token, _ = Token.objects.get_or_create(user=user)
            
            return Response({
                "token": token.key,
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "name": f"{user.first_name} {user.last_name}".strip()
                }
            })
        except Exception as e:
            return Response(
                {"error": str(e)}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
