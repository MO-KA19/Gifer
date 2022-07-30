// Select type of the gif
let types = document.querySelectorAll(".type");
let readySelector = false;
let selection = null;

for (let i=0; i < types.length; i++) {
    types[i].onclick = () => {

        types[i].classList.toggle("active");
        let value = types[i].innerHTML;
        selection = value;
        readySelector = true;

        for (let j=0; j < types.length; j++) {
            if (types[j].innerHTML != value && types[i].classList.contains("active")) {
                types[j].style.pointerEvents = "none";   
            }
            

            else {
                types[j].style.pointerEvents = "unset";
            };
        };
    };
};





// Count of the gifs
let plus = document.getElementById("plus");
let min = document.getElementById("min");
let num = document.getElementById("count");
let value = num.value;

plus.onclick = () => {
    if (min.style.display != "inline-block") {
        min.style.display = "inline-block";
    }

    let toNumber = Number(value);
    value = toNumber;
    value +=1;
    num.value = value;

    if (value >= 20) {
        plus.style.display = "none";
    }
}



min.onclick = () => {
    if (plus.style.display != "inline-block") {
        plus.style.display = "inline-block";
    }

    let toNumber = Number(value);
    value = toNumber;
    value -=1;
    num.value = value ;

    if (value <= 1) {
        min.style.display = "none";
    }
    
}






// Calling APIa and handling data
// Define Global variables & Arrays
let generate = document.querySelector(".gen-btn");
let container = document.querySelector(".gifs");

urls = [];
let keys = [
    "KTEZUlycALdU6jcxSeE3Nco50OskPRMN",
    "bruTSrtRYUpHKHrHfUUTxLLAK4QVHmD9",
    "eSQhvc6UWB9iz7lIFn5M5QE0FomDHbJZ",
    "tof6b196ch78LTuH31E6fTA1BUoy7RYX",
    "zkzRBdQQcBc8AepLeAOy8dlQ0rW392nj",
    "pLxKIJDkHbpq0Dksf4M1LwGMWspxaaCk"
];



// Create a function to get a single and multi random choice
function GetRandom(arr) {
    let random = arr[Math.floor(Math.random() * arr.length)];
    return random;
};



function getMultipleRandom(arr, k) {
    let newArr = []
    for (let i=0; i < k; i++) {
        let random = arr[Math.floor(Math.random() * arr.length)];
        newArr.push(random);
    };
    return newArr;
};



// Get data from the user
function getEndpoint() {
    let sentData = null;
    let api = null;

    if (readySelector === true) {

        if (selection === "Trend") {
            sentData = "trending";
            api = `https://api.giphy.com/v1/gifs/${sentData}?`;
        }

        else if (selection === "Random") {
            sentData = "random";
            api = `https://api.giphy.com/v1/gifs/${sentData}?`;
        }

        else {
            sentData = selection;
            api = `https://api.giphy.com/v1/gifs/search?q=${sentData}&`;
        }
    }


    else {
        let searchInp = document.querySelector("#search-bar").value;
        api = `https://api.giphy.com/v1/gifs/search?q=${searchInp}&`;
    }

    return api;
}




// Get the resoultion
function getSize() {
    let resloution = null;
    let selection = document.querySelector("#selector").value;

    if (selection === "large") {
        resloution = "downsized_large";
    }

    else if (selection == "medium") {
        resloution = "downsized_medium";
    }

    else {
        resloution = "fixed_height_small";
    }

    return resloution;
};



// Get the count of GIFs wanted
function getCount() {
    let numInp = document.querySelector("#count");
    return numInp.value;
};



// Filtering, and send api request to generate GIFs
generate.onclick = (async () => {

    if (navigator.onLine === true) {
        let api_key = GetRandom(keys);
        let api = getEndpoint();
        let URL = api+`api_key=${api_key}`;


        const response = await fetch (URL);
        const data = await response.json();


        let repos = data["data"];
        let quantity = getCount();
        let size = getSize();
        let Randomrepos = getMultipleRandom(repos,quantity);
        

        for (let i=0; i < Randomrepos.length; i++) {
            let src = Randomrepos[i]["images"];
            let url = src["original"]["url"];
            let downloadedUrl = src[size]["url"];

            
            let miniContainer = document.createElement("div"); 
            let anchor = document.createElement("a");
            let img = document.createElement("img");
            let actions = document.createElement("div");
            let download = document.createElement('img');
            let copy = document.createElement("img");
            

            img.setAttribute("src",url);
            img.setAttribute("alt", "GIF");
            anchor.setAttribute("href", downloadedUrl);
            anchor.setAttribute("download", "Animated_Gif.gif");
            download.setAttribute("src", "./resources/download.png");
            download.setAttribute("title", "Download with the selected size");   
            copy.setAttribute("src","./resources/copy.png");
            copy.setAttribute("title", "Copy link");
            copy.onclick = () => {
                navigator.clipboard.writeText(downloadedUrl);
            };


            img.classList.add("gif");
            download.classList.add("actions-ico");
            copy.classList.add("actions-ico");
            actions.classList.add("actions");
            miniContainer.classList.add("mini-container");
            

            anchor.appendChild(download);
            miniContainer.appendChild(img);
            miniContainer.appendChild(actions);
            actions.appendChild(anchor);
            actions.appendChild(copy);
            container.appendChild(miniContainer);  
        };
    }


    else {
        alert("Please check your connection");
    }
});






// Calling API for random GIFs section
let sample = document.querySelectorAll(".sample");
let play = document.querySelectorAll(".mini-container2 i");
let length = play.length
let keyWords = [
    "gaming","game","video game","games","playstaion","xbox","computer","cars","bikes","girls",
    "rgb","pc","rtx","meme","memes","comedy","funny","movies","films","tv","series","cinema",
    "popcorn","action","space","science","stars","sky","plants","cats","dogs","birds","pet",
    "splurge","pity","pressure","national","pavement","object","school","patent","accompany",
    "art","raise","single","fight",'sun',"tease","disco","ballet","endorse","grind","actors",
    "convenience","camp","cheque","music","top","avenue","dream","summit","society","cartoon",
    "portrait","rent","article","game","distortion","team","theme","powder","slime","privilege",
    "book","week","debut","sport","lazy","suffer","bottom","disagree","shortage","Mars","helpless",
];





for (let i=0; i < length; i++) {
    play[i].setAttribute("title", "Click to generate a random GIF");

    play[i].onclick = async () => {
        let api_key = GetRandom(keys);
        let query = keyWords[Math.floor(Math.random() * keyWords.length)];
        let url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${api_key}`;


        const response = await fetch(url);
        const data = await response.json();


        let Randomrepo = GetRandom(data["data"]);
        let newImg = Randomrepo["images"]["original"]["url"];


        sample[i].removeAttribute("src");
        sample[i].setAttribute("src", newImg);
        sample[i].classList.add(".sample");  
    };
};






// Set copy Right year
let year = document.getElementById("year");
let time = new Date();
let currentYear = time.getFullYear();
year.innerHTML = currentYear;