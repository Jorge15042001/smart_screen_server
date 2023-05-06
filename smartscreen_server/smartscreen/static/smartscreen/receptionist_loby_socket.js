let url = `ws://${window.location.host}/ws/receptionist_loby/${receptionist}/`;
const alertSocket = new WebSocket(url);

const sendStatusToServer = function(){
  alertSocket.send(
    JSON.stringify(
      {
        'msg_type': "receptionistgui.status",
        "status": "Active"
      }
    )
  )
}

const list_screens = document.getElementById("list_screens");
document.getElementsByClassName

alertSocket.onopen=()=>{
  sendStatusToServer();
};
function getScreenRow(id){
  for (elem of list_screens.children){
    const screen_id = elem.getElementsByClassName("screen_id")[0].innerText;
    if(screen_id===id){
      return elem;
    }
  }
}

alertSocket.onmessage = function(e) {
  let data = JSON.parse(e.data)

  if (data.msg_type=== 'screengui.status') {
    const elem = getScreenRow(data.screen)
    elem.getElementsByClassName("screen_status")[0].innerText = data.status
  }
  if (data.msg_type=== 'screengui.disconnected') {
    const elem = getScreenRow(data.screen)
    elem.getElementsByClassName("screen_status")[0].innerText = "Disconnected"
  }
}

setInterval(() => {
  sendStatusToServer();
}, 5000);


