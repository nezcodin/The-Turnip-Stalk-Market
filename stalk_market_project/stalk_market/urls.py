from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('users/', views.UserList.as_view(), name='users_list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user_detail'),

    path('posts/', views.PostList.as_view(), name='posts_list'),
    path('posts/<int:pk>/', views.PostDetail.as_view(), name='post_detail'),

    path('comments/', views.CommentList.as_view(), name='comments_list'),
    path('comments/<int:pk>/', views.CommentDetail.as_view(), name='comment_detail'),


    path('token/', jwt_views.TokenObtainPairView.as_view(), name ='token_obtain_pair'),
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name ='token_refresh'),

    path('home/', views.HomeView.as_view(), name ='home'),

    path('logout/', views.LogoutView.as_view(), name ='logout')
]
