let x;
let volAdd = 0;
let min = 0;
let vl = document.getElementById("volume").value = 1;
const musics = [{
    id: "1",
    title: "chike roju",
    audio: new Audio('./a (8).mp3'),
}, {
    id: "2",
    title: "climb every mountain",
    audio: new Audio('./a (1).mp3')
}, {
    id: "3",
    title: "casting crown- who am i",
    audio: new Audio('./a (3).mp3')
}, {
    id: "4",
    title: "cardi b-money",
    audio: new Audio('./a (2).mp3')
}, {
    id: "5",
    title: "christ in me",
    audio: new Audio('./a (6).mp3')
}, {
    id: "6",
    title: "chike ft maryorkun - show me",
    audio: new Audio('./a (7).mp3')
}, {
    id: "7",
    title: "chike ft simi soldier ",
    audio: new Audio('./a (4).mp3')
}, {
    id: "8",
    title: "zoom zoom ",
    audio: new Audio('./a (5).mp3')
}, {
    id: "9",
    title: "on side maps",
    audio: new Audio('./a (9).mp3')
}, {
    id: "10",
    title: "ckay- valatine",
    audio: new Audio('./a (10).mp3')
}, {
    id: "11",
    title: "khaid ",
    audio: new Audio('./a (11).mp3')
}, {
    id: "12",
    title: "touch it",
    audio: new Audio('./a (12).mp3')
}, {
    id: "13",
    title: "24goldk - mood",
    audio: new Audio('./a (13).mp3')
}, {
    id: "14",
    title: "edshereen-perfect",
    audio: new Audio('./a (14).mp3')
}, {
    id: "15",
    title: "nicky baddest ft future",
    audio: new Audio('./a (15).mp3')
}]
let j = 0,
    i = 1;
let audio = new Audio('./2.mp3');
// console.log(audio);
//checking for lenght and so the array wont play out index
function check() {
    if (j > musics.length - 1) {
        j = 0;
    }
    if (j < 0) {
        j = musics.length - 1;
    }
}
//end of checking here
//because of this little piece of code will be use many time so i thought it wise to name init()
const init = () => {
        x = parseInt(audio.duration);
        document.getElementById("running").max = x;
        // const sec = Math.floor(x % 60);
        document.querySelector(".music-time").innerHTML = `${Math.floor((x/60))}:${Math.floor((x%60))} `
    }
    //end of init
    //change the musics
const next = () => {
    ++j;
    check()
    console.log(j);
    audio.load(); //this pause the previous musics
    const now = musics[j]; //take music from music library
    audio = now.audio; //give a new reference to the music
    document.querySelector(".music-name").innerHTML = `${now.title} mp3`; //display the current music name on the screem
    audio.play() //play the current audio
    audio.volume = vl; //keep track of the volume
    init(); //this is for the  current time and max
}
const pre = () => {
    --j;
    check();
    // console.log(j);
    audio.load();
    const now = musics[j];
    audio = now.audio;
    audio.play()
    document.querySelector(".music-name").innerHTML = `${now.title} mp3`;
    audio.volume = vl;
    init()
    min = 0;
}

function list() {
    document.querySelector(".get-music-list").style.display = `block`;
    document.querySelector(".get-music-list").innerHTML = `  <div class="close" onclick="closelist()">close</div><div class="playlist">
    playlist
</div>` + musics.map(item => `<p class="enclose" >${(item.title)}<p>`).join("")
    document.querySelectorAll('.enclose').forEach((lst, index, arr) => {
        document.querySelector(".playlist").innerHTML = `playlist (${arr.length} songs)`
        lst.addEventListener("click", () => {
            audio.load();
            const now = musics[index];
            audio = now.audio;
            audio.play()
            document.querySelector(".music-name").innerHTML = `${now.title} mp3`;
            audio.volume = vl;
            init()
            min = 0;
            j = index;
        })
    })
}

function closelist() {
    document.querySelector(".get-music-list").style.display = `none`;
}
document.querySelector(".player-container").addEventListener("click", () => {
    closelist()
}, true)
const vol = () => {
    vl = document.getElementById("volume").value
    audio.volume = vl;
    document.querySelector(".vol").innerHTML = (vl * 100) > 0 ? vl * 100 : "🔇";

}
const pause = () => {
    if (++i & 1) {
        audio.pause()
    } else {
        audio.play()
        init();
    }
}
const running = () => {
    audio.currentTime = document.getElementById("running").value;
}

