from django.urls import path
from . import views
from .views import RegisterView, LoginView, UserView, LogoutView, PostComments

urlpatterns = [
    path('users/', views.UserList.as_view(), name='users_list'),
    path('users/<int:user_id>/', views.UserDetail.as_view(), name='user_detail'),

    path('posts/', views.PostList.as_view(), name='posts_list'),
    path('posts/<int:pk>/', views.PostDetail.as_view(), name='post_detail'),
    path('posts/<int:pk>/comments', views.PostComments.as_view(), name='post_comments_list'),

    path('comments/', views.CommentList.as_view(), name='comments_list'),
    path('comments/<int:pk>/', views.CommentDetail.as_view(), name='comment_detail'),
    
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('user/', UserView.as_view()),
    path('logout/', LogoutView.as_view()),

]
