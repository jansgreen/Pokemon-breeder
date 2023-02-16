class APIClass {
    constructor(allpoke_search) {
      this.poke_url = "https://pokeapi.co/api/v2/";
      this.allpoke_magazene = "pokemon?limit=12&offset=";
      this.allpoke_search = allpoke_search;
      this.allpoke_list = "pokemon/";
      this.allpoke_point = `pokemon?limit=8&offset=`;
      this.url_img_pokemon = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/'
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

    Image_Poke() {
      fetch(this.url_img_pokemon + this.allpoke_search)
        .then((response) => response.json())
        .then(function (search_a_pokemon) {
          get_a_pokemon(search_a_pokemon);
          console.log(url_img_pokemon);
        });
    }

   
  }

export default APIClass;