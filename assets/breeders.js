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
          let mb = document.createElement("div");
          let row = document.createElement("div");
          let col = document.createElement("div");
          let col_I = document.createElement("div");
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

          mb.setAttribute("class", "card mb-3");
          row.setAttribute("class", "row no-gutters");
          col.setAttribute("class", "col-md-4");
          col_I.setAttribute("class", "col-md-8");

          img.setAttribute("class", "card_breeders");
          PKimg.setAttribute("class", "card_breeders pkimg");
          PKimg.setAttribute("style", "width: 8rem;");

  
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
          mb.appendChild(row);
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
  
                          PKimg.srcset = `https://img.pokemondb.net/artwork/large/${poke_habits.pokemon_species[pokerand].name}.jpg`;
                          col_I.appendChild(PKimg);
                          breedersHTML.appendChild(mb);
                        });
                    }
                  });
              }
            });
        }
      },
    });
  });