from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

urlpatterns = [
    path('users/', views.UserList.as_view(), name='users_list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user_detail'),

    path('posts/', views.PostList.as_view(), name='posts_list'),
    path('posts/<int:pk>/', views.PostDetail.as_view(), name='post_detail'),

    path('comments/', views.CommentList.as_view(), name='comments_list'),
    path('comments/<int:pk>/', views.CommentDetail.as_view(), name='comment_detail'),
]
