from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission

# Create your models here.

class User(AbstractUser):
    username = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    friend_code = models.IntegerField(null=True, blank=True)
    island_name = models.TextField(max_length=10)
    profile_picture = models.FileField(upload_to='assets/profile_pics/', default='assets/default_profile_pic.jpg', max_length=255)
    bio = models.CharField(max_length=500, null=True, default='No bio.')

    USERNAME_FIELD = 'email'

    REQUIRED_FIELDS = []

    groups = models.ManyToManyField(Group, blank=True, related_name='custom_user_groups')
    user_permissions = models.ManyToManyField(Permission, blank=True, related_name='custom_user_user_permissions')

    
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts')
    island_name = models.CharField(max_length=10)
    title = models.CharField(max_length=50)
    turnip_price = models.IntegerField()
    post_picture = models.FileField(upload_to='post_pics/')
    description = models.TextField(null=True, blank=True)
    date = models.DateField(auto_now_add=True)
    time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
  post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
  text_body = models.CharField(max_length=500)
  date = models.DateField(auto_now_add=True)
  time = models.TimeField(auto_now_add=True)
  parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')

  def __str__(self):
        return self.text_body
