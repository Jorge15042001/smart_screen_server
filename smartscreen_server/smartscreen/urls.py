
from django.urls import path

from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("create", views.SmartScreenCreation.as_view(), name="create_screen"),
    path("list_screens_admin", views.SmartScreenList.as_view(), name="list_screens_admin"),
    path("delete_screen/<pk>", views.SmartScreenDelete.as_view(), name="delete_screen"),
    path("update_screen/<pk>", views.SmartScreenEdit.as_view(), name="edit_screen"),

    path("admin_screen/<screen_id>", views.screen_app, name="admin_app"),
    path("receptionist_screen/<screen_id>", views.receptionist_app, name="receptionist_app"),


    path("list_screens_receptionist", views.SmartScreenListReceptionist.as_view(), name="list_screens_receptionist"),
]
