from django.urls import path

from . import views

urlpatterns = [
    #  path("", views.index, name="index"),
    #  path("signup", views.signup, name="signup"),
    path("signup", views.SignUpView.as_view(), name="signup"),
]
