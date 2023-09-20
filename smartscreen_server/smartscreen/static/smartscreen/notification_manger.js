class NotificationManager {
  constructor(notificaion_center_id) {
    this.notification_center_elem = document.getElementById(notificaion_center_id);
    this.active = false;
    this.timeout = undefined;
    this.message_tag = null;
  }
  pushNotificaiton(message) {
    if (this.active) {
      this.clearNotification();
    };

    this.notification_center_elem.style.display = "flex";

    this.message_tag = document.createElement("p");
    this.message_tag.innerText = message;

    this.notification_center_elem.children[0].appendChild(this.message_tag)

    this.active = true;

    this.timeout = setTimeout(() => this.clearNotification(), 3000);

  }
  clearNotification() {
    if (!this.active) return;

    this.notification_center_elem.style.display = "none";
    this.notification_center_elem.children[0].removeChild(this.message_tag)
    this.active = false;
    this.timeout = undefined;
    this.message_tag = null;
  }
};

const notificationManager= new NotificationManager("notification_center_wrapper");
