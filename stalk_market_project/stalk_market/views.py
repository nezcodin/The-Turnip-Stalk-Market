from django.shortcuts import render, redirect
from .models import User, Post, Comment
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .forms import UserForm

User = get_user_model()

# Create your views here.

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class HomeView(APIView):
    permission_classes = (IsAuthenticated, )   
    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React JS & Django!'}   
        return Response(content)

class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)

# class RegisterView(APIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request):
#         form = UserForm(request.POST, request.FILES)
#         if form.is_valid():
#             form.save()
#             return redirect('users')  # redirect to login page after successful registration
#         else:
#             return render(request, 'register.html', {'form': form})
    
#     def get(self, request):
#         form = UserForm()
#         return render(request, 'register.html', {'form': form})
     
class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        form = UserForm(request.POST, request.FILES)
        if form.is_valid():
            # Create a new User object with the validated data
            user = User(
                username=form.cleaned_data['username'],
                password=form.cleaned_data['password'],
                email=form.cleaned_data['email'],
                friend_code=form.cleaned_data['friend_code'],
                island_name=form.cleaned_data['island_name'],
                profile_picture=request.FILES.get('profile_picture', None),
                bio=form.cleaned_data['bio'],
            )
            print(user)
            # Save the new user object to the database
            user.save()
            # Redirect to the login page
            return Response(status=status.HTTP_201_CREATED)
        else:
            # If the form is not valid, return an error response
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)