/*==========================================================================================*/
/*SHOW A LIST OF ALL OUR POKEMONS STAR==> this area is a magazine pokemon 
/*==========================================================================================*/
class api_url {
  constructor(allpoke_search) {
    this.poke_url = "https://pokeapi.co/api/v2/";
    this.allpoke_magazene = "pokemon?limit=12&offset=";
    this.allpoke_search = allpoke_search;
    this.allpoke_list = "pokemon/";
    this.allpoke_point = `pokemon?limit=8&offset=`;
  }


  endurl() {
    fetch(this.poke_url + this.allpoke_magazene + this.allpoke_search)
      .then((response) => response.json())
      .then(function (allpokemon) {
        allpokemon.results.forEach(function (pokemon) {
          magazine_col_I(pokemon);
        });
      });
  }

  search_url() {
    fetch(this.poke_url + this.allpoke_point + this.allpoke_search)
      .then((response) => response.json())
      .then(function (allpokemon) {
        allpokemon.results.forEach(function (pokemonList) {
          Pokemons_List(pokemonList);
        });
      });
  }
  search_one() {
    fetch(this.poke_url + this.allpoke_search)
      .then((response) => response.json())
      .then(function (search_a_pokemon) {
        get_a_pokemon(search_a_pokemon);
      });
  }
 
}



var pages = Math.floor(Math.random() * 964);
let data = new api_url(`${pages}`);
data.endurl();

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
      card.setAttribute("class", "card ");
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
        let hability = pokeData.abilities[0].ability;
        fetch(hability.url)
          .then((response) => response.json())
          .then(function (pokeAbilities) {
            var num = pokeAbilities.effect_entries;
            for (let index = 0; index < num.length; index++) {
              const element = num[index];
              if (element.effect === "undefined" || element.effect === null) {
                cardText.textContent = "It not have effects";
              } else {
                cardText.textContent = `hability name: ${hability.name}`;
                cardText_I.textContent = `${element.effect}`;
              }
            }
          });

        Pkimg.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;
        magazine_col_I.appendChild(col);
      }
    });
}




