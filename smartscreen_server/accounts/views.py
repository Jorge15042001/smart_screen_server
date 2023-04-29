from django.shortcuts import render, HttpResponseRedirect, get_object_or_404
from django.urls import reverse_lazy
from django.views import generic

from .forms import SignUpForm
from .models import ScreenUser


# Create your views here.


class SignUpView(generic.CreateView):
    form_class = SignUpForm
    success_url = reverse_lazy("login")
    template_name = "registration/signup.html"


class ProfileView(generic.DetailView):
    model = ScreenUser
    fields = ['first_name', 'last_name',
              'is_screen_admin', 'is_screen_receptionist']
    template_name = 'registration/view.html'


    def get_object(self, queryset=None):
        return get_object_or_404(self.model, pk=self.request.user.pk)

class UpdateView(generic.UpdateView):
    model = ScreenUser
    fields = ['first_name', 'last_name',
              'is_screen_admin', 'is_screen_receptionist']
    template_name = 'registration/update.html'
    success_url = '/accounts/view'

    def get_object(self, queryset=None):
        return get_object_or_404(self.model, pk=self.request.user.pk)
