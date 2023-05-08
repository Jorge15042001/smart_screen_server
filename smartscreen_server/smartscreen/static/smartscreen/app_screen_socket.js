let url = `ws://${socket_host}/ws/smartscreen_gui/${screen_id}/`
const screenSocket = new WebSocket(url)

const sendStatusToServer = function(){
  screenSocket.send(
    JSON.stringify(
      { 
        'msg_type': "screengui.status",
        "screen": screen_id ,
        "status": "Active",
      }
    )
  ) 
}

screenSocket.onopen=()=>{
  sendStatusToServer();
};

setInterval(() => {
  sendStatusToServer();
}, 5000);

screenSocket.onmessage = function(e) {
  let data = JSON.parse(e.data)

  if (data.msg_type=== 'receptionistgui.status') {
    console.log("status received from screengui")
  }
  if (data.msg_type=== 'receptionistgui.disconnected') {
    console.log("receptionistgui disconnected")
  }
  if (data.msg_type === 'receptionistgui.id') {
    console.log("receptionistgui id", data)
    receptionistConnectedCallback(data["id"])
  }
}
