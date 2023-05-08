let url = `ws://${window.location.host}/ws/admin_loby/${admin_id}/`;
const adminSocket = new WebSocket(url);

const sendStatusToServer = function() {
  adminSocket.send(
    JSON.stringify(
      {
        'msg_type': "admingui.status",
        "status": "Active"
      }
    )
  )
}

const list_screens = document.getElementById("list_screens");

adminSocket.onopen = () => {
  sendStatusToServer();
};
function getScreenRow(id) {
  for (elem of list_screens.children) {
    const screen_id = elem.getElementsByClassName("screen_id")[0].innerText;
    if (screen_id === id) {
      return elem;
    }
  }
}


adminSocket.onmessage = function(e) {
  let data = JSON.parse(e.data)

  if (data.msg_type === 'screenhardware.status') {
    console.log("Screen connected")
    const elem = getScreenRow(data.screen)
    if (data.status === "waiting"){
      elem.getElementsByClassName("screen_status")[0].innerText = "Waiting"
    }
    else if (elem.getElementsByClassName("screen_status")[0].innerText !== "Waiting"){
      elem.getElementsByClassName("screen_status")[0].innerText = data.status
    }
  }
  if (data.msg_type === 'screenhardware.disconnected') {
    const elem = getScreenRow(data.screen)
    elem.getElementsByClassName("screen_status")[0].innerText = "Disconnected"
  }
  if (data.msg_type === 'screenhardware.personconnected') {
    const elem = getScreenRow(data.screen)
    elem.getElementsByClassName("screen_status")[0].innerText = "Waiting"
  }
  if (data.msg_type === 'screenhardware.personleaves') {
    const elem = getScreenRow(data.screen)
    elem.getElementsByClassName("screen_status")[0].innerText = "Disconnected"
  }
}

setInterval(() => {
  sendStatusToServer();
}, 5000);


