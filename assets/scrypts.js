// obtener referencias a los elementos del DOM
const btnprevious = document.getElementById("previous");
const btnnext = document.getElementById("next");
const resultado = document.getElementById("resultado");

// inicializar el contador y el valor del paso
let contador = 20;
const paso = 20;
magazine(contador)
resultado.textContent = contador;



// agregar un evento de clic al botón contador
  btnnext.addEventListener("click", function() {
    resultado.innerHTML ="";
    contador += paso;
    resultado.textContent = contador;
    magazine(contador)

  });  
  btnprevious.addEventListener("click", function() {
    if (contador === 20) {
      contador = 20
      resultado.textContent = contador;
      magazine(contador)


    }else{
      contador -= paso;
      resultado.textContent = contador;
      magazine(contador)

    }
});


async function magazine(params) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${params}&limit=20`);
  const data = await response.json();
  
  const pokemonList = document.getElementById("listaPokemon");
  pokemonList.innerHTML = "";

  for(let index=0; index < data.results.length; index++){
    const magazine = data.results[index];
    const card = document.createElement("div");
    card.classList.add("card", "m-3");
    card.style.width="300px";

    const img = document.createElement("img");
    img.classList.add("card-img-top", "img-fluid")
    img.src = `https://img.pokemondb.net/artwork/large/${magazine.name}.jpg`;
    // integramo la imagen dentro de la tarjeta
    
    const cardHeader = document.createElement("div"); //creamos la cabezera de la tarjeta y la integramos a la tarjeta
    cardHeader.classList.add("card-header");
    const pokemonType = await pokemontype(magazine.url)

    const ulHeader = document.createElement("ul")
    ulHeader.classList.add("list-group", "list-group-horizontal")
    // aqui mostraremos los tipos a que pertenece los pokemones
    for (let i = 0; i < pokemonType.length; i++) {
      ulHeader.appendChild(pokemonType[i]);
    }
    cardHeader.appendChild(ulHeader)
    card.appendChild(cardHeader);
    card.appendChild(img); // integramos la imagen aqui para que lla cabecera aparezca primero que la imagen y luego el cuerpo

    const cardBody = document.createElement("div") 
    cardBody.classList.add("card-body")// creamos el cuerpo de la tarjeta

    const title = document.createElement("h4")
    title.textContent = await capitalizeFirstLetter(magazine.name)
    cardBody.appendChild(title);
    
    card.appendChild(cardBody);

    const cardFooter = document.createElement("div") //creamos el elemento cardfooter
    cardFooter.classList.add("card-footer",  "text-muted")
    // aqui va la llamadas a las funciones para la pre evolucion y la evolucion
    const ulFooter = document.createElement("div")
    ulFooter.classList.add("list-unstyled"); //("list-group", "list-group-horizontal")

    const liFootherPreEvolves = document.createElement("li") // Pre Evolves
    liFootherPreEvolves.classList.add("list-group-item")
    liFootherPreEvolves.style.backgroundColor = "#6699CC"
    liFootherPreEvolves.style.color = "#f4f4f4"

    const liFootherEvolves = document.createElement("li") // Pre Evolves

    liFootherEvolves.classList.add("list-group-item")
    liFootherEvolves.style.backgroundColor = "#069101c0"
    liFootherEvolves.style.color = "#f4f4f4"


    const theEvolvesPre = await fetchDataPreEvolves(magazine.url)
    const evolveTo = await EvolvesTo(magazine.url, magazine.name);

    liFootherPreEvolves.textContent = `${theEvolvesPre}`;
    liFootherEvolves.textContent = `${evolveTo}`;

    ulFooter.append(liFootherPreEvolves)
    ulFooter.append(liFootherEvolves)

    cardFooter.appendChild(ulFooter);
    card.appendChild(cardFooter);   
    pokemonList.appendChild(card);
  }



// capitalizamos los nombres de los pokemons
async function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


