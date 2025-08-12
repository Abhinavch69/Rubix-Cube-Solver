const camera=document.querySelector("#webCam");
const constarints = {
  video: {
    width:1280,
    height:720,
    facingMode: "environment",
  }
};
navigator.mediaDevices.getUserMedia({ video:true })
  .then((stream)=>{
    camera.srcObject=stream;
  })
  .catch((err)=>{
    console.error("Error accessing webcam: ", err);
  });