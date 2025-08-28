const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const facesDiv = document.getElementById('faces');
const instructionDiv = document.getElementById('instruction'); // now from HTML
const processBtn = document.getElementById('process'); // ✅ process button reference

let capturedFaces = [];
let currentFaceIndex = -1; // track which face we’re on

// Define face order with colors
const facesOrder = [
  { name: "Up", color: "White" },
  { name: "Right", color: "Red" },
  { name: "Front", color: "Green" },
  { name: "Down", color: "Yellow" },
  { name: "Left", color: "Orange" },
  { name: "Back", color: "Blue" }
];

// Update instruction text
function updateInstruction() {
  if (capturedFaces.length < facesOrder.length) {
    let face = facesOrder[capturedFaces.length];
    instructionDiv.innerHTML =
      `👉 Please show the <span style="color:${face.color.toLowerCase()}">${face.color}</span> face (${face.name})`;
  } else {
    instructionDiv.innerHTML = "✅ All 6 faces captured! You can process the cube now.";
    processBtn.disabled = false; // ✅ enable process button
  }
}

// Start camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error("Camera error: ", err));

// Capture a face
document.getElementById('capture').addEventListener('click', () => {
  if (capturedFaces.length >= 6) return; // stop after 6 faces

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imgData = canvas.toDataURL("image/png");

  currentFaceIndex = capturedFaces.length; // new index
  capturedFaces.push(imgData);

  // Create preview image
  const img = document.createElement("img");
  img.src = imgData;
  img.width = 120;
  img.id = `face-${currentFaceIndex}`;
  facesDiv.appendChild(img);

  document.getElementById('recapture').disabled = false;

  console.log(`Captured face ${capturedFaces.length}/6`);

  updateInstruction();
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

updateInstruction();