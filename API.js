/*
function for Spotify API calls
credit to https://editor.p5js.org/atsss/sketches/ewTOnyABA
^^ used their functions as a guide for the spotify API, 
all comments are mine 
*/

//gets the song's data analysis 
function getSongVar(url2){
  
  getAPIData(accessToken, url2, function(searchResults) { 
    
    //data we retreived 
    data2 = searchResults;
    song.data = data2;
    
    //flower colors
    let col =  data2.energy 
    song.col = map(col, 0, 1, 0, 360); 
    let starColor = data2.valence; 
    song.starColor = map(starColor, 0, 1, 130, 360); 
    
    //data used for flower visual traits
    song.flowers = true; 
    song.tempo = floor(data2.tempo/20); 
    song.energy = (data2.energy); 
    song.dance = floor(data2.danceability * 20) 
    if (song.dance < 5){
      song.dance = random(6, 9);
    }
    
  });
}

//gets the song's track id, which is used to retrieve the song's audio anaylis
function getSongData() {

  var url = api + song.value() + units;
  
  getAPIData(accessToken, url, function(searchResults) { 
    
    //data we retreived 
    data = searchResults;
  
    song.code = data.tracks.items[0].id;
    song.track = data.tracks.items[0].name
    song.artist = data.tracks.items[0].artists[0].name 
    
    //calls API to get the song's audio analysis
    var url2 = "https://api.spotify.com/v1/audio-features/" + str(song.code);
    getSongVar(url2)
    
  });
  
}

//function to get access token through client credentials flows 
function getAccessToken(callback) {
  //url for spotify authorization 
  var url = "https://accounts.spotify.com/api/token";
  
  //send a POST request to Spotify 
  var request = new XMLHttpRequest();
  request.open("POST", url, true);
  
  //create authorization code, must be base 64
  code = client_id + ":" + client_secret
  
  request.setRequestHeader("Authorization", code);
  request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
  request.addEventListener("load", function() {
    callback(JSON.parse(this.responseText).access_token);
  });
  
  //type of authorization is client credentials 
  request.send("grant_type=client_credentials");
}

//function to get APIData 
function getAPIData(accessToken, url, callback) {
  if (!accessToken) {
    throw "Can't do an API call without an access token!";
  }
  //requests an API call 
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Authorization", "Bearer " + accessToken);
  request.addEventListener("load", function() {
    callback(JSON.parse(this.responseText));
  });
  request.send();
}