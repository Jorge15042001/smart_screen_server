from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/receptionist_loby/(?P<recptionist>\w+)/$",
            consumers.ReceptionistLobySocket.as_asgi()),
    re_path(r"ws/admin_loby/(?P<admin>\w+)/$",
            consumers.AdminLobySocket.as_asgi()),
    re_path(r"ws/smartscreen_gui/(?P<screen_id>\w+)/$",
            consumers.ScreenGuiSocket.as_asgi()),
    re_path(r"ws/receptionist_gui/(?P<screen_id>\w+)/$",
            consumers.RecptionistGuiSocket.as_asgi()),
    re_path(r"ws/hardware_controller/(?P<screen_id>\w+)/$",
            consumers.ScreenHardwareController.as_asgi()),
]
