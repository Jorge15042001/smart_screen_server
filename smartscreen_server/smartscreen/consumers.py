import json

from .models import SmartScreen
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync


#  class ChatConsumer(WebsocketConsumer):
#      def connect(self):
#          self.accept()
#          print("accept")
#
#      def disconnect(self, close_code):
#          pass
#
#      def receive(self, text_data):
#          text_data_json = json.loads(text_data)
#          message = text_data_json["message"]
#
#          self.send(text_data=json.dumps({"message": message}))
#
def reply_to_messge(msg, channel, channel_name=None):
    type: str = msg['msg_type']
    channel_group_name = channel_name if channel_name is not None else channel.room_group_name
    if type.endswith("status"):
        async_to_sync(channel.channel_layer.group_send)(
            channel_group_name,
            {
                'type': "reply.all",
                **msg
            }
        )
    if type.endswith("disconnected"):
        async_to_sync(channel.channel_layer.group_send)(
            channel_group_name,
            {
                'type': "reply.all",
                **msg
            }
        )

    if type.endswith("id"):
        async_to_sync(channel.channel_layer.group_send)(
            channel_group_name,
            {
                'type': "reply.all",
                **msg
            }
        )
    if type == "screenhardware.personconnected":
        async_to_sync(channel.channel_layer.group_send)(
            channel_group_name,
            {
                'type': "reply.all",
                **msg
            }
        )
    if type == "screenhardware.personleaves":
        async_to_sync(channel.channel_layer.group_send)(
            channel_group_name,
            {
                'type': "reply.all",
                **msg
            }
        )


class ScreenGuiSocket(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        screen_id = int(self.scope["url_route"]["kwargs"]["screen_id"])

        screen = SmartScreen.objects.filter(id=screen_id).first()
        self.screen = screen

        #  self.room_name = f"{screen.attender.username}"
        self.room_name = f"screen.{screen_id}"
        self.room_group_name = f"{self.room_name}"
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        payload = {
            "msg_type": "screengui.disconnected",
            "screen": str(self.screen.id)
        }

        reply_to_messge(payload, self)
        reply_to_messge(payload, self,
                        f"recep.{self.screen.attender.username}"
                        )

    def receive(self, text_data):
        message = json.loads(text_data)
        reply_to_messge(message, self)
        # foward messages to receptionist
        reply_to_messge(message, self,
                        f"recep.{self.screen.attender.username}")

    def reply_all(self, event):
        self.send(text_data=json.dumps(event))


class ReceptionistLobySocket(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]

        self.room_name = f"recep.{self.user.username}"
        self.room_group_name = self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        message = json.loads(text_data)
        reply_to_messge(message, self)

    def reply_all(self, event):
        self.send(text_data=json.dumps(event))

class AdminLobySocket(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]

        self.room_name = f"admin.{self.user.username}"
        self.room_group_name = self.room_name
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        message = json.loads(text_data)
        reply_to_messge(message, self)

    def reply_all(self, event):
        self.send(text_data=json.dumps(event))



class RecptionistGuiSocket(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        screen_id = int(self.scope["url_route"]["kwargs"]["screen_id"])

        screen = SmartScreen.objects.filter(id=screen_id).first()
        self.screen = screen

        self.room_name = f"screen.{screen_id}"
        self.room_group_name = f"{self.room_name}"
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        reply_to_messge({"msg_type": "receptionistgui.disconnected",
                        "screen": str(self.screen.id)}, self)

    def receive(self, text_data):
        message = json.loads(text_data)
        reply_to_messge(message, self)

    def reply_all(self, event):
        self.send(text_data=json.dumps(event))


class ScreenHardwareController(WebsocketConsumer):
    def connect(self):
        #  self.user = self.scope[]
        screen_id = int(self.scope["url_route"]["kwargs"]["screen_id"])

        screen = SmartScreen.objects.filter(id=screen_id).first()
        self.screen = screen

        self.room_name = f"screen.{screen_id}"
        self.room_group_name = f"{self.room_name}"
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name, self.channel_name
        )

        self.accept()

    def disconnect(self, close_code):
        payload = {
            "msg_type": "screenhardware.disconnected",
            "screen": str(self.screen.id)
        }

        reply_to_messge(payload, self)
        reply_to_messge(payload, self,
                        f"recep.{self.screen.attender.username}"
                        )
        reply_to_messge(payload, self,
                        f"admin.{self.screen.admin.username}"
                        )

    def receive(self, text_data):
        message = json.loads(text_data)
        reply_to_messge(message, self)
        # foward messages to receptionist
        reply_to_messge(message, self,
                        f"recep.{self.screen.attender.username}")
        reply_to_messge(message, self,
                        f"admin.{self.screen.admin.username}")

    def reply_all(self, event):
        self.send(text_data=json.dumps(event))
