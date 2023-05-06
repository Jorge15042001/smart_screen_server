function createVideo(muted = false) {
  const vid = document.createElement("video");
  vid.muted = muted;
  return vid;
}
function getLoadingGif() {
  const img = document.createElement("img");
  img.src = "https://v.fastcdn.co/u/430e104e/57579327-0-Loaders-3.svg"
  return img;
}

function connectToPeerServer() {
  const myPeer = new Peer(undefined, {
    host: '/',
    port: 9000
  });
  return myPeer;
}
