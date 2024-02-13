from django.db import models

from django.contrib.auth.models import AbstractUser

# Create your models here.


class ScreenUser (AbstractUser):
    is_screen_admin = models.BooleanField(default=False)
    is_screen_receptionist = models.BooleanField(default=False)
