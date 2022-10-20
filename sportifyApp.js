let lenghtOfAudio;
let volAdd = 0;
let min = 0;
const user_cache = localStorage.getItem("cached")

const playerscreen = document.querySelector(".player-container");

const screen = document.querySelector(".player-screen");
const rect = screen.getBoundingClientRect()
const b_rect = rect.bottom;

var musics = [{
    id: "1",
    title: "chike",
    atistName: "roju",
    favorite: false,
    songImg: './images/1.jpg',
    audio: new Audio('./musics/a (8).mp3'),
}, {
    id: "2",
    title: "climb every mountain",
    atistName: "unknown",
    favorite: true,
    songImg: './images/2.jpg',
    audio: new Audio('./musics/a (1).mp3')
}, {
    id: "3",
    title: "who am i",
    atistName: "casting",
    favorite: false,
    songImg: './images/3.jpg',
    audio: new Audio('./musics/a (3).mp3')
}, {
    id: "4",
    title: "money",
    atistName: "carbi b",
    favorite: false,
    songImg: './images/4.jpg',
    audio: new Audio('./musics/a (2).mp3')
}, {
    id: "5",
    title: "make a know",
    atistName: "roju ft maryokun",
    favorite: false,
    songImg: './images/5.jpg',
    audio: new Audio('./musics/a (6).mp3')
}, {
    id: "6",
    title: "running",
    atistName: "chike ft simi",
    favorite: false,
    songImg: './images/7.jpg',
    audio: new Audio('./musics/a (7).mp3')
}, {
    id: "7",
    title: "mama ne pas view ",
    atistName: "charlotte depanda",
    favorite: false,
    songImg: './images/8.jpg',
    audio: new Audio('./musics/a (4).mp3')
}, {
    id: "8",
    title: "zoom zoom ",
    atistName: "cheque",
    favorite: false,
    songImg: './images/9.jpg',
    audio: new Audio('./musics/a (5).mp3')
}, {
    id: "9",
    title: "love nwantiti",
    atistName: "ckay",
    favorite: false,
    songImg: './images/10.jpg',
    audio: new Audio('./musics/a (9).mp3')
}, {
    id: "10",
    title: "rockabye",
    atistName: "sean paul ft selena gomez",
    favorite: false,
    songImg: './images/11.jpg',
    audio: new Audio('./musics/a (10).mp3')
}, {
    id: "11",
    title: "khaid ",
    atistName: "unknown",
    favorite: false,
    songImg: './images/12.jpg',
    audio: new Audio('./musics/a (11).mp3')
}, {
    id: "12",
    title: "touch it",
    atistName: "kidi ft tyga",
    favorite: false,
    songImg: './images/13.jpg',
    audio: new Audio('./musics/a (12).mp3')
}, {
    id: "13",
    title: "mood",
    atistName: "24nkgold",
    favorite: false,
    songImg: './images/14.jpg',
    audio: new Audio('./musics/a (13).mp3')
}, {
    id: "14",
    title: "perfect",
    atistName: "ed shereen",
    favorite: false,
    songImg: './images/15.jpg',
    audio: new Audio('./musics/a (14).mp3')
}, {
    id: "15",
    title: "baddest",
    atistName: "nicky ft future",
    favorite: false,
    songImg: './images/16.jpg',
    audio: new Audio('./musics/a (15).mp3')
}, {
    id: "16",
    title: "Dragon",
    atistName: "Morien",
    favorite: false,
    songImg: './images/15.jpg',
    audio: new Audio('./musics/Dragon.mp3')
}, {
    id: "17",
    title: "medecine",
    atistName: "Jaywills",
    favorite: false,
    songImg: './images/15.jpg',
    audio: new Audio('./musics/medecine.mp3')
}, {
    id: "18",
    title: "wrecked",
    atistName: "Imaging dragon",
    favorite: false,
    songImg: './images/10.jpg',
    audio: new Audio('./musics/wrecked.mp3')
}]

if (!user_cache) {
    localStorage.setItem("cached", JSON.stringify({
        cr: 0,
        lv: "0",
        fv: [...musics.map(fav => fav.favorite)],
        lm: 0
    }))
}

let vl = 0
let j = JSON.parse(localStorage.getItem("cached")).lm,
    i = 1;


