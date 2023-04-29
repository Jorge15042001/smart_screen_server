from django.db import models

# Create your models here.


class SmartScreen(models.Model):
    name = models.CharField(max_length=30)
    admin = models.ForeignKey("accounts.ScreenUser",
                              on_delete=models.CASCADE,
                              related_name="admin",
                              limit_choices_to={"is_screen_admin": True},
                              editable=False,
                              )
    attender = models.ForeignKey("accounts.ScreenUser",
                                 on_delete=models.SET_NULL,
                                 null=True,
                                 related_name="attender",
                                 limit_choices_to={
                                     "is_screen_receptionist": True}
                                 )
    #  uuid = models.CharField(max_length=36,editable=False) # to use as room id
    #  @override
    #  def save_model():


class SmartScreenConnection(models.Model):
    screen = models.ForeignKey(SmartScreen, on_delete=models.DO_NOTHING, editable=False)
    date = models.DateTimeField(auto_now=True)
    #  time = models.IntegerField()
