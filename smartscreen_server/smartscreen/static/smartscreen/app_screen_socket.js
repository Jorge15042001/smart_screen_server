let url = `wss://${window.location.host}/ws/smartscreen_gui/${screen_id}/`
const screenSocket = new WebSocket(url)

const sendStatusToServer = function() {
  screenSocket.send(
    JSON.stringify(
      {
        'msg_type': "screengui.status",
        "screen": screen_id,
        "status": "Active",
      }
    )
  )
}

screenSocket.onopen = () => {
  sendStatusToServer();

  setInterval(() => {
    sendStatusToServer();
  }, 5000);

  screenSocket.onmessage = function(e) {
    let data = JSON.parse(e.data)

    if (data.msg_type === 'receptionistgui.status') {
      console.log("status received from screengui")
    }
    if (data.msg_type === 'receptionistgui.disconnected') {
      receptionistDisConnectedCallback();
      notificationManager.pushNotification("Se perdió la conexión con receptionista, espere un momento ...");
      statusManager.setStatus("Restableciendo conexión ...", false);
    }
    if (data.msg_type === 'receptionistgui.id') {
      console.log("receptionistgui id", data)
      notificationManager.pushNotification("Estableciendo conexión con recepcionista, espere un momento por favor...");
      statusManager.setStatus("Conectando...")
      receptionistConnectedCallback(data["id"])
    }
  }
};
