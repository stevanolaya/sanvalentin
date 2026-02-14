const book = document.getElementById("book");
const openBookBtn = document.getElementById("openBook");
const cover = document.getElementById("cover");
const container = document.querySelector(".book-container");
const flipSound = document.getElementById("flipSound");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

// Cargar poemas desde archivo JSON con preventivo de caché
fetch("poemas.json?v=" + new Date().getTime())
    .then(response => {
        if (!response.ok) throw new Error("No se pudo cargar poemas.json");
        return response.json();
    })
    .then(poemas => {
        poemas.forEach((poema, index) => {
            const page = document.createElement("div");
            page.classList.add("page");
            
            // Establecemos el z-index inicial: la primera página es la más alta
            page.style.zIndex = poemas.length - index;

            let frontContent = poema.tipo === "imagen" 
                ? `<h2 class="poema-titulo">${poema.titulo}</h2><img src="${poema.contenido}" alt="Poema ${index+1}">`
                : `<h2 class="poema-titulo">${poema.titulo}</h2><p>${poema.contenido.replace(/\n/g, "<br>")}</p>`;

            page.innerHTML = `
                <div class="front">${frontContent}</div>
                <div class="back"><img src="${poema.imagen}" alt="imagen ${index+1}"></div>
            `;

            // EVENTO DE CLIC CORREGIDO
            page.addEventListener("click", () => {
                if (!page.classList.contains("flipped")) {
                    // SE ABRE LA PÁGINA
                    page.classList.add("flipped");
                    // Al terminar de girar, se va al fondo para no tapar la siguiente
                    setTimeout(() => {
                        page.style.zIndex = index + 1;
                    }, 600); 
                } else {
                    // SE CIERRA LA PÁGINA
                    page.classList.remove("flipped");
                    // Al cerrar, recupera su nivel de prioridad original
                    page.style.zIndex = poemas.length - index;
                }

                if (flipSound) {
                    flipSound.currentTime = 0;
                    flipSound.play();
                }
            });

            book.appendChild(page);
        });

        // Página final corregida
        const finalPage = document.createElement("div");
        finalPage.classList.add("page");
        finalPage.style.zIndex = 0;
        finalPage.innerHTML = `
            <div class="front">
                <h2>Gracias por existir.</h2>
                <p>Este cuaderno no termina aquí… porque mi amor por ti tampoco.</p>
            </div>
        `;
        book.appendChild(finalPage);
    })
    .catch(error => console.error("Error:", error));

// Abrir libro (Mantiene tu lógica de estilos)
openBookBtn.addEventListener("click", () => {
    cover.style.display = "none";
    container.classList.remove("hidden");
});

// Control de música
musicToggle.addEventListener("click", () => {
    music.paused ? music.play() : music.pause();
})