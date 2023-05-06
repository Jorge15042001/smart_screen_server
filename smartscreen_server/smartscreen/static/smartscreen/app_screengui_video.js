let my_video = document.querySelector("#my_video");
let receptionist_video = document.querySelector("#video");

let receptionistConnectedCallback = (userId) => { };
//object used to store peer connecteno to the smartscreen app
const screen_peer = null
const getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

const myPeer = connectToPeerServer();

myPeer.on("open", id => {
  // socket.emit("join-room",ROOM_ID,id);
  setTimeout(() => {
    screenSocket.send(JSON.stringify({
      "msg_type": "screengui.id",
      "id": id
    }));
  }, 10000)

});

getUserMedia({
  video: true,
  audio: true 
}, stream => {
  // stream.getVideoTracks()[0].enabled = false;
  // stream.getAudioTracks()[0].enabled = false;
  // replaceChild(my_video, createVideo(true));
  my_video.replaceChild(createVideo(true), my_video.children[0]);
  addVideoStream(my_video.children[0], stream);

  receptionistConnectedCallback = (userId) => {

    const call = myPeer.call(userId, stream);
    call.on("stream", userVideoStream => {
      receptionist_video.replaceChild(createVideo(), receptionist_video.children[0]);
      addVideoStream(receptionist_video.children[0], userVideoStream);
    });
    call.on("close", () => {
      receptionist_video.replaceChild(getLoadingGif(),receptionist_video.children[0]);
    });

  }

  myPeer.on("call", call => {
    call.answer(stream);
    call.on("stream", userVideoStream => {
      receptionist_video.replaceChild(createVideo(), receptionist_video.children[0]);
      addVideoStream(receptionist_video.children[0], userVideoStream);
    });
    call.on("close", () => {
      // receptionist_video = document.createElement("video");
      const img = document.createElement("img");
      img.src = "https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg"
      receptionist_video.replaceChild(img,receptionist_video.children[0]);
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








// enter full scren
function toggleFullscreen() {
  const elem = document.getElementsByTagName("body")[0];
  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch((err) => {
      alert(
        `Error attempting to enable fullscreen mode: ${err.message} (${err.name})`
      );
    });
  } else {
    document.exitFullscreen();
  }
}

document.body.onclick = toggleFullscreen

