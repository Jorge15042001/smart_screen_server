from django import forms
from django.contrib.auth.forms import UserCreationForm


from .models import ScreenUser


class SignUpForm(UserCreationForm):
    #  username = forms.CharField(label="Username", max_length=50)
    #  email = forms.EmailField(label="Email", max_length=50)
    class Meta:

        model = ScreenUser
        fields = ['first_name',
                  'last_name',
                  'username',
                  'email',
                  'is_screen_admin',
                  'is_screen_receptionist']
