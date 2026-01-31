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

// Cargar imagen
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

// Hash estable (misma imagen = mismo resultado)
function hashImagen(data) {
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data.charCodeAt(i);
  }
  return total;
}

// Mostrar abonos orgánicos
function mostrarAbonos() {
  result.innerHTML += `
    <div class="organic-box">
      <h3>🌿 Abonos orgánicos recomendados</h3>
      <ul>
        <li><strong>🍌 Cáscara de plátano:</strong> Hervir, enfriar y usar el agua para regar.</li>
        <li><strong>🍚 Agua de arroz:</strong> Rica en minerales. Usar sin sal.</li>
        <li><strong>☕ Café usado:</strong> Secar y mezclar con la tierra.</li>
        <li><strong>🥚 Cáscara de huevo:</strong> Triturar y aplicar como calcio natural.</li>
      </ul>
    </div>
  `;
}

// Analizar planta
analyzeBtn.addEventListener("click", () => {
  if (!imageData) {
    result.innerHTML = "⚠️ Primero toma o selecciona una imagen de una planta.";
    return;
  }

  result.innerHTML = "🔍 Analizando planta…";

  setTimeout(() => {
    const diagnosticos = [
      {
        estado: "Falta de agua",
        consejo: "Riega con mayor frecuencia y revisa la humedad del sustrato.",
        abono: false
      },
      {
        estado: "Exceso de sol",
        consejo: "Colócala en un lugar con luz indirecta.",
        abono: false
      },
      {
        estado: "Buen estado",
        consejo: "La planta se ve sana. Puedes fertilizar de forma ocasional.",
        abono: true
      },
      {
        estado: "Falta de nutrientes",
        consejo: "Se recomienda aplicar abono orgánico o fertilizante balanceado.",
        abono: true
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

    if (d.abono) {
      result.innerHTML += `
        <br>
        <button onclick="mostrarAbonos()">🌱 Ver abonos orgánicos</button>
      `;
    }
  }, 1500);
});
