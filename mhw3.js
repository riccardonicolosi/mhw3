const srlimit = 20;
const api_football_endpoint = "https://v3.football.api-sports.io/teams/statistics"
const key_api_football = "4de21619e5059a1ba657044d238f787d";
// OAuth credentials --- NON SICURO!
const client_id = 'c857b9e819b53ca';
const client_secret = 'eb0987d1a226ec251d92a55b2752b1c135a06866';
const SHUTTERSTOCK_API_TOKEN = 'v2/YVF3STYzSGxiQzFrbzZ2TERUNllLVGswQVhOc3g1VlQvMzkxNDY1Mjk5L2N1c3RvbWVyLzQvNC00aEJPOVJFenRHeXFOTGhnLUNCNU9VUUZJcUdwbWhxZXdPVE94U3RvQ3F0UmsyYzBMS0tGUTVxZ2FlZG44WW80ZDlEdndZaElLQnFGdVJtaTRKUDQ2VG15bktZMHNvV2NQUW5lZ0VqcWFYcUczT2tGTE5taXV1Yng0OTRpVHhHOWxwNElielh3NzRoaUpoTExqSkwyVGNYMzFRTVI2SXE5dzZxTEtOV3BFc204NjhJd09DZmxURjhBbVJZTkEzZzd6NDVJT1gzbVdkeDVLM0VmWnRtUS9pUEEzNjhNcEFpdko0aWtkaTc4M3Nn';


function onResponse(response) {
    return response.json();
}

function onJson_foot(json) {
    console.log(json);
    const team_name = json.response.team.name;
    const league_name = json.response.league.name;
    const games_played = 'Games Played = ' + json.response.fixtures.played.total;
    const wins = 'Wins = ' + json.response.fixtures.wins.total;
    const loses = 'Loses = ' + json.response.fixtures.loses.total;
    const draws = 'Draws = ' + json.response.fixtures.draws.total;
    const goals_for = 'Goals For = ' + json.response.goals.for.total.total;
    const goals_against = 'Goals Against = ' + json.response.goals.against.total.total;
    const logo = "https://media.api-sports.io/football/teams/" + team_id + ".png";
    console.log(team_name);
    console.log(league_name);
    console.log('gp = ' + games_played);
    console.log('w = ' + wins);
    console.log('l = ' + loses);
    console.log('d = ' + draws);
    console.log('gf = ' + goals_for);
    console.log('gs = ' + goals_against);
    console.log('logo url = ' + logo);
    // Svuotiamo la libreria
    const tendina = document.querySelector('#tendina');
    tendina.innerHTML = '';
    // Creiamo il div per le statistiche
    const stat = document.createElement('div');
    stat.classList.add('stat');
    // Creiamo l'immagine
    const img = document.createElement('img');
    img.src = logo;
    // Creiamo le didascalie
    const team = document.createElement('span');
    team.textContent = team_name;
    const league = document.createElement('span');
    league.textContent = league_name + ' 2022';
    const gp = document.createElement('div');
    gp.textContent = games_played;
    const w = document.createElement('div');
    w.textContent = wins;
    const l = document.createElement('div');
    l.textContent = loses;
    const d = document.createElement('div');
    d.textContent = draws;
    const gf = document.createElement('div');
    gf.textContent = goals_for;
    const ga = document.createElement('div');
    ga.textContent = goals_against;
    // Aggiungiamo immagine e didascalie al div
    tendina.appendChild(img);
    tendina.appendChild(team);
    tendina.appendChild(league);
    stat.appendChild(w);
    stat.appendChild(l);
    stat.appendChild(d);
    stat.appendChild(gf);
    stat.appendChild(ga);
    tendina.appendChild(stat);
    tendina.classList.remove('hidden');
}

function onJson_img(json) {
    console.log('JSON ricevuto');
    // Svuotiamo la libreria
    const library = document.querySelector('#album-view');
    library.innerHTML = '';
    // Leggi il numero di risultati
    const results = json.data.items;
    let num_results = results.length;
    // Mostriamone al massimo 10
    if(num_results > 10)
      num_results = 10;
    // Processa ciascun risultato
    for(let i=0; i<num_results; i++)
    {
      // Leggi il documento
      const album_data = results[i]
      // Leggiamo info
      const title = album_data.description;
      const selected_image = album_data.url;
      // Creiamo il div che conterrà immagine e didascalia
      const album = document.createElement('div');
      album.classList.add('album');
      // Creiamo l'immagine
      const img = document.createElement('img');
      img.src = selected_image;
      // Creiamo la didascalia
      const caption = document.createElement('span');
      caption.textContent = title;
      // Aggiungiamo immagine e didascalia al div
      album.appendChild(img);
      album.appendChild(caption);
      // Aggiungiamo il div alla libreria
      library.appendChild(album);
     
    }

    library.classList.remove('hidden');
  }

function noTendina() {
    const tendina = document.querySelector('#tendina');
    tendina.innerHTML = '';
    tendina.classList.add('hidden');
    console.log('ciao tendina');

}
  
function immages(event){
    const inputValue = event.currentTarget.value + " football club";
    const queryFields = {
    query: inputValue,
    sort: 'popular',
  };
  
  const options = {
    headers: {
      Authorization: 'Bearer ' + SHUTTERSTOCK_API_TOKEN,
    },
  };

  const qry = new URLSearchParams(queryFields).toString();
  console.log(qry);
  const url = 'https://api.shutterstock.com/v2/images/search?$'+qry;
  
  fetch(url, options)
    .then(onResponse).then(onJson_img);
}

function searchTeam(event) {
    // previene il ricaricamento della pagina
    event.preventDefault();
    // salvo il valore di input
    const inputValue = event.currentTarget.value;
    // rimuovo gli spazi
    const searchQuery = encodeURIComponent(inputValue);
    // stampo in console
    console.log(searchQuery);

    if (inputValue === "Argentina")
    {
        team_id = 26;
        league_id = 1;

    }

    else if (inputValue === "Inghilterra")
    {
        team_id = 10;
        league_id = 1;

    }

    else if (inputValue === "Corea del Sud")
    {
        team_id = 17;
        league_id = 1;

    }

    else if (inputValue === "Italia")
    {
        team_id = 768;
        league_id = 1;

    }

    else if (inputValue === "Juventus")
    {
        team_id = 496;
        league_id = 135;

    }

    else if (inputValue === "Real Madrid")
    {
        team_id = 541;
        league_id = 140;
    }

    else if (inputValue === "Bayern Monaco")
    {
        team_id = 157;
        league_id = 78;

    }

    else if (inputValue === "Fiorentina")
    {
        team_id = 502;
        league_id = 135;

    }

    else if (inputValue === "Milan")
    {
        team_id = 489;
        league_id = 135;

    }

    const endpoint = api_football_endpoint + "?season=2022&team=" + team_id + "&league=" + league_id;
    console.log(endpoint);
    fetch(endpoint, {
	"method": "GET",
        "headers": {
            "x-rapidapi-host": "v3.football.api-sports.io",
            "x-rapidapi-key": key_api_football
        }
    })
    .then(onResponse)
    .then(onJson_foot);

} 


// Aggiungo event listener ai bottoni per la RICERCA
const no_tendina = document.querySelector('body');
no_tendina.addEventListener('click', noTendina);
const buttons = document.querySelectorAll(".squadra");
for (const button of buttons)
{
//button.addEventListener("click", search);
button.addEventListener("click", searchTeam);
button.addEventListener("click", immages);
}

