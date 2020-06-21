var poke_url = "https://pokeapi.co/api/v2/";
var endpoint = " ";

/*============================================================================*/
/*INDEX MAGAZINE*/
/*============================================================================*/
$(document).ready(function () {
  var pages = Math.floor(Math.random() * 964);
  let endpoint = `pokemon?limit=12&offset=${pages}`;
  fetch(poke_url + endpoint)
    .then((response) => response.json())
    .then(function (allpokemon) {
      allpokemon.results.forEach(function (pokemon) {
        magazine_col_I(pokemon);
      });
    });
});

function magazine_col_I(pokemon) {
  let url = pokemon.url;
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      var magazine_col_I = document.getElementById("magazine_col_I");
      /*===================================================*/
      let col = document.createElement("div");
      let Pkimg = document.createElement("img");
      let card = document.createElement("div");
      let cardHeader = document.createElement("div");
      let cardBody = document.createElement("div");
      let cardText = document.createElement("p");
      let cardText_I = document.createElement("p");

      /*===================================================*/
      col.setAttribute("class", "col-xl-2");
      Pkimg.setAttribute("class", "card-img-top");
      card.setAttribute("class", "card align-items-xl-stretch");
      cardHeader.setAttribute("class", "card-header");
      cardBody.setAttribute("class", "card-body");
      cardText.setAttribute("class", "card-text container");
      cardText_I.setAttribute("class", "card-text container");

      /*===================================================*/

      col.appendChild(card);
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      cardBody.appendChild(Pkimg);
      card.appendChild(cardText);
      card.appendChild(cardText_I);
      cardHeader.textContent = pokeData.name;
      if (magazine_col_I) {
        fetch(pokeData.abilities[0].ability.url)
          .then((response) => response.json())
          .then(function (pokeAbilities) {
            var num = pokeAbilities.effect_entries;
            for (let index = 0; index < num.length; index++) {
              const element = num[index];
              if (element.effect === "undefined" || element.effect === null) {
                cardText.textContent = "It not have effects";
              } else {
                cardText.textContent = `Details: ${element.effect}`;
              }
            }
          });
        Pkimg.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;
        magazine_col_I.appendChild(col);
      }
    });
}

/*==========================================================================================*/
/*SHOW A LIST OF POKEMONS*/
/*==========================================================================================*/


let page = 200;


$(document).ready(function () {
  let endpoint = `pokemon?limit=8&offset=${page}`;
  fetch(poke_url + endpoint)
    .then((response) => response.json())
    .then(function (allpokemon) {
      allpokemon.results.forEach(function (pokemonList) {
        Pokemons_List(pokemonList);
      });
    });
});

function Pokemons_List(pokemonList) {
  let url = pokemonList.url;
  fetch(url)
    .then((response) => response.json())
    .then(function (pokeData) {
      var pokemons = document.getElementById("pokemons");
      /*===================================================*/
      let col = document.createElement("div");
      let Pkimg = document.createElement("img");
      let card = document.createElement("div");
      let cardHeader = document.createElement("div");
      let cardBody = document.createElement("div");
      let cardText = document.createElement("p");
      let cardText_I = document.createElement("p");
      let cardText_II = document.createElement("p");
      let cardText_III = document.createElement("p");
      let cardText_IV = document.createElement("p");
      let cardText_V = document.createElement("p");
      let cardText_VI = document.createElement("p");

      /*===================================================*/
      col.setAttribute("class", "col-xl-3");
      Pkimg.setAttribute("class", "card-img-top");
      card.setAttribute("class", "card align-items-xl-stretch");
      cardHeader.setAttribute("class", "card-header");
      cardBody.setAttribute("class", "card-body");
      cardText.setAttribute("class", "card-text container");
      cardText_I.setAttribute("class", "card-text container");
      cardText_II.setAttribute("class", "card-text container");
      cardText_III.setAttribute("class", "card-text container");
      cardText_IV.setAttribute("class", "card-text container");
      cardText_V.setAttribute("class", "card-text container");
      cardText_VI.setAttribute("class", "card-text container");

      /*===================================================*/

      col.appendChild(card);
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      cardBody.appendChild(Pkimg);
      card.appendChild(cardText);
      card.appendChild(cardText_I);
      card.appendChild(cardText_II);
      card.appendChild(cardText_III);
      card.appendChild(cardText_IV);
      card.appendChild(cardText_V);
      card.appendChild(cardText_VI);

      cardHeader.textContent = pokeData.name;

      if (pokemons) {
        var num = pokeData.types;
        for (let index = 0; index < num.length; index++) {
          const element = num[index];
          fetch(element.type.url)
            .then((response) => response.json())
            .then(function (poketype) {
              cardText.textContent = `Type: ${poketype.name} and ${poketype.generation.name}`;
              var count = poketype.damage_relations.double_damage_from;
              for (let subindex = 0; subindex < count.length; subindex++) {
                const damageRel = count[subindex];
                cardText_I.textContent = `double damage from: ${damageRel.name}`;
              }
              var count = poketype.damage_relations.double_damage_to;
              for (let subindex = 0; subindex < count.length; subindex++) {
                const damageRel = count[subindex];
                cardText_II.textContent = `double damage to: ${damageRel.name}`;
              }

              var count = poketype.damage_relations.half_damage_from;
              for (let subindex = 0; subindex < count.length; subindex++) {
                const damageRel = count[subindex];
                cardText_III.textContent = `half damage from: ${damageRel.name}`;
              }

              var count = poketype.damage_relations.half_damage_to;
              for (let subindex = 0; subindex < count.length; subindex++) {
                const damageRel = count[subindex];
                cardText_IV.textContent = `half damage to: ${damageRel.name}`;
              }

              var count = poketype.damage_relations.no_damage_from;
              for (let subindex = 0; subindex < count.length; subindex++) {
                const damageRel = count[subindex];
                cardText_V.textContent = `no damage from: ${damageRel.name}`;
              }
              var count = poketype.damage_relations.no_damage_to;
              for (let subindex = 0; subindex < count.length; subindex++) {
                const damageRel = count[subindex];
                cardText_VI.textContent = `no damage to: ${damageRel.name}`;
              }
            });
        }

        Pkimg.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;
        pokemons.appendChild(col);
      }
    });
}
/*==========================================================================================*/
/*SEARCH A LIST OF POKEMONS*/
/*==========================================================================================*/

