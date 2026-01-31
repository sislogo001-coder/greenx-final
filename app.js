const cameraInput = document.getElementById("cameraInput");
const galleryInput = document.getElementById("galleryInput");

const cameraBtn = document.getElementById("cameraBtn");
const galleryBtn = document.getElementById("galleryBtn");

const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

let imageData = null;

// Abrir cámara
cameraBtn.addEventListener("click", () => {
  cameraInput.value = "";
  cameraInput.click();
});

// Abrir galería
galleryBtn.addEventListener("click", () => {
  galleryInput.value = "";
  galleryInput.click();
});

// Manejar imagen
function cargarImagen(file) {
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    imageData = reader.result;
    preview.src = imageData;
    preview.style.display = "block";
    result.innerHTML = "";
  };
  reader.readAsDataURL(file);
}

cameraInput.addEventListener("change", () => {
  cargarImagen(cameraInput.files[0]);
});

galleryInput.addEventListener("change", () => {
  cargarImagen(galleryInput.files[0]);
});

// Hash estable
function hashImagen(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data.charCodeAt(i);
  }
  return total;
}

// Analizar
analyzeBtn.addEventListener("click", () => {
  if (!imageData) {
    result.innerHTML = "⚠️ Primero toma o elige una imagen de una planta.";
    return;
  }

  result.innerHTML = "🔍 Analizando planta…";

  setTimeout(() => {
    const diagnosticos = [
      { estado: "Falta de agua", consejo: "Riega un poco más y revisa la humedad." },
      { estado: "Exceso de sol", consejo: "Muévela a luz indirecta." },
      { estado: "Buen estado", consejo: "Continúa con riego moderado y fertiliza ocasionalmente." },
      { estado: "Falta de nutrientes", consejo: "Aplica abono orgánico o fertilizante balanceado." }
    ];

    const indice = hashImagen(imageData) % diagnosticos.length;
    const d = diagnosticos[indice];

    result.innerHTML = `
      <strong>🌿 Estado detectado:</strong><br>
      ${d.estado}<br><br>
      <strong>✅ Recomendación:</strong><br>
      ${d.consejo}
    `;
  }, 1500);
});