// function forward() {

// }
// let isMouseDown = false;
// document.getElementById("next").addEventListener("mousedown", () => {
//     alert("ok")
//     setTimeout(() => {
//         isMouseDown = true
//     }, 2000);
//     if (isMouseDown) {
//         alert("hey the mouse is down")
//     }
// })
const search = () => {
    if (document.getElementById("search").value.length > 0) {
        document.querySelector(".music-library").style.display = "block";
        document.querySelector(".music-library").classList.add("add-music-library");
        let list = musics.map(obj => {
            if (obj.title.includes(document.getElementById("search").value)) {
                return `<p class="search-value">&nbsp${obj.title}</p>`;
            }
        }).sort().join("")
        document.querySelector(".music-library").innerHTML = list.length ? list : `sorry your music is not in the list`;
        document.querySelector(".player-screen").classList.add("add-player-screen")
        document.querySelectorAll(".search-value").forEach(item => {
            item.addEventListener("click", () => {
                const currentClickVal = item.innerHTML.slice(6);
                musics.forEach((music, number, arr) => {
                    // console.log(currentClickVal, music.title);
                    if (music.title == currentClickVal) {
                        audio.load();
                        const now = musics[number];
                        audio = now.audio;
                        audio.play()
                        document.querySelector(".music-name").innerHTML = `${now.title} mp3`;
                        audio.volume = vl;
                        init()
                        min = 0;
                        j = number;
                    }
                })

            })
        })
    } else {
        document.querySelector(".player-screen").classList.remove("add-player-screen")
        document.querySelector(".music-library").style.display = "none";

    }

}
setInterval(() => {
    document.querySelector(".player-screen").style.backgroundImage = `url('./${ Math.floor(Math.random() * 9)+2 }.jpg')`
        // console.log(`photo change`);
}, 20000);
setInterval(() => {
    let time = parseInt(audio.currentTime);
    if (time === x) {
        next();
        min = 0;
    }
    if (!audio.paused && (time) % 60 === 0) {
        if (time >= 1) {
            ++min;
        }
    }
    // console.log(`${ Math.floor(Math.random() * 4)+1 }.jpg`);
    document.querySelector(".playing-time").innerHTML = min + ":" + time % 60;
    document.getElementById("running").value = audio.currentTime;
}, 1000);
const playerscreen = document.querySelector(".player-container")
window.addEventListener("keyup", (event) => {
    const key = event.key;
    // console.log(key)
    if (key === "p" || key === " ") {
        pause();
    }
    if (key === "ArrowUp") {
        volAdd += 0.1;

        if (volAdd >= 1) {
            volAdd = 1;

        }
        if (volAdd < 0) {
            volAdd = 0

        }

        audio.volume = volAdd;
        document.getElementById("volume").value = volAdd;
        vol()
    }

    if (key === "ArrowDown") {
        volAdd -= 0.1;

        if (volAdd >= 1) {
            volAdd = 1;

        }
        if (volAdd < 0) {
            volAdd = 0

        }

        audio.volume = volAdd;
        document.getElementById("volume").value = volAdd;
        vol()
    }
})

playerscreen.addEventListener("mousewheel", (e) => {
    let height = window.innerWidth;
    let off = playerscreen.offsetLeft + playerscreen.getBoundingClientRect().width;
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const heightOfContainer = document.querySelector(".player-screen").getBoundingClientRect().height - 20;
    // console.log(heightOfContainer + 40);
    const getPos = mouseX - playerscreen.offsetLeft;
    if ((getPos) > (playerscreen.getBoundingClientRect().width / 2) && mouseY < heightOfContainer) {
        if (e.deltaY > 1) {

            volAdd -= 0.1;
            if (volAdd >= 1) {
                volAdd = 1;

            }
            if (volAdd < 0) {
                volAdd = 0

            }
        } else {
            volAdd += 0.1;

            if (volAdd >= 1) {
                volAdd = 1;

            }
            if (volAdd < 0) {
                volAdd = 0

            }

        }

        audio.volume = volAdd;
        document.getElementById("volume").value = volAdd;
        vol()
    }
})