function poke_search() {
  const inputext = document.getElementById("search");
  var inputext_value = inputext.value;
  var inputText = inputext_value.toLowerCase();

  let endpoint = `pokemon/${inputText}`;
  fetch(poke_url + endpoint)
    .then((response) => response.json())
    .then(function (seached_pokemon) {
      var pokemon = document.getElementById("searchpokemons");
      /*===================================================*/
      let col = document.createElement("div");
      let Pkimg = document.createElement("img");
      let card = document.createElement("div");
      let cardHeader = document.createElement("div");
      let cardBody = document.createElement("div");
      let cardText = document.createElement("p");
      let cardText_I = document.createElement("p");
      let cardText_II = document.createElement("p");
      let cardText_III = document.createElement("p");
      let cardText_IV = document.createElement("p");
      let cardText_V = document.createElement("p");
      let cardText_VI = document.createElement("p");

      /*===================================================*/
      col.setAttribute("class", "col-xl-12");
      Pkimg.setAttribute("class", "card-img-top");
      card.setAttribute("class", "card align-items-xl-stretch");
      cardHeader.setAttribute("class", "card-header");
      cardBody.setAttribute("class", "card-body");
      cardText.setAttribute("class", "card-text container");
      cardText_I.setAttribute("class", "card-text container");
      cardText_II.setAttribute("class", "card-text container");
      cardText_III.setAttribute("class", "card-text container");
      cardText_IV.setAttribute("class", "card-text container");
      cardText_V.setAttribute("class", "card-text container");
      cardText_VI.setAttribute("class", "card-text container");

      /*===================================================*/

      col.appendChild(card);
      card.appendChild(cardHeader);
      card.appendChild(cardBody);
      cardBody.appendChild(Pkimg);
      card.appendChild(cardText);
      card.appendChild(cardText_I);
      card.appendChild(cardText_II);
      card.appendChild(cardText_III);
      card.appendChild(cardText_IV);
      card.appendChild(cardText_V);
      card.appendChild(cardText_VI);

      cardHeader.textContent = seached_pokemon.name;
      Pkimg.srcset = `https://pokeres.bastionbot.org/images/pokemon/${seached_pokemon.id}.png`;
      pokemon.appendChild(col);

      fetch(seached_pokemon.species.url)
        .then((response) => response.json())
        .then(function (poke_species) {
          fetch(poke_species.evolution_chain.url)
            .then((response) => response.json())
            .then(function (poke_evolution) {
              var count = poke_evolution.chain.evolves_to;
              for (let subindex = 0; subindex < count.length; subindex++) {
                const damageRel = count[subindex];
                var poke_evo_name = damageRel.species.name;
                let endpoint = `pokemon/${poke_evo_name}`;
                fetch(poke_url + endpoint)
                  .then((response) => response.json())
                  .then(function (poke_evolution_name) {
                    pokemon.innerHTML = `<div class="card">
                 <img src="https://pokeres.bastionbot.org/images/pokemon/${seached_pokemon.id}.png" class="card-img-top" alt="...">
                 <div class="card-body">
                   <h5 class="card-title card-text">${seached_pokemon.name}</h5>
                   <p class="card-text">usually ${seached_pokemon.name} you can find it in the area ${poke_species.habitat.name}; the capture difficulty is ${poke_species.capture_rate} %, belongs to the ${poke_species.generation.name}</p>
                   <h5 class="card-title card-text">evolution to</h5>
                   <div class="row">
                   <div class="col-xl-4">
                   <div class="card align-items-xl-stretch">
                   <div class="card-header">${damageRel.species.name}</div>
                   <div class="card-body">
                   <img src="https://pokeres.bastionbot.org/images/pokemon/${poke_evolution_name.id}.png" class="card-img-top" alt="...">
                   </div></div>
               </div>`;
                  });
              }
            });
        });
    });
}

console.log("hola mundo");
