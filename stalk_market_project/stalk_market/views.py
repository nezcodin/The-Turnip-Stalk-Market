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
from django.http import HttpResponse, Http404
from django.conf import settings
import os
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
import json

# Create your views here.

class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'id'

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


# @login_required
# def update_post(request, pk):
#     post = Post.objects.get(pk=pk)
#     user_data = json.loads(request.body.decode('utf-8'))['user']
#     user = User.objects.get(pk=user_data['id'])
#     post.user = user
#     # ... update other fields and save post ...
#     print(request.data)  

class PostComments(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        post_id = self.kwargs['pk']
        return Comment.objects.filter(post_id=post_id)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

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
        