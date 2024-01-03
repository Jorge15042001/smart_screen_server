function createVideo(muted = false) {
  const vid = document.createElement("video");
  vid.muted = muted;
  return vid;
}
function getLoadingGif(type = "smile") {
  const img = document.createElement("img");

  if (type === "smile") {
    img.src = "/static/smartscreen/icons/loading_smile.svg"
  }
  if (type === "circles") {
    img.src = "/static/smartscreen/icons/loading.svg"
  }
  return img;
}

function connectToPeerServer() {
  const myPeer = new Peer(undefined, { host: '/', });
  return myPeer;
}
