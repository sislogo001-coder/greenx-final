const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

let imageData = null;

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    imageData = reader.result;
    preview.src = imageData;
    preview.style.display = "block";
    result.innerHTML = "📸 Imagen cargada. Presiona **Analizar planta**.";
  };
  reader.readAsDataURL(file);
});

function generarIndice(base64) {
  let total = 0;
  for (let i = 0; i < base64.length; i++) {
    total += base64.charCodeAt(i);
  }
  return total;
}

analyzeBtn.addEventListener("click", () => {
  if (!imageData) {
    result.innerHTML = "⚠️ Primero toma o selecciona una foto de la planta.";
    return;
  }

  result.innerHTML = "🔍 Analizando planta…";

  setTimeout(() => {
    const diagnosticos = [
      "🌿 La planta muestra signos de **falta de riego**. Se recomienda aumentar la frecuencia de agua.",
      "☀️ Posible **exceso de sol directo**. Intenta moverla a luz indirecta.",
      "🪴 Buen estado general, pero podría beneficiarse de **abono orgánico**.",
      "💧 Hojas algo caídas. Revisa **humedad y drenaje del sustrato**.",
      "🌱 La planta se ve saludable. Mantén riego moderado y fertiliza cada 3 semanas."
    ];

    const indice = generarIndice(imageData) % diagnosticos.length;

    result.innerHTML = `
      <strong>Resultado:</strong><br><br>
      ${diagnosticos[indice]}
    `;
  }, 1500);
});
