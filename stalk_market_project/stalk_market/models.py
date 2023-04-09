from django.db import models

# Create your models here.

class User(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=20)
    email = models.EmailField()
    friend_code = models.IntegerField(null=True, blank=True)
    island_name = models.CharField(max_length=10)
    profile_picture = models.FileField(upload_to='assets/profile_pics/', default='assets/default_profile_pic.jpg')
    bio = models.CharField(max_length=500, null=True, default='No bio.')

    def __str__(self):
        return self.username
    
class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='posts_author')
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
  author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
  post_id = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
  text_body = models.CharField(max_length=500)
  date = models.DateField(auto_now_add=True)
  time = models.TimeField(auto_now_add=True)
  parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='replies')

  def __str__(self):
        return self.text_body