function check() {
    if (j > musics.length - 1) {
        j = 0;
    }
    if (j < 0) {
        j = musics.length - 1;
    }
}
const cached = JSON.parse(localStorage.getItem("cached"))

function changeVolcolor() {
    const r = document.querySelector(":root")
    const rs = getComputedStyle(r);
    if (vl < 0.1) {
        r.style.setProperty("--color-color", "red")
    } else {
        r.style.setProperty("--color-color", "rgb(25, 135, 84)")
    }

}
//end of checking here
//because this little piece of code will be use many time in the program so i thought it wise to name init()//for short form for initial
const fav = JSON.parse(localStorage.getItem("cached")).fv
musics.map((music_, index) => music_.favorite = fav[index])
let whenMouseDownForLong = true;
const copy = musics.slice().filter(music => music)
var isShuffle = false

function shuffle() {
    isShuffle = !isShuffle
    if (isShuffle) {
        musics.sort(() => 0.5 - Math.random())
    } else {
        musics = copy
    }
}


const init = () => {
    check()
    audio.load(); //this pause the previous musics
    const currentAudio = musics[j]; //take music from music library
    audio = currentAudio.audio; //give a new reference to the music
    document.querySelector(".music-name").innerHTML = `${currentAudio.title} mp3`; //display the current music name on the screem
    document.querySelector(".artist-name").innerHTML = `${currentAudio.atistName}`;
    document.querySelector(".player-screen").style.backgroundImage = `url('${musics[j].songImg}')`
    audio.play() //play the current audio
    audio.volume = parseFloat(JSON.parse(localStorage.getItem("cached")).lv); //keep track of the volume
    lenghtOfAudio = parseInt(audio.duration); //get the lenght of the audio;
    document.getElementById("running").max = lenghtOfAudio; //set the range to a precise value
    document.querySelectorAll(".pauseimg").forEach(x => {
            x.src = './pause-btn.png';
        }) //toggle the image on the play button where ever init() is call
    document.querySelector(".music-time").innerHTML = `${Math.floor((lenghtOfAudio / 60))}:${Math.floor((lenghtOfAudio % 60))} `
    min = 0; //min start for short form of minute which helps to set the minute to 0 when changing a new song
    document.querySelector(".favorite-icon").innerHTML = musics[j].favorite ? "<span>❤</span>" : "<span>🤍</span>";

    cached.lm = j
    localStorage.setItem("cached", JSON.stringify(cached));

}
const running = () => { //click and play audio at a certain time
        document.getElementById("running").max = audio.duration;
        audio.currentTime = document.getElementById("running").value; //get the position and give it to the audio.currentme (object)
        for (let ct = 0; ct < (parseInt(audio.currentTime) / 60); ct++) {
            min = ct; //keep track of the minutes 
        }
        if ((parseInt(audio.currentTime) < 60)) {
            min = 0; //condition for setting minutes
        }
        // cached.cr = audio.currentTime
        localStorage.setItem("cached", JSON.stringify(cached));
    }
    //end of init
vl = parseFloat(JSON.parse(localStorage.getItem("cached")).lv);
document.getElementById("volume").value = vl;
let audio = musics[j].audio
audio.currentTime = JSON.parse(localStorage.getItem("cached")).cr
audio.volume = parseFloat(JSON.parse(localStorage.getItem("cached")).lv);
document.querySelector(".favorite-icon").innerHTML = musics[j].favorite ? "<span>❤</span>" : "<span>🤍</span>";
document.querySelector(".favorite-icon").addEventListener("click", e => {
        if (!musics[j].favorite) {
            e.target.innerHTML = "<span>❤</span>";
            musics[j].favorite = true;
            document.querySelector(".animate-favorite span").innerHTML = "<span>❤</span>";
            document.querySelector(".animate-favorite").innerHTML += "added to favorite musics";
            document.querySelector(".animate-favorite").classList.add("add-animation")
            setTimeout(() => {
                document.querySelector(".animate-favorite").innerHTML = `<span></span>`
                document.querySelector(".animate-favorite").classList.remove("add-animation")
            }, 1000);
        } else {
            e.target.innerHTML = "<span>🤍</span>";
            musics[j].favorite = false;
            document.querySelector(".animate-favorite").innerHTML = "<span>🤍</span>";
            document.querySelector(".animate-favorite").innerHTML += "remove from favorite musics";
            document.querySelector(".animate-favorite").classList.add("add-animation")
            setTimeout(() => {
                document.querySelector(".animate-favorite").classList.remove("add-animation")
                document.querySelector(".animate-favorite").innerHTML = `<span></span>`
            }, 1000);
        }

        cached.fv = [...musics.map(f => f.favorite)]
        localStorage.setItem("cached", JSON.stringify(cached));
        e.stopPropagation()
    })
    //change the musics

