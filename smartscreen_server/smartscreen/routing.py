from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/receptionist_loby/(?P<recptionist>\w+)/$",
            consumers.ReceptionistLobySocket.as_asgi()),
    re_path(r"ws/smartscreen_gui/(?P<screen_id>\w+)/$",
            consumers.ScreenGuiSocket.as_asgi()),
    re_path(r"ws/receptionist_gui/(?P<screen_id>\w+)/$",
            consumers.RecptionisGuiSocket.as_asgi()),
]
