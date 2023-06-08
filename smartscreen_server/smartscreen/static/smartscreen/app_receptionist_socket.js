let url = `wss://${window.location.host}/ws/receptionist_gui/${screen_id}/`
const receptionistSocket = new WebSocket(url)

const sendStatusToServer = function() {
  receptionistSocket.send(
    JSON.stringify(
      {
        'msg_type': "receptionistgui.status",
        "screen": screen_id,
        "status": "Active",
      }
    )
  )
}

receptionistSocket.onopen = () => {
  sendStatusToServer();

  setInterval(() => {
    sendStatusToServer();
  }, 5000);

  receptionistSocket.onmessage = function(e) {
    let data = JSON.parse(e.data)

    if (data.msg_type === 'screengui.status') {
      console.log("status received from screengui")
    }
    if (data.msg_type === 'screengui.disconnected') {
      // screen_video = document.createElement("video")
      screenDisonnectedCallback();
    }
    if (data.msg_type === 'screengui.id') {
      console.log("screengui id", data)
      screenConnectedCallback(data["id"]);
    }
  }
};
