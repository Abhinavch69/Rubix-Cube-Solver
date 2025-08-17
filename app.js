const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const facesDiv = document.getElementById('faces');
let capturedFaces = [];
let currentFaceIndex = -1; // track which face we’re on

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error("Camera error: ", err));

// Capture a face
document.getElementById('capture').addEventListener('click', () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imgData = canvas.toDataURL("image/png");
  
  currentFaceIndex = capturedFaces.length; // remember index
  capturedFaces.push(imgData);

  // Create or replace preview
  const img = document.createElement("img");
  img.src = imgData;
  img.width = 120;
  img.id = `face-${currentFaceIndex}`;
  facesDiv.appendChild(img);

  document.getElementById('recapture').disabled = false;

  console.log(`Captured face ${capturedFaces.length}/6`);

  if (capturedFaces.length === 6) {
    alert("All 6 faces captured! You can process the cube now.");
  }
});

// Recapture the last face
document.getElementById('recapture').addEventListener('click', () => {
  if (currentFaceIndex === -1) return;

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imgData = canvas.toDataURL("image/png");

  // Replace in array
  capturedFaces[currentFaceIndex] = imgData;

  // Replace preview image
  const oldImg = document.getElementById(`face-${currentFaceIndex}`);
  if (oldImg) oldImg.src = imgData;

  console.log(`Re-captured face ${currentFaceIndex + 1}`);
});