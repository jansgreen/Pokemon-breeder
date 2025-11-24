// obtener referencias a los elementos del DOM
const btnprevious = document.getElementById("previous");
const btnnext = document.getElementById("next");
const resultado = document.getElementById("resultado");

// inicializar el contador y el valor del paso
let contador = 20;
const paso = 20;
magazine(contador)
resultado.textContent = contador;


// scrypts.js consolidated into assets/pokemon.js
// This file is retained as a stub. The actual implementation moved to `assets/pokemon.js`.
// Remove this file and references after verifying `assets/pokemon.js` works as expected.
    contador += paso;

    resultado.textContent = contador;

    magazine(contador)



  });  

  btnprevious.addEventListener("click", function() {

    if (contador === 20) {

      contador = 20

      resultado.textContent = contador;

