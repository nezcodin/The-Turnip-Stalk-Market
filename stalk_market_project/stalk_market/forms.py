from django import forms
from .models import User

class UserForm(forms.ModelForm):   
    email = forms.EmailField(max_length=254, help_text='Required. Enter a valid email address.')
    friend_code = forms.IntegerField(required=False, help_text='Do not include dashes.')
    island_name = forms.CharField(max_length=10)

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'friend_code', 'island_name']
