/*
Zac Lliteras
CIS-131
3/23/22
*/
//nessisary variables 
var swap = 1;
var necessaryData;
var timerCount = setInterval(shuffle, 2000);

//event listeners for all action the user can take
document.getElementById('Launch').addEventListener('click',()=>{
  swap = 1;
  gallery.innerHTML = "";
  clearInterval(timerCount);
  httpRequest = new XMLHttpRequest();
  //gets the json file 
  httpRequest.open("get", "https://lldev.thespacedevs.com/2.2.0/launch/?limit=4&offset=90");
  //offset by 90 to get an image for each launch
  httpRequest.send();
  httpRequest.onreadystatechange = Checkdata;
})

document.getElementById('Astronauts').addEventListener('click',()=>{
  swap = 2;
  gallery.innerHTML = "";
  clearInterval(timerCount);
  httpRequest = new XMLHttpRequest();
  httpRequest.open("get", "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=4");
  httpRequest.send();
  httpRequest.onreadystatechange = Checkdata;
})

document.getElementById('Main').addEventListener('click',()=>{
  swap = 3;
  Checkdata();
  shuffle();
  timerCount = setInterval(shuffle, 2000);
})

//check data function
function Checkdata(){
  //clears out the index page
  let one = document.getElementById('s0');
  let two = document.getElementById('s1');
  let three = document.getElementById('s2');
  let four = document.getElementById('s3');
  one.innerHTML = '';
  two.innerHTML = '';
  three.innerHTML = '';
  four.innerHTML = '';
  //makes sure that the httprequest was successful
  if (httpRequest.readyState == 4 && httpRequest.status==200)
  {
      //translates the json file to usable 
      var data = httpRequest.responseText;
      necessaryData = JSON.parse(data);
      //swaps between displaying the launch and astronaut data
      if(swap == 1) Launch();
      else if (swap == 2) Astronauts();
  }
}

//launch function 
function Launch(){
  //foreach statement that displays the four results from the launch data
  for (i = 0; i < necessaryData.results.length; i++) {
    var launch = document.getElementById('s' + i);
    let launchimage = document.createElement('img');
    launchimage.setAttribute('id', 'images')
    launchimage.setAttribute('src', necessaryData.results[i].image);
    launch.appendChild(launchimage);
    let launchname = document.createElement('p');
    launchname.setAttribute('id', 'name')
    launchname.innerHTML = necessaryData.results[i].name;
    launch.appendChild(launchname);
    let launchPlace = document.createElement('p');
    launchPlace.innerHTML = necessaryData.results[i].pad.location.name;
    launch.appendChild(launchPlace);
    let launchPad = document.createElement('p');
    launchPad.innerHTML = necessaryData.results[i].pad.name;
    launch.appendChild(launchPad);
  }
}


function Astronauts(){
  //same as the launch function however the location of the data I needed was diffent
  //so it was necessary to split the two
  for (i = 0; i < necessaryData.results.length; i++) {
    var Astro = document.getElementById('s' + i);
    let Astroimage = document.createElement('img');
    Astroimage.setAttribute('id', 'images')
    Astroimage.setAttribute('src', necessaryData.results[i].profile_image);
    Astro.appendChild(Astroimage);
    let Astrohname = document.createElement('p');
    Astrohname.setAttribute('id', 'name')
    Astrohname.innerHTML = necessaryData.results[i].name;
    Astro.appendChild(Astrohname);
    let Astrohststatus = document.createElement('p');
    Astrohststatus.innerHTML = 'Status: ' + necessaryData.results[i].status.name;
    Astro.appendChild(Astrohststatus);
    let AstroBio = document.createElement('p');
    AstroBio.innerHTML = necessaryData.results[i].bio;
    Astro.appendChild(AstroBio);
  }
}
/*
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
*//code copied from the image swapping project to so the starting page looks better//*
|XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX|
*/

//Outputs a random image in each of the twelve slots 
var imgArray1 =['img1.jpg', 'img2.jpg', 'img3.jpg', 'img4.jpg', 'img5.jpg', 'img6.jpg', 'img7.jpg', 'img8.jpg', 'img9.jpg', 'img10.jpg', 'img11.jpg', 'img12.jpg'];
var gallery = document.getElementById('gallery');

var path = "images/"

window.onload = loadImages();

function loadImages(){
  for(var i=0; i < imgArray1.length; i++)
  {
    let s = Math.floor((Math.random() * imgArray1.length))
    let galleryitem = document.createElement('img');
    galleryitem.setAttribute('class', "galleryImages");
    galleryitem.setAttribute('id', "img" + [i]);
    galleryitem.setAttribute('src', path + imgArray1[s]);
    gallery.appendChild(galleryitem);
  }
}

function shuffle(){
  gallery.innerHTML = "";
  for(var i=0; i < imgArray1.length; i++)
  {
    let s = Math.floor((Math.random() * imgArray1.length))
    let galleryitem = document.createElement('img');
    galleryitem.setAttribute('class', "galleryImages");
    galleryitem.setAttribute('id', "img" + [i]);
    galleryitem.setAttribute('src', path + imgArray1[s]);
    gallery.appendChild(galleryitem);
  }
}