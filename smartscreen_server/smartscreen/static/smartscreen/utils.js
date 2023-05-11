function createVideo(muted = false) {
  const vid = document.createElement("video");
  vid.muted = muted;
  return vid;
}
function getLoadingGif() {
  const img = document.createElement("img");
  img.src = "/static/smartscreen/icons/loading.svg"
  return img;
}

function connectToPeerServer() {
  const myPeer = new Peer(undefined, { host: '/', });
  return myPeer;
}
