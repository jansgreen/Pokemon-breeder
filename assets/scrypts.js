var poke_url = "https://pokeapi.co/api/v2/";
var endpoint = " ";

/*============================================================================*/
/*INDEX MAGAZINE*/
/*============================================================================*/
function fetchKantoPokemon(){
    let endpoint = "pokemon?limit=12";
    fetch(poke_url+endpoint)
    .then(response => response.json())
    .then (function(allpokemon){
        allpokemon.results.forEach (function (pokemon) {
            magazine_col_I(pokemon);
        })
       })
  }

function magazine_col_I(pokemon) {
    let url = pokemon.url
    fetch(url)
      .then (response  => response.json ())
      .then (function (pokeData) {
        var magazine_col_I = document.getElementById('magazine_col_I');
        /*===================================================*/
        let col= document.createElement('div');
        let Pkimg = document.createElement('img');
        let card= document.createElement('div');
        let cardHeader= document.createElement('div');
        let cardBody= document.createElement('div');
        let cardText= document.createElement('p');
        let cardText_I= document.createElement('p');

        /*===================================================*/
        col.setAttribute("class", "col-xl-2");
        Pkimg.setAttribute("class", "card-img-top")
        card.setAttribute("class", "card align-items-xl-stretch")
        cardHeader.setAttribute("class", "card-header")
        cardBody.setAttribute("class", "card-body")
        cardText.setAttribute("class", "card-text container")
        cardText_I.setAttribute("class", "card-text container")

        
        /*===================================================*/

        col.appendChild(card);
        card.appendChild(cardHeader);
        card.appendChild(cardBody);
        cardBody.appendChild(Pkimg);
        card.appendChild(cardText);
        card.appendChild(cardText_I);

        cardHeader.textContent = pokeData.name;
        fetch(pokeData.abilities[0].ability.url)
        .then (response  => response.json ())
        .then (function (pokeAbilities) {    
        cardText.textContent = `Details: ${pokeAbilities.effect_entries[0].effect}`;
        cardText_I.textContent = `Details: ${pokeAbilities.effect_entries[1].effect}`;
               
        })
        Pkimg.srcset = `https://pokeres.bastionbot.org/images/pokemon/${pokeData.id}.png`;
        
       /*===================================================*/
        magazine_col_I.appendChild (col);
   
      })
    }

document.addEventListener('DOMContentLoaded', fetchKantoPokemon, false )

console.log("hola mundo");

  
