const book = document.getElementById("book");
const openBookBtn = document.getElementById("openBook");
const cover = document.getElementById("cover");
const container = document.querySelector(".book-container");
const flipSound = document.getElementById("flipSound");
const music = document.getElementById("bgMusic");
const musicToggle = document.getElementById("musicToggle");

// Cargar poemas desde archivo JSON
fetch("poemas.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo cargar poemas.json");
        }
        return response.json();
    })
    .then(poemas => {

        poemas.forEach((poema, index) => {

            const page = document.createElement("div");
            page.classList.add("page");
            page.style.zIndex = poemas.length - index;

            let frontContent = "";

            if (poema.tipo === "imagen") {
                frontContent = `
                    <h2 class="poema-titulo">${poema.titulo}</h2>
                    <img src="${poema.contenido}" alt="Poema ${index+1}">
                `;
            } else {
                frontContent = `
                    <h2 class="poema-titulo">${poema.titulo}</h2>
                    <p>${poema.contenido.replace(/\n/g, "<br>")}</p>
                `;
            }

            page.innerHTML = `
                <div class="front">
                    ${frontContent}
                </div>
                <div class="back">
                    <img src="${poema.imagen}" alt="Imagen ${index+1}">
                </div>
            `;

            page.addEventListener("click", () => {
                page.classList.toggle("flipped");
                if (flipSound) flipSound.play();
            });

            book.appendChild(page);
        });

        // Página final
        const finalPage = document.createElement("div");
        finalPage.classList.add("page");
        finalPage.innerHTML = `
            <div class="front">
                <h2>Gracias por existir.</h2>
                <p>Este cuaderno no termina aquí… porque mi amor por ti tampoco.</p>
            </div>
        `;
        book.appendChild(finalPage);

    })
    .catch(error => {
        console.error("Error cargando poemas:", error);
    });

// Abrir libro
openBookBtn.addEventListener("click", () => {
    cover.style.display = "none";
    container.classList.remove("hidden");
});

// Música
musicToggle.addEventListener("click", () => {
    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
});
