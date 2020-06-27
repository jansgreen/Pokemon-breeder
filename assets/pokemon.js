/*==========================================================================================*/
/*SHOW A LIST OF POKEMONS ==> in pokemon.js you can find a spesific pokemond and it show all pokemon we have in de pokeapi*/ 
/*==========================================================================================*/
class api_url {
    constructor(allpoke_search) {
      this.poke_url = "https://pokeapi.co/api/v2/";
      this.allpoke_magazene = "pokemon?limit=12&offset=";
      this.allpoke_search = allpoke_search;
      this.allpoke_list = "pokemon/";
      this.allpoke_point = `pokemon?limit=8&offset=`;
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

  let page = 0;

$(document).ready(function () {
    let data = new api_url(`${page}`);
    data.search_url();
    $('#count').text("Page: "+page)

    const clear = document.getElementById("pokemons");
    $('#pagess').on('click', function() {page++;
        clear.innerHTML = " ";
        let data = new api_url(`${page*8}`);
        console.log(page*8);
        data.search_url();
        $('#count').text("Page: "+page)

            
    });
    
    $('#page_less').on('click', function() {
      $('.add-remove').slick(page - 1);
      if (page !== 0){page--;
        clear.innerHTML = " ";
        let data = new api_url(`${page*8}`);
        console.log(page*8);
        data.search_url();
        $('#count').text("Page: "+page)
    }
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
  /*SEARCH A  POKEMON*/
  /*==========================================================================================*/
  $(document).ready(function() {
    const clear = document.getElementById("searchpokemons");
    clear.innerHTML=` `;
    let index = Math.floor(Math.random() * 964);
    var endpoint = `pokemon/${index}`;
    let data = new api_url(endpoint);
    data.search_one();
      
  });
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