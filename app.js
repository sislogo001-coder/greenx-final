// Elementos
const imageInput = document.getElementById("imageInput");
const preview = document.getElementById("preview");
const analyzeBtn = document.getElementById("analyzeBtn");
const result = document.getElementById("result");

// Mostrar vista previa al tomar o subir foto
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
    result.innerHTML = "";
  };
  reader.readAsDataURL(file);
});

// Diagnóstico simulado (sin IA por ahora)
analyzeBtn.addEventListener("click", () => {
  if (!preview.src) {
    result.innerHTML = "⚠️ Primero toma o sube una foto de tu planta.";
    return;
  }

  // Diagnóstico básico (lógica simple)
  const diagnostics = [
    {
      estado: "💧 Falta de agua",
      consejo: "Riega la planta y revisa la humedad del sustrato."
    },
    {
      estado: "☀️ Exceso de sol",
      consejo: "Colócala en luz indirecta durante unos días."
    },
    {
      estado: "🌱 Falta de nutrientes",
      consejo: "Aplica abono orgánico una vez por semana."
    },
    {
      estado: "✅ Estado saludable",
      consejo: "Mantén los cuidados actuales."
    }
  ];

  const random = diagnostics[Math.floor(Math.random() * diagnostics.length)];

  result.innerHTML = `
    <strong>Resultado del diagnóstico:</strong><br><br>
    ${random.estado}<br>
    👉 ${random.consejo}
  `;
});
