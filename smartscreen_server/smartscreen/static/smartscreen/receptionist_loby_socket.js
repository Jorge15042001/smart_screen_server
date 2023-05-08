let url = `ws://${socket_host}/ws/receptionist_loby/${receptionist}/`;
const alertSocket = new WebSocket(url);

const sendStatusToServer = function() {
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

alertSocket.onopen = () => {
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


alertSocket.onmessage = function(e) {
  let data = JSON.parse(e.data)

  if (data.msg_type === 'screengui.status') {
    console.log("Screen connected")
    const elem = getScreenRow(data.screen)
    if (elem.getElementsByClassName("screen_status")[0].innerText !== "Waiting")
      elem.getElementsByClassName("screen_status")[0].innerText = data.status
  }
  if (data.msg_type === 'screenhardware.status') {
    console.log("Screen connected")
    const elem = getScreenRow(data.screen)
    // if (elem.getElementsByClassName("screen_status")[0].innerText !== "Waiting")
    if (data.status === "waiting"){
      elem.classList.add("animate-pulse-alert")
      elem.getElementsByClassName("screen_status")[0].innerText = data.status
    }
  }
  if (data.msg_type === 'screengui.disconnected') {
    console.log("Screen disconnected")
    const elem = getScreenRow(data.screen)

    if (elem.getElementsByClassName("screen_status")[0].innerText !== "Waiting")
      elem.getElementsByClassName("screen_status")[0].innerText = "Disconnected"
  }
  if (data.msg_type === 'screenhardware.personconnected') {
    console.log("Person detected")
    console.log(data)
    const elem = getScreenRow(data.screen)
    elem.classList.add("animate-pulse-alert")
    elem.getElementsByClassName("screen_status")[0].innerText = "Waiting"
  }
  if (data.msg_type === 'screenhardware.personleaves') {
    console.log("personleaves")
    const elem = getScreenRow(data.screen)
    elem.getElementsByClassName("screen_status")[0].innerText = "Disconnected"
    elem.classList.remove("animate-pulse-alert")
  }
}

setInterval(() => {
  sendStatusToServer();
}, 5000);