const next = () => {
    ++j; //keep track of the present position of a song
    init(); //check above to see the full documentation of init
}

$(".shuffle").click(function(e) {
    shuffle()
    e.stopPropagation()
});
document.querySelector("#next").addEventListener("click", (e) => {
    if (whenMouseDownForLong) {

        ++j; //keep track of the present position of a song

        init(); //check above to see the full documentation of init
    }
    e.stopPropagation()
});

const pre = () => {
        --j; //keep track of the present position of a song

        init(); //check above to see the full documentation of init
    }
    //the list function display the music a list format and make it clickable
function showList() {
    document.querySelector(".get-music-list").style.display = `block`; //on clicking list show get music list
    document.querySelector(".get-music-list").innerHTML = `
    <div class="close" >close</div>` +
        musics.map(item => {
            const heart = item.favorite ? "❤" : "🤍";
            return `<p class="enclose" >${(item.title)} <span >${heart}</span><p>`
        }).join("") //loop through the music object and return all the music.title found since it return an array so i thouught it wise to join it
    $(".close").click(function(e) {
        closelist()
        e.stopPropagation()
    });
    document.querySelectorAll('.enclose').forEach((lst, index, arr) => { //in each iteration i added a button call enclose,, check above
        lst.addEventListener("click", (e) => { //in each of the enclose add an event call click
            j = index; //document.querySelector(".playlist") will return an array so lst will be the individual element of the array so on clicking it will give the index 
            init() //call init() so a song can be play
            e.stopPropagation()
        })
    })
}
$(".showList").click(function(e) {
    showList()
    e.stopPropagation()

});
document.querySelector(".vol").innerHTML = (parseFloat(JSON.parse(localStorage.getItem("cached")).lv) * 100) > 0 ?
    parseFloat(JSON.parse(localStorage.getItem("cached")).lv) * 100 : "🔇"; //set the screen volume
function closelist() { //close the list 
    document.querySelector(".get-music-list").style.display = `none`;
}


$(".player-container").click(function(e) {
    closelist()
    e.stopPropagation()
});

const vol = () => { //set and keep track of the volume
    vl = document.getElementById("volume").value //get the volume value of the range
    audio.volume = vl; //get the initial volume since every audio come with it own volume
    cached.lv = audio.volume
    localStorage.setItem("cached", JSON.stringify(cached))
    document.querySelector(".vol").innerHTML = (vl * 100) > 0 ? vl * 100 : "🔇"; //output to the screen
    changeVolcolor()
}


const pause = () => { //pause and play the song on a click 
    // init();
    if (++i & 1) {
        audio.pause()
        document.querySelectorAll(".pauseimg").forEach(x => {
                x.src = './play-btn.png';
            }) //toggle image on the pause and play button
    } else {
        document.querySelectorAll(".pauseimg").forEach(x => {
            x.src = './pause-btn.png';
        })
        audio.play()
            // init()
    }
    document.querySelector(".music-time").innerHTML = `${Math.floor((parseInt(audio.duration) / 60))}:${Math.floor((parseInt(audio.duration) % 60))} `
}

// toggle to section here
document.addEventListener('contextmenu', event => event.preventDefault());
const forward = document.getElementById("next")
let timer, time;
$("#next").mouseup(() => {
    setTimeout(() => {
        whenMouseDownForLong = true
    }, 500);
    clearTimeout(timer)
    clearInterval(time)
}).mouseleave(function() {
    setTimeout(() => {
        whenMouseDownForLong = true
    }, 500);
    clearTimeout(timer)
    clearInterval(time)
}).mousedown(() => {
    timer = setTimeout(() => {
        whenMouseDownForLong = false;
        time = setInterval(() => {
            audio.currentTime += 5;
            for (let ct = 0; ct < (parseInt(audio.currentTime) / 60); ct++) {
                min = ct; //keep track of the minutes 
            }
            document.querySelector(".player-time").innerHTML = `${Math.floor((parseInt(audio.currentTime) / 60))}:${Math.floor((parseInt(audio.currentTime) % 60) % 60)} `;
        }, 500);

    }, 500);
})

