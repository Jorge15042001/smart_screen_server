let my_video = document.querySelector("#my_video");
let screen_video = document.querySelector("#video");
const toggle_mic_btn = document.getElementById("toggle_mic")
const toggle_cam_btn = document.getElementById("toggle_cam")
const end_call_btn = document.getElementById("end_call")

end_call_btn.onclick= ()=>{
  // window.location.href = `${window.location.host}/list_screens_receptionist}/`
  window.location.replace(`http://${window.location.host}/list_screens_receptionist`);
}

//object used to store peer connecteno to the smartscreen app
const screen_peer = null
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;


const myPeer = connectToPeerServer();

myPeer.on("open", id => {
  // socket.emit("join-room",ROOM_ID,id);
  setTimeout(() => {
    receptionistSocket.send(JSON.stringify({
      "msg_type": "receptionistgui.id",
      "id": id
    }));
  }, 3000 
  )
});

let screenConnectedCallback = (userId) => { console.log(`smartscreen connected with id ${userId} `)};
let screenDisonnectedCallback = () => { console.log("smartscreen disconnected")};


getUserMedia({
  video: true,
  audio: true 
}, stream => {
  stream.getVideoTracks()[0].enabled = false;
  // stream.getAudioTracks()[0].enabled = false;
  toggle_mic_btn.onclick = ()=>{
    const active = stream.getAudioTracks()[0].enabled ;
    if (active){
      stream.getAudioTracks()[0].enabled =false;
      toggle_mic_btn.style.backgroundColor = "gray";
    }
    else {
      stream.getAudioTracks()[0].enabled =true;
      toggle_mic_btn.style.backgroundColor = "white";
    }
  }
  toggle_cam_btn.onclick = ()=>{
    const active = stream.getVideoTracks()[0].enabled ;
    if (active){
      stream.getVideoTracks()[0].enabled =false;
      toggle_cam_btn.style.backgroundColor = "gray";
    }
    else {
      stream.getVideoTracks()[0].enabled =true;
      toggle_cam_btn.style.backgroundColor = "white";
    }
  }
  end_call.onclick = ()=>{
    window.location.replace("/list_screens_receptionist");
  }

  my_video.replaceChild(createVideo(true), my_video.children[0]);
  addVideoStream(my_video.children[0], stream);

  screenConnectedCallback = (userId) => {

    const call = myPeer.call(userId, stream);
    call.on("stream", userVideoStream => {
      screen_video.replaceChild(createVideo(true), screen_video.children[0]);
      addVideoStream(screen_video.children[0], userVideoStream);
    });
    call.on("close", () => {
      screen_video.replaceChild(getLoadingGif(), screen_video.children[0]);
    });

    screenDisonnectedCallback = ()=>{ screen_video.replaceChild(getLoadingGif(), screen_video.children[0]); }

  }

  myPeer.on("call", call => {
    call.answer(stream);
    call.on("stream", userVideoStream => {
      // peers[call.peer] = call;
      screen_video.replaceChild(createVideo(), screen_video.children[0]);
      addVideoStream(screen_video.children[0], userVideoStream);
    });
    call.on("close", () => {
      screen_video.replaceChild(getLoadingGif(), screen_video.children[0]);
    });

  });

}, err => {
  console.log("failed to stream", err)
})

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });

}
