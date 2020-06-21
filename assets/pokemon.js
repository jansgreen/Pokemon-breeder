var poke_url = "https://pokeapi.co/api/v2/";
var endpoint = " ";

/*=========================================================================================*/
/*POKEMON LIST OF POKEMON.HTML*/
/*=========================================================================================*/
function pokelist() {
  let endpoint = 'pokemon?limit=24&offset=964';
  fetch(poke_url + endpoint)
    .then((response) => response.json())
    .then(function (allpokemon) {
      allpokemon.results.forEach(function (pokemon) {
        console.log("Pokemon List");
        console.log(pokemon);
        Pokemons_List(pokemon);
      });
    });
}

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
      fetch(pokeData.abilities[0].ability.url)
        .then((response) => response.json())
        .then(function (pokeAbilities) {
          var num = pokeAbilities.effect_entries;
          var fullNum = num.length;
          console.log(fullNum);

          var effect_I = pokeAbilities.effect_entries.fullNum.effect;
          if (effect_I) {
            cardText.textContent = `Details: ${effect_I}`;
          } else {
            cardText.textContent = "It not have effects";
          }
          cardText_I.textContent = `Details: ${pokeAbilities.effect_entries[1].effect}`;
        });
      Pkimg.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;

      /*===================================================*/
      pokemons.appendChild(col);
    });
}

console.log("hola pokemon");