async function pokemontype(pokeurl){
  const response = await fetch(pokeurl)
  const results = await response.json()

  const liArray = []
  for (let index = 0; index < results.types.length; index++) {
    const element = results.types[index];
    const liHeader = document.createElement("li")
    liHeader.classList.add("list-group-item")
    if (element.type.name === "normal"){
      liHeader.style.backgroundColor = `#A8A878`; //un tono grisáceo que representa lo ordinario y común
    } else if (element.type.name === "fighting"){
      liHeader.style.backgroundColor = `#A890F0`; //un tono lila claro que evoca al cielo y al aire
    } else if (element.type.name === "flying"){
      liHeader.style.backgroundColor = `#C03028`; //un tono rojo intenso que representa la ferocidad y el combate
    } else if (element.type.name === "poison"){
      liHeader.style.backgroundColor = "#A040A0"; //un tono morado oscuro y misterioso
    } else if (element.type.name === "ground"){
      liHeader.style.backgroundColor = "#E0C068"; //un tono marrón claro que representa la tierra y la arena
    } else if (element.type.name === "rock"){
      liHeader.style.backgroundColor = "#B8A038"; //un tono marrón oscuro y rocoso
    } else if (element.type.name === "bug"){
      liHeader.style.backgroundColor = "#A8B820"; //un tono verde claro que evoca a los insectos
    } else if (element.type.name === "ghost"){
      liHeader.style.backgroundColor = "#705898"; //un tono violeta oscuro y misterioso
    } else if (element.type.name === "steel"){
      liHeader.style.backgroundColor = "#B8B8D0"; //un tono plateado que representa la fortaleza y la durabilidad
    } else if (element.type.name === "fire"){
      liHeader.style.backgroundColor = "#F08030"; //un tono anaranjado intenso que evoca al fuego y la pasión
    } else if (element.type.name === "water"){
      liHeader.style.backgroundColor = "#6890F0"; //un tono azul claro que evoca al agua y a los océanos
    } else if (element.type.name === "grass"){
      liHeader.style.backgroundColor = "#78C850"; //un tono verde claro que representa la naturaleza y la vida
    } else if (element.type.name === "electric"){
      liHeader.style.backgroundColor = "#F8D030"; //un tono amarillo brillante que recuerda a la energía eléctrica
    } else if (element.type.name === "psychic"){
      liHeader.style.backgroundColor = "#F85888"; //un tono rosa intenso y misterioso
    } else if (element.type.name === "ice"){
      liHeader.style.backgroundColor = "#98D8D8"; //un tono azul claro y frío
    } else if (element.type.name === "dragon"){
      liHeader.style.backgroundColor = "#7038F8"; //un tono morado oscuro y mágico
    } else if (element.type.name === "dark"){
      liHeader.style.backgroundColor = "#705848"; //un tono grisáceo oscuro y malévolo
    } else if (element.type.name === "fairy"){
      liHeader.style.backgroundColor = "#EE99AC"; //un tono rosa claro y mágico
    }
    liHeader.style.color = "#ffffff"; //letras blancas

    const poketypeCapitalizate = await capitalizeFirstLetter(element.type.name)
    liHeader.innerHTML  = poketypeCapitalizate
    liArray.push(liHeader)
  }
  return liArray
}

async function fetchDataPreEvolves(url) {
    if (url !== undefined) {

      try {
        const response = await fetch(url);
        const data = await response.json();
        const evolvesFetch = data.species.url //Hacemos la primera llamada a fecth
        const evolvesResponse = await fetch(evolvesFetch);
        const evolvesData = await evolvesResponse.json();
        if (evolvesData.evolves_from_species !== null) {
          const capitalizated = await capitalizeFirstLetter(evolvesData.evolves_from_species.name);
          return `Pre Evolves ${capitalizated}`;
        
        }else{
          const notPreEvolves = "Not Pre-Evolves";
          return notPreEvolves
        }
      } catch (error) {
        console.error(error)
        return error
      }
    }
  }
}

async function EvolvesTo(url, currentPokemon) {
  if (url !== undefined) {

    try {
      const response = await fetch(url);
      const data = await response.json();

      const evolvesFetch = data.species.url //Hacemos la primera llamada a fecth
      const evolvesResponse = await fetch(evolvesFetch);
      const evolvesData = await evolvesResponse.json();
      const chain = evolvesData.evolution_chain.url

      const chainResponse = await fetch(chain); // hacemos la segunda llamada fetch
      const chainData = await chainResponse.json();

     const Evolves_to = await seeEvolve(chainData.chain);
     const EvolvesNext_to = await seeNextEvolve(chainData.chain);

      
    if(chainData.chain.species.name === currentPokemon && Evolves_to !== currentPokemon && Evolves_to !== undefined){

      return `Evolves To ${Evolves_to}` ;

    }else if(Evolves_to !== undefined && Evolves_to === currentPokemon){
      return `${EvolvesNext_to}`;

    }else if(EvolvesNext_to === currentPokemon && EvolvesNext_to !== undefined){
      return `Last Evolution`;
      
    }
    } catch (error) {
      return error
    }
  }
}


async function seeEvolve(arg){
  let EvolvesA;
  if (arg.evolves_to.length > 0) {
    for (let counter in arg.evolves_to) {
      const element = arg.evolves_to[counter].species.name;
      EvolvesA = element 
    }
  }
  return EvolvesA
}

async function seeNextEvolve(arg){
  let EvolvesA;
  if (arg.evolves_to.length > 0) {
    for (let counterA in arg.evolves_to) {
      const elementA = arg.evolves_to[counterA];

      if(elementA.evolves_to.length > 0 ){

        for (let counterB in elementA.evolves_to) {
          const elementB = elementA.evolves_to[counterB].species.name;
          EvolvesA = elementB 
        }

      }else{
        EvolvesA = `Not Evolves`
      }
    }
  }
  return EvolvesA
}

async function abraSearch() {
  const url =`https://pokeapi.co/api/v2/pokemon/${arg}`;

  
}









