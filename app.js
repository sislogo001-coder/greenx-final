const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

let imageLoaded = false;

// Mostrar imagen al tomar foto o seleccionar archivo
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
    result.innerHTML = "";
    imageLoaded = true;
  };
  reader.readAsDataURL(file);
});

// Análisis simulado
analyzeBtn.addEventListener("click", () => {
  if (!imageLoaded) {
    result.innerHTML = "⚠️ Primero toma o selecciona una foto de la planta.";
    return;
  }

  result.innerHTML = "🔍 Analizando planta...";

  setTimeout(() => {
    const respuestas = [
      "🌿 La planta muestra signos de **falta de riego**. Se recomienda aumentar la frecuencia de agua.",
      "☀️ Posible **exceso de sol directo**. Intenta colocarla en luz indirecta.",
      "🪴 La planta parece saludable, pero podría beneficiarse de **abono orgánico**.",
      "💧 Hojas ligeramente caídas: posible **estrés hídrico**. Revisa el drenaje.",
      "🌱 Buen estado general. Mantén riego moderado y fertiliza cada 3 semanas."
    ];

    const random = respuestas[Math.floor(Math.random() * respuestas.length)];

    result.innerHTML = `
      <strong>Resultado:</strong><br><br>
      ${random}<br><br>
      ✅ Recomendación generada por GreenX
    `;
  }, 2000);
});
