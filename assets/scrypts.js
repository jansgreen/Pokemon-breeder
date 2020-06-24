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

/*==========================================================================================*/
/*SHOW A LIST OF POKEMONS*/
/*==========================================================================================*/

$(document).ready(function () {
  let zero = 0;
  let one = 1;
  let page = 0;

  $("#pagess").click(function () {
    if (zero < 964) {
      let page = Math.floor((one + zero) * 8);
      let data = new api_url(`${page}`);
      console.log(`${page}`);
      data.search_url();
      if (data) {
        const clear = document.getElementById("pokemons");
        clear.innerHTML = " ";
      }
      one++;
    } else {
      let page = Math.floor((one + zero) * 8);
      let data = new api_url(`${page}`);
      console.log(`${page}`);
      data.search_url();
      if (data) {
        const clear = document.getElementById("pokemons");
        clear.innerHTML = " ";
      }
      one--;
    }

    $("#page_less").click(function () {
      const clear = document.getElementById("pokemons");
      clear.innerHTML = " ";
      if (zero > 0) {
        let page = Math.floor((one - zero) * 8);
        let data = new api_url(`${page}`);
        console.log(`${page}`);
        data.search_url();
        if (data) {
          const clear = document.getElementById("pokemons");
          clear.innerHTML = " ";
        }
        one--;
      } else if (zero < 964) {
        let page = Math.floor((one - zero) * 8);
        let data = new api_url(`${page}`);
        console.log(`${page}`);
        data.search_url();
        if (data) {
          const clear = document.getElementById("pokemons");
          clear.innerHTML = " ";
        }
        one--;
      } else if (zero == 0) {
        console.log("Carambas");
      } else if (zero > 0) {
        console.log("Carambas");
      }
    });
  });
  let data = new api_url(`${page}`);
  data.search_url();
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
/*SEARCH A  POKEMON*/
/*==========================================================================================*/
var inputText = Math.floor(Math.random() * 964);
function poke_search() {
  const inputext = document.getElementById("search");
  var inputext_value = inputext.value;
  var inputText = inputext_value.toLowerCase();
  let endpoint = `pokemon/${inputText}`;
  let data = new api_url(endpoint);
  data.search_one();
}

function get_a_pokemon(search_a_pokemon) {
  const push_data = document.getElementById("searchpokemons");
  const poke_habls = search_a_pokemon.abilities;
  const evo_pro = search_a_pokemon.id + 1;
  const poke_evo_cols = document.getElementById("poke_evo_cols");
  poke_evo_cols.innerHTML = ` `;
  for (let index = 0; index < poke_habls.length; index++) {
    const element = poke_habls[index];
    const { name, url } = element.ability;
    const poke_array = url;

    fetch(poke_array)
      .then((response) => response.json())
      .then(function (name_ability) {
        const evol = search_a_pokemon.species.url;

        fetch(evol)
          .then((response) => response.json())
          .then(function (evolution) {
            if (evolution.evolves_from_species) {
              const { name } = evolution.evolves_from_species;
              const poke_evolution_from = name;

              fetch(`https://pokeapi.co/api/v2/pokemon/${poke_evolution_from}`)
                .then((response) => response.json())
                .then(function (evo_from_id) {
                  const from_poke = evo_from_id.id;

                  fetch(`https://pokeapi.co/api/v2/pokemon/${evo_pro}`)
                    .then((response) => response.json())
                    .then(function (evo_to) {
                      poke_evo_cols.innerHTML = `
            <div class="row">
            <div class="col-xl-4" >
            <h5 class="card-header">${poke_evolution_from}</h5>
            <img src="https://pokeres.bastionbot.org/images/pokemon/${from_poke}.png" class="card-img-top" alt="...">
            </div>
            <div class="col-xl-4" >
            <h5 class="card-header">${evo_to.name}</h5>
            <img src="https://pokeres.bastionbot.org/images/pokemon/${evo_to.id}.png" class="card-img-top" alt="...">
            </div>
            </div>
           `;
                    });
                });
            }

            const parraphas = document.getElementById("parraphas");
            let h5 = document.createElement("h5");

            h5.setAttribute("class", "card-text ");

            h5.textContent =
              `${name}` + `${name_ability.effect_entries[1].effect}`;

            let div = document.createElement("div");
            div.setAttribute("class", "card-body");
            div.appendChild(h5);
            parraphas.appendChild(div);

            push_data.innerHTML = `
    <div class="card">
  <img src="https://pokeres.bastionbot.org/images/pokemon/${search_a_pokemon.id}.png" class="card-img-top" alt="...">
  </div>
  <div class= "card-name-Text"> <h2 class="card-title">${search_a_pokemon.name}</h2>
  </div>
  <h4 class="h_details">ability</h4>
  `;
          });
      });
  }
}

/*==========================================================================================*/
/*LIST OF POKEMON Breeders*/
/*==========================================================================================*/

$(document).ready(function () {
  $.ajax({
    url: "https://randomuser.me/api/?page=1&results=10&seed=abc",
    dataType: "json",
    success: function (data) {
      const results = data.results;
      for (let alpha = 0; alpha < results.length; alpha++) {
        const element_breeders = results[alpha];

        const { cell, email, name, location, picture } = element_breeders;

        var breedersHTML = document.getElementById("breedersHTML");
        let row = document.createElement("tr");
        let col = document.createElement("td");
        let col_I = document.createElement("td");
        let card = document.createElement("div");
        let img = document.createElement("img");
        let PKimg = document.createElement("img");
        let card_body = document.createElement("div");
        let card_title = document.createElement("h5");
        let farm_title = document.createElement("h4");
        let card_text = document.createElement("p");
        let card_text_I = document.createElement("p");
        let card_text_II = document.createElement("p");
        let card_text_III = document.createElement("p");

        row.setAttribute("class", "table");
        card.setAttribute("class", "card");
        
        img.setAttribute("class", "card_breeders");
        PKimg.setAttribute("class", "card_breeders pkimg");

        const farm_pkname = email.slice("", -11);
        img.srcset = picture.large;
        (farm_title.textContent = `farm ${farm_pkname}`),
          (card_text.textContent = "Name: " + name.first + " " + name.last);
        card_text_I.textContent =
          "Cell: " + cell + " location:" + "  " + location.city;
        card_body.setAttribute("class", "card-body");
        farm_title.setAttribute("class", "card-title farm_title");
        card_title.setAttribute("class", "card-title");
        card_text_I.setAttribute("class", "card-text");
        card_text.setAttribute("class", "card-text");
        card_text_II.setAttribute("class", "card-text");
        card_text_III.setAttribute("class", "card-text");
        row.appendChild(col);
        row.appendChild(col_I);

        col.appendChild(card);
        col_I.appendChild(card_text_II);
        col_I.appendChild(card_text_III);
        card.appendChild(card_body);
        card_body.appendChild(farm_title);
        card_body.appendChild(img);
        card_body.appendChild(card_title);
        card_body.appendChild(card_text);
        card_body.appendChild(card_text_I);

        fetch(`https://pokeapi.co/api/v2/type/`)
          .then((response) => response.json())
          .then(function (poke_types) {
            const poke_type = poke_types.results;
            for (let alpha = 0; alpha < poke_type.length; alpha++) {
              const element_type = poke_type[alpha];

              fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${alpha}`)
                .then((response) => response.json())
                .then(function (poke_habits) {
                  var pokerand = Math.floor(Math.random() * 10);
                  const poke_type_name =
                    poke_habits.pokemon_species[pokerand].name;
                  if (poke_type_name) {
                    fetch(`https://pokeapi.co/api/v2/pokemon/${poke_type_name}`)
                      .then((response) => response.json())
                      .then(function (poke_picture) {
                        card_text_II.textContent = `Breeder type :${element_type.name}, this pokemon breeder offers a habitat for pokemons that stay in the environment ${poke_habits.name}; currently ${name.first} ${name.last} has in his farm to:`;
                        card_text_III.textContent = `${poke_picture.name}`;

                        PKimg.srcset = `https://pokeres.bastionbot.org/images/pokemon/${poke_picture.id}.png`;
                        col_I.appendChild(PKimg);
                        breedersHTML.append(row);
                      });
                  }
                });
            }
          });
      }
    },
  });
});
