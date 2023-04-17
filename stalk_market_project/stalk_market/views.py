from django.shortcuts import render
from .models import User, Post, Comment
from .serializers import UserSerializer, PostSerializer, CommentSerializer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.views import View
from django.views.generic import View
from django.http import HttpResponse, Http404, HttpRequest
from django.conf import settings
import os
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .forms import PostForm
from django.urls import reverse_lazy
from django.views.generic.edit import CreateView
from rest_framework.generics import CreateAPIView



# Create your views here.

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'  # or lookup_field = 'id'

    def get_object(self):
        user_id = self.kwargs.get('user_id')
        user = User.objects.get(id=user_id)
        return user

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, context={'request': request})
        return Response(serializer.data)
    

class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer 

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    # def get_object(self):
    #     post_id = self.kwargs.get('post_id')
    #     post = Post.objects.get(id=post_id)
    #     return post

    # def get(self, request, *args, **kwargs):
    #     instance = self.get_object()
    #     serializer = self.get_serializer(instance, context={'request': request})
    #     return Response(serializer.data)
    
    # def post(self, request):
    #     user = request.user  # get the user object from the request
    #     post_data = request.data
    #     post_data['user_id'] = user.id  # set the user_id field to the id of the user object
    #     serializer = PostSerializer(data=post_data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     else:
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        # email is unique, so we find the first user with that email
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found!')
        
        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password!')
        
        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow(),
            'username': user.username
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token
        }
        
        return response
    
class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated.')

        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated.')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'Logout successful.'
        }

        return response
    
class PostPicsView(View):
    def post(self, request, *args, **kwargs):
        file = request.FILES['image']
        fs = FileSystemStorage()
        filename = fs.save(file.name, file)
        uploaded_file_url = fs.url(filename)
        return JsonResponse({'image_url': uploaded_file_url})
    
class GetImageView(View):
    def get(self, request, *args, **kwargs):
        image_name = kwargs.get('image_name')
        image_path = os.path.join(settings.MEDIA_ROOT, image_name)
        if os.path.exists(image_path):
            with open(image_path, 'rb') as f:
                image_data = f.read()
            return HttpResponse(image_data, content_type='image/png')
        else:
            raise Http404("Image not found")

# class PostCreateView(CreateView):
#     model = Post
#     form_class = PostForm
#     template_name = 'post_form.html'
#     success_url = reverse_lazy('posts')

#     def form_valid(self, form):
#         print(self.request.user)
#         form.instance.user = self.request.user
#         form.instance.island_name = self.request.user.island_name 
#         return super().form_valid(form)

#     def form_invalid(self, form):
#         messages.error(self.request, 'Error: Please check your input.')
#         return super().form_invalid(form)

# class PostCreateAPIView(CreateAPIView):
#     serializer_class = PostSerializer

#     def perform_create(self, serializer):
#         # Set the user ID on the Post object
#         serializer.validated_data['user_id'] = self.request.data['user_id']
#         serializer.save()

