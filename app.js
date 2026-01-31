const cameraInput = document.getElementById("cameraInput");
const fileInput = document.getElementById("fileInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");
const app = document.getElementById("app");

let imageData = null;

function handleImage(file) {
  const reader = new FileReader();
  reader.onload = () => {
    imageData = reader.result;

    // Imagen como fondo de la app
    app.style.backgroundImage = `url(${imageData})`;

    result.innerHTML = "📸 Imagen cargada. Pulsa **Analizar planta**.";
  };
  reader.readAsDataURL(file);
}

cameraInput.addEventListener("change", () => {
  if (cameraInput.files[0]) {
    handleImage(cameraInput.files[0]);
  }
});

fileInput.addEventListener("change", () => {
  if (fileInput.files[0]) {
    handleImage(fileInput.files[0]);
  }
});

function indiceDiagnostico(base64) {
  let total = 0;
  for (let i = 0; i < base64.length; i++) {
    total += base64.charCodeAt(i);
  }
  return total;
}

analyzeBtn.addEventListener("click", () => {
  if (!imageData) {
    result.innerHTML = "⚠️ Primero toma o selecciona una imagen.";
    return;
  }

  result.innerHTML = "🔍 Analizando planta…";

  setTimeout(() => {
    const respuestas = [
      "💧 Falta de riego. Aumenta la frecuencia moderadamente.",
      "☀️ Exceso de sol directo. Muévela a luz indirecta.",
      "🪴 Buen estado, pero recomienda abono orgánico.",
      "🌿 Hojas caídas: revisa drenaje y humedad.",
      "✅ Planta saludable. Mantén cuidados actuales."
    ];

    const i = indiceDiagnostico(imageData) % respuestas.length;

    result.innerHTML = `<strong>Resultado:</strong><br><br>${respuestas[i]}`;
  }, 1500);
});
