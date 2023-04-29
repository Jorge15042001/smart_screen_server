from django.urls import path

from . import views

urlpatterns = [
    path("signup", views.SignUpView.as_view(), name="signup"),
    path("view", views.ProfileView.as_view(), name="profile_view"),
    path("update", views.UpdateView.as_view(), name="update"),
]
