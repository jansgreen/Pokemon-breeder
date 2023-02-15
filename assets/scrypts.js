class apiClass {
  constructor(datas, data) {
    this.cors = "https://cors-anywhere.herokuapp.com/";
    this.url_base = "https://pokeapi.co/api/v2/";
    this.endpoin_pokemon = 'pokemon/';
    this.poke_name = `${datas}`;
    this.poke_image = `https://img.pokemondb.net/artwork/large/${datas}.jpg`;
    this.endpoint_url = `${datas}`;
    this.PokeTotal = "?limit=0";
    this.data = data;
  }

  async Pokemon_limit() {
    const response = await fetch(this.cors + this.url_base + this.endpoin_pokemon + this.PokeTotal + this.data);
    const totalpoke = await response.json();
    return totalpoke;
  }

  async Pokemon_ability() {
    const response = await fetch(this.url_base + 'ability/' + this.poke_name);
    const poke_ability_data = await response.json();
    const effect_entries = poke_ability_data.effect_entries;
    let effect = '';
    for (let i = 0; i < effect_entries.length; i++) {
      if (effect_entries[i].language.name === 'en') {
        effect = effect_entries[i].effect;
        break;
      }
    }
    return effect;
  }
  

  async Pokemon_img() {
    const img =  this.poke_image;
    return img;
  }

  async fetchData(url) {
    const response = await fetch(this.cors + url);
    const data = await response.json();
    return data;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const api = new apiClass();
  const datas = await api.Pokemon_limit();
  const imgCard = document.getElementById('img_card');
  let count = 0; // Agrega una variable para llevar la cuenta de las tarjetas

  for (let index = 0; index < datas.results.length; index++) {
    const element = datas.results[index];
    const img = new apiClass(element.name, "");
    const poke_datas_img = await img.Pokemon_img();

    // Crea una nueva tarjeta de Pokémon y agrega sus elementos
    var col = document.createElement("div");
    col.classList.add("col");

    var card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "300px"; // Agrega esta línea para establecer el ancho
    col.appendChild(card)

    var imgEl = document.createElement("img");
    imgEl.src = poke_datas_img;
    imgEl.classList.add("card-img-top", "img-fluid");
    imgEl.style.maxWidth = "100%";
    imgEl.alt = element.name;
    card.appendChild(imgEl);

    var cardBody = document.createElement("div");
    var header = document.createElement("div");
    header.classList.add("card-header")
    var footer = document.createElement("div");
    footer.classList.add("card-footer", "text-muted")

    cardBody.classList.add("card-body");
    var title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = element.name;
    header.textContent = element.name;
    var text = document.createElement("p");
    var FooterText = document.createElement("p");

    text.classList.add("card-text");
    const statsUrl = datas.results[index].url;
    const stats =  await api.fetchData(statsUrl);
    const abilitiesUrl = stats.abilities[0].ability.url;
    const abilities = await api.fetchData(abilitiesUrl);
    const effect = await new apiClass(abilities.name).Pokemon_ability();
    text.textContent =  "Hability " +  effect;
    FooterText.textContent = "Base experience: " + stats.base_experience;
    footer.appendChild(FooterText)
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    
    card.appendChild(header);
    card.appendChild(cardBody);
    card.appendChild(footer);

    // Agrega la tarjeta a la fila actual o crea una nueva fila si ya hay 4 tarjetas en la actual
    if (count % 4 == 0) {
      var row = document.createElement("article");
      row.classList.add("row", "row-cols-1", "row-cols-md-4", "g-5");
      row.style.width="100%";
      imgCard.appendChild(row);
    }
    var currentRow = imgCard.lastChild;
    currentRow.appendChild(col);
    count++;

  }
});

