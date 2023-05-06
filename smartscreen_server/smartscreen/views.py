from django.shortcuts import render, redirect
from django.views import generic
from django.urls import reverse_lazy

#  from .forms import SmartScreenCreationForm
from .models import SmartScreen
# Create your views here.


def home(request):
    print(request.user.is_authenticated)
    if not request.user.is_authenticated:
        return redirect("login")
    if request.user.is_screen_admin:
        return redirect("list_screens_admin")
    if request.user.is_screen_receptionist:
        return redirect("list_screens_receptionist")
    return redirect("profile_view")


class SmartScreenList(generic.ListView):
    model = SmartScreen
    context_object_name = 'screens'
    template_name = "smartscreen/list.html"

    def get_queryset(self):
        return SmartScreen.objects.filter(admin=self.request.user)


class SmartScreenCreation(generic.CreateView):
    model = SmartScreen
    fields = ["name", "attender"]
    success_url = reverse_lazy("list_screens_admin")
    template_name = 'smartscreen/creation.html'

    def form_valid(self, form):
        form.instance.admin = self.request.user
        return super().form_valid(form)


class SmartScreenEdit(generic.UpdateView):
    model = SmartScreen
    fields = ["name", "attender"]
    success_url = reverse_lazy("list_screens_admin")
    template_name = 'smartscreen/update.html'

    def form_valid(self, form):
        form.instance.admin = self.request.user
        return super().form_valid(form)


class SmartScreenDelete(generic.DeleteView):
    model = SmartScreen
    success_url = reverse_lazy("list_screens_admin")
    template_name = 'smartscreen/delete.html'


class SmartScreenListReceptionist(generic.ListView):
    model = SmartScreen
    context_object_name = 'screens'
    template_name = "smartscreen/list_receptionist.html"

    def get_queryset(self):
        return SmartScreen.objects.filter(attender=self.request.user)


def screen_app(request, screen_id):
    screen = SmartScreen.objects.filter(id=screen_id).first()
    return render(request, "smartscreen/app_screen.html", {"screen": screen})

def receptionist_app(request, screen_id):
    screen = SmartScreen.objects.filter(id=screen_id).first()
    return render(request, "smartscreen/app_receptionist.html", {"screen": screen})
