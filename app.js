const cameraInput = document.getElementById("cameraInput");
const fileInput = document.getElementById("fileInput");
const cameraBtn = document.getElementById("cameraBtn");
const fileBtn = document.getElementById("fileBtn");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

let imageData = null;

// Botones
cameraBtn.onclick = () => cameraInput.click();
fileBtn.onclick = () => fileInput.click();

// Cargar imagen
function handleImage(file) {
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

cameraInput.onchange = () => handleImage(cameraInput.files[0]);
fileInput.onchange = () => handleImage(fileInput.files[0]);

// Análisis estable
function hashImagen(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data.charCodeAt(i);
  }
  return total;
}

analyzeBtn.onclick = () => {
  if (!imageData) {
    result.innerHTML = "⚠️ Primero toma o selecciona una imagen.";
    return;
  }

  result.innerHTML = "🔍 Analizando planta…";

  setTimeout(() => {
    const diagnosticos = [
      {
        estado: "Falta de agua",
        consejo: "Aumenta ligeramente el riego y revisa la humedad del sustrato."
      },
      {
        estado: "Exceso de sol",
        consejo: "Colócala en luz indirecta para evitar estrés."
      },
      {
        estado: "Buen estado",
        consejo: "Mantén riego moderado y fertiliza cada 3 semanas."
      },
      {
        estado: "Falta de nutrientes",
        consejo: "Aplica abono orgánico o fertilizante balanceado."
      }
    ];

    const indice = hashImagen(imageData) % diagnosticos.length;
    const d = diagnosticos[indice];

    result.innerHTML = `
      <strong>🌿 Estado detectado:</strong><br>
      ${d.estado}<br><br>
      <strong>✅ Recomendación:</strong><br>
      ${d.consejo}
    `;
  }, 1600);
};
