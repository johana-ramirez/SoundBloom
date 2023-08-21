/*
User can input a song in the text box and flowers will grow based on that song.
This uses the Spotify API. 
*/

//hold access token for Spotify API
var accessToken;
//holds the creditentials for API authorization 
var client_id = "";
var client_secret = "";
//holds the general data of a song: id, artist, song name
var data;
//holds the song's audio anaylsis, used for the flower design 
var data2; 
//url for the first API call to get the song's general information
var api = 'https://api.spotify.com/v1/search?q=';
var units = '&type=track';
//user input 
let song;
//submit button 
let button;
//attractor, used for wind
let attractor; 
//holds all the flower objects
let flowers = []; 
//string that is shown on bottom of the canvas.
//Instructions or song name
let textSong; 

/*
gets access token, setups the input box and submit buttom, creates
the attractor, and string for instructions
*/
function setup() {
  createCanvas(500, 500);
  noStroke();
    //receive access token 
    getAccessToken(function(incoming) {
   
    accessToken = incoming;
  });
  
  //song name
  song = createInput();
  song.position(20, height + 20);
  song.flowers = false; 
  
  //submit button 
  button = createButton('submit');
  button.position(song.x + song.width, height + 20);
  //need to fix this, if buttom is pressed but no input
  button.mousePressed(getSongData);
  
  //attractor for wind
  attractor = new Attractor(10); 
  
  //instructions 
  textSong = "Type a song and click submit! Create a musical garden!"; 
}

function draw() {
  background("rgb(70,153,107)");
  
  //attractor position 
  attractor.position.x = mouseX;
  attractor.position.y = mouseY; 
  
  //rectangle for text background
  fill("rgb(247,237,188)")
  rect(0, height - 30, width, 30); 
  
  //add text 
  if (textSong != null){
    textAlign(CENTER);
    fill("rgb(22,4,84)");
    text(textSong, width/2, height - 10);
  }
  
  //creates flower based on song inputed 
  if (song.code != null && song.flowers == true){ 
    //text for song title and artist on canvas
    textSong = song.track + " by " + song.artist; 
    song.flowers = false;   
    //creates flower based on song data
    flower = new Flower(song.col, song.energy, random(20, width - 20),
            random(height - 60), song.tempo, song.dance, song.starColor)
    //creates the flower's petals 
    flower.createCircles(); 
    flowers.push(flower);
  }
  
  //draws and updates the flowers
  for(let i = 0; i<flowers.length; i++){
    //applies wind to seeds
    flowers[i].seeds.system.applyAttractor(attractor); 
    flowers[i].draw();
    
    //updates the flower if it is still alive 
    if (flowers[i].dissapear != true) {
        flowers[i].update();
        }
    //creates and draws the seeds 
    if (flowers[i].reproduce == true){
      flowers[i].seeds.create();  
    }  
  }
  
}