forward.addEventListener("touchend", () => {
    setTimeout(() => {
        whenMouseDownForLong = true
    }, 500);
    clearTimeout(timer)
    clearInterval(time)
})
forward.addEventListener("touchstart", () => {
    timer = setTimeout(() => {
        whenMouseDownForLong = false;
        time = setInterval(() => {
            audio.currentTime += 5;
            for (let ct = 0; ct < (parseInt(audio.currentTime) / 60); ct++) {
                min = ct; //keep track of the minutes 
            }
            document.querySelector(".player-time") ? document.querySelector(".player-time").innerHTML = `${Math.floor((parseInt(audio.currentTime) / 60))}:${Math.floor((parseInt(audio.currentTime) % 60) % 60)} ` : "";
        }, 500);

    }, 500);
})
const search = () => { //search and return a music and its clickable
    if (document.getElementById("search").value.length > 0) { //validity check
        document.querySelector(".music-library").style.display = "block";
        let list = musics.map(obj => {
            if (obj.title.toLowerCase().trim().includes(document.getElementById("search").value.toLowerCase().trim())) {
                return `<p class="search-value  py-2 ps-2 rounded-2 text-white fw-bolder bg-secondary">&nbsp${obj.title}</p>`;
            }
        }).sort().join("")
        document.querySelector(".music-library").innerHTML = list.length ? list : `sorry your music is not in the list`; //set what is found on the screen
        document.querySelectorAll(".search-value").forEach(item => { //add event to each of the item found //remember it is enclose in the p tag with a class of search value
            item.addEventListener("click", () => {
                const currentClickVal = item.innerHTML.slice(6); //get the inner html and remove turf not needed
                musics.forEach((music, index, arr) => {
                    if (music.title == currentClickVal) { //if the innnerhtml is equal to any of the music.title value //get the index
                        j = index;
                        init();
                        document.querySelector(".music-library").style.display = "none";
                        document.getElementById("search").value = ""

                    }
                })

            })
        })
    } else {
        document.querySelector(".player-screen").classList.remove("add-player-screen")
        $(".music-library").hide(1000);
        $("#volume").show(1000);
    }
}
setInterval(() => { //running the range and time on the screen
    let time = parseInt(audio.currentTime);
    if (time === lenghtOfAudio) {
        next();
        min = 0;
    }
    if (!audio.paused && (time) % 60 === 0) {
        if (time >= 1) {
            ++min;
        }
    }
    document.querySelector(".playing-time").innerHTML = min + ":" + time % 60;
    document.getElementById("running").value = audio.currentTime;
    cached.cr = audio.currentTime
    localStorage.setItem("cached", JSON.stringify(cached));
}, 1000);
//eventlister section here 🐁
function checkVolume() {
    if (volAdd >= 1) {
        volAdd = 1;
    }
    if (volAdd < 0) {
        volAdd = 0
    }
    audio.volume = volAdd;
    document.getElementById("volume").value = volAdd;
    cached.lv = volAdd

    localStorage.setItem("cached", JSON.stringify(cached))
    vol()
}
//using keeps to control the volume
window.addEventListener("keyup", (e) => {
    volAdd = parseFloat(JSON.parse(localStorage.getItem("cached")).lv);
    const keypress = e.key
    switch (keypress) {
        case "n":
            next()
            break;
        case "p":
            pre()
            break;
        case "ArrowUp":
            volAdd += 0.1;
            break;
        case "ArrowDown":
            volAdd -= 0.1;
            break;
        case "ArrowRight":
            audio.currentTime += 5
            if (document.querySelector(".player-time")) document.querySelector(".player-time").innerHTML = `${Math.floor((parseInt(audio.currentTime) / 60))}:${Math.floor((parseInt(audio.currentTime) % 60) % 60)} `;
            break;
        case "ArrowLeft":
            audio.currentTime -= 5
            if (document.querySelector(".player-time")) document.querySelector(".player-time").innerHTML = `${Math.floor((parseInt(audio.currentTime) / 60))}:${Math.floor((parseInt(audio.currentTime) % 60) % 60)} `;
            break;
        default:
            "hahhahah"
            break
    }
    checkVolume()
})
playerscreen.addEventListener("wheel", (e) => { //using mouse to control the volume
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const heightOfContainer = document.querySelector(".player-screen").getBoundingClientRect().height + document.querySelector(".player-screen").offsetTop;
    const getPos = mouseX - playerscreen.offsetLeft;
    volAdd = parseFloat(JSON.parse(localStorage.getItem("cached")).lv);
    if ((getPos) > (playerscreen.getBoundingClientRect()
            .width / 1.2) && (mouseY < heightOfContainer) && mouseY >
        document.querySelector(".player-screen").offsetTop) {
        if (e.deltaY > 1) {
            volAdd -= 0.1;
        } else {
            volAdd += 0.1;
        }
        checkVolume()
    }
})
let mousePos = {
    firstPos: null,
    secondPos: null,
    diff: null
}
const secondscreen = document.querySelector(".player-screen")
let ismousedown = false;
playerscreen.addEventListener("mousedown", (e) => {
    ismousedown = true
    mousePos.firstPos = (e.clientX) - playerscreen.offsetLeft;
})
playerscreen.addEventListener("mouseup", (e) => {
    ismousedown = false
    mousePos.secondPos = (e.clientX) - playerscreen.offsetLeft;
    const changeornot = mousePos.secondPos - mousePos.firstPos;
    if (changeornot > (playerscreen.getBoundingClientRect().width / 2)) {
        next()
        document.querySelector(".next-music-image").style.backgroundImage = `url(${musics[j+1].songImg})`
    }
    if (-changeornot > (playerscreen.getBoundingClientRect().width / 2)) {
        pre()

    }
})

