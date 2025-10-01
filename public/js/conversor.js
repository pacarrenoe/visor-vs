const inputFile = document.getElementById("image");
const btnConvertir = document.getElementById("btnConvertir");
const btnLimpiar = document.getElementById("btnLimpiar");
const outputTextarea = document.getElementById("base64Output");
const btnCopiar = document.getElementById("btnCopiar");

// Parte de visualización manual
const b64InputManual = document.getElementById("b64InputManual");
const btnVisualizar = document.getElementById("btnVisualizar");
const previewSection = document.getElementById("previewSection");
const previewImage = document.getElementById("previewImage");

// Convertir archivo a Base64
btnConvertir.addEventListener("click", () => {
    const file = inputFile.files[0];
    if (!file) {
        alert("Por favor, selecciona una imagen.");
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        outputTextarea.value = reader.result;
        btnCopiar.disabled = false;
        btnLimpiar.disabled = false;
    };
    reader.readAsDataURL(file);
});

// Limpiar todo
btnLimpiar.addEventListener("click", () => {
    inputFile.value = "";
    outputTextarea.value = "";
    btnCopiar.disabled = true;
    btnLimpiar.disabled = true;
});

// Copiar al portapapeles
btnCopiar.addEventListener("click", () => {
    outputTextarea.select();
    document.execCommand("copy");
    alert("Base64 copiado al portapapeles");
});

// Visualizar Base64 manual
btnVisualizar.addEventListener("click", () => {
    const base64 = b64InputManual.value.trim();
    if (!base64) {
        alert("Por favor, pega un Base64 válido.");
        return;
    }

    // si el usuario pega solo la parte sin "data:image/...", lo agregamos
    const fullBase64 = base64.startsWith("data:image")
        ? base64
        : `data:image/png;base64,${base64}`;

    previewImage.src = fullBase64;
    previewSection.classList.remove("hidden");
});
