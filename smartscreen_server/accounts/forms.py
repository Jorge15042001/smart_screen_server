from django import forms
from django.contrib.auth.forms import UserCreationForm


from .models import ScreenUser


class SignUpForm(UserCreationForm):
    class Meta:
        model = ScreenUser
        fields = ['first_name',
                  'last_name',
                  'username',
                  'email',
                  'is_screen_admin',
                  'is_screen_receptionist']
