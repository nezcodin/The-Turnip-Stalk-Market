from rest_framework import serializers
from .models import User, Post, Comment

class UserSerializer(serializers.HyperlinkedModelSerializer):
    posts = serializers.HyperlinkedRelatedField(
        view_name='post_detail',
        many=True,
        read_only=True
    )
    comments = serializers.HyperlinkedRelatedField(
        view_name='comment_detail',
        many=True,
        read_only=True
    )
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'friend_code', 'island_name', 'profile_picture', 'bio', 'posts', 'comments')

class PostSerializer(serializers.HyperlinkedModelSerializer):
    comments = serializers.HyperlinkedRelatedField(
        view_name='comment_detail',
        many=True,
        read_only=True
    )
    user = serializers.HyperlinkedRelatedField(
        view_name='user_detail',
        read_only=True
    )
    class Meta:
        model = Post
        fields = ('id', 'island_name', 'title', 'turnip_price', 'post_picture', 'description', 'date', 'time', 'comments', 'user')

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    user = serializers.HyperlinkedRelatedField(
        view_name='user_detail',
        read_only=True
    )
    post = serializers.HyperlinkedRelatedField(
        view_name='post_detail',
        read_only=True
    )
    parent_comment = serializers.HyperlinkedRelatedField(
        view_name='comment_detail',
        lookup_field='pk',
        read_only=True
    )
    class Meta:
        model = Comment
        fields = ('id', 'post_id', 'text_body', 'date', 'time', 'parent_comment', 'user', 'post')