function move(e) {
    mousePos.diff = mousePos.secondPos - ((e.clientX) - playerscreen.offsetLeft);
    if (ismousedown) {
        document.querySelector(".song").innerHTML = Math.abs(mousePos.diff) + "px"
        if (mousePos.diff > 1) {
            secondscreen.style.marginRight = Math.abs(mousePos.diff) + "px"
        }
        if (mousePos.diff < 1) {
            secondscreen.style.marginLeft = Math.abs(mousePos.diff) + "px"
        }
    }
}
const coord = {
    x1: null,
    x2: null,
    xdff: (x, y) => y - x
}
let istouch = false
playerscreen.addEventListener("touchstart", (e) => {
    coord.x1 = e.touches[0].pageX - e.target.offsetLeft;
    istouch = true
})
playerscreen.addEventListener("touchend", (e) => {
    secondscreen.style.left = `0px`
})
playerscreen.addEventListener("touchmove", (e) => {
    coord.x2 = e.changedTouches[0].clientX - e.target.offsetLeft;
    secondscreen.style.display = `absolute`
    if (b_rect >= e.changedTouches[0].clientY) {
        if (coord.xdff(coord.x1, coord.x2) > 1) {
            if (Math.abs(coord.xdff(coord.x1, coord.x2)) > (window.innerWidth / 4)) {
                (function() {
                    if (istouch) {
                        pre()
                            // document.querySelector(".next-music-image").style.backgroundImage = `url(${musics[j-1].songImg})`
                        if (!((j - 1) < 0)) {
                            document.querySelector(".next-music-image").style.backgroundImage = `url(${musics[j-1].songImg})`
                        } else {
                            document.querySelector(".next-music-image").style.backgroundImage = `url(${musics[musics.length-1].songImg})`

                        }
                    }
                }())
                istouch = false
            }
            secondscreen.style.left = Math.abs(coord.xdff(coord.x1, coord.x2)) + "px"
        }
        if (coord.xdff(coord.x1, coord.x2) < 1) {
            if (Math.abs(coord.xdff(coord.x1, coord.x2)) > (window.innerWidth / 4)) {
                (function() {
                    if (istouch) {
                        next()
                        if (!((j + 1) >= musics.length)) {
                            document.querySelector(".next-music-image").style.backgroundImage = `url(${musics[j+1].songImg})`
                        } else {
                            document.querySelector(".next-music-image").style.backgroundImage = `url(${musics[0].songImg})`

                        }

                    }
                }())
                istouch = false
            }
            secondscreen.style.left = (coord.xdff(coord.x1, coord.x2)) + "px"
        }
    }
})