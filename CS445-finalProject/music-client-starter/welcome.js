"use strict";

const SERVER_ROOT = "http://localhost:3000";
let mode = "play-all";
let songsList;

window.onload = function () {
  init();
  document.getElementById("logoutBtn").onclick = logout;
  fetchAllSongs();
  getPlayList();
};

function init() {
  document.getElementById("username").innerText =
    sessionStorage.getItem("username");
}

function logout() {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("token");
  location.href = "login.html";
}
//get playlist

function fetchAllSongs() {
  fetch("http://localhost:3000/api/music", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    // console.log(response)

    .then((songs) => {
      let html = `
    <tr>
    <th>ID</th>
   
    <th>title</th>
    <th>Release Date</th>
    <th>Add to playlist</th>
    </tr>
   `;
      let count = 1;
      songs.forEach((song) => {
        html += `
        <tr id="tr${song.id} ">
        <td> ${count}  </td>
        
        <td> ${song.title} </td>
        <td> ${song.releaseDate} </td>
        <td>
        <button id="add" onclick="addPlayList('${song.id}')">+</button>
        </td>
    </tr>
     `;
        count++;
      });
      document.getElementById("songs").innerHTML = html;
    });
}

async function getPlayList() {
  let response = await fetch(" http://localhost:3000/api/playlist", {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  songsList = await response.json();
  console.log(songsList)

  let template = `
    <tr>
    <th>Order ID</th>
    <th>Titlte</th>
   
    <th>delete</th>
    <th>play</th>
    </tr>
   `;

  songsList.forEach((song) => {
    // document.getElementById('h1interested').innerHTML=''
    template += `
        <tr id="tr${song.id} ">
        <td> ${song.orderId} </td>
        <td> ${song.title}  </td>
        <td>
        <button onclick="deleteSong('${song.songId}');">-</button>
        </td>
        <td style="text-align: left"> <button class="play" data-num22="${song.urlPath}" onclick="play('${song.urlPath}')" > ></button> </td>
       
    </tr>
     `;
  });
  document.getElementById("playlist").innerHTML = template;
  // play()
}

//add ToPlaylist

async function addPlayList(id) {
  console.log(id);

  let response = await fetch("http://localhost:3000/api/playlist/add", {
    method: "POST",
    body: JSON.stringify({
      songId: id,
    }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  });
  getPlayList();
}
/**DELETE FROM PLAYLIST */

function deleteSong(id) {
  // console.log('----' + id);
  fetch("http://localhost:3000/api/playlist/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      songId: id,
    }),
  });

  getPlayList();
}

/**SEARCH */

function search() {
  let val = document.getElementById("searchBar").value;
  console.log(val);
  // if(!val){
  //     console.log(val)
  // }else{

  fetch(`http://localhost:3000/api/music?search=${val}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      let c = 1;
      document.getElementById("songs").innerHTML = "";
      // document.getElementById("playlist").innerHTML = ""

      for (let x of data) {
        let tr = `<tr>
        <td> ${c++} </td>
        <td>${x.title}</td>
        <td>${x.releaseDate}</td>
        <td><button onclick="addSelect('${
          x.id
        }')" id="ron" class="test" data-num="${x.id}" >+</button></td>
      </tr>`;

        document.getElementById("searched").innerHTML += tr;
      }
    });
}
//add searched to the playlist
function addSelect(id) {
  addPlayList(id);
}

// play function

function play(datanum) {
  let tolbar = document.querySelector(".myAudio");

  tolbar.innerHTML = `
  <div id="title"></div>
  <button onclick="playPrev('${datanum}')">prev</button>
      <audio controls id="myVideo"  autoplay onended="onSongEnd('${datanum}')">
  <source src="${SERVER_ROOT}/${datanum}" type="audio/mp4" <img class="rounded-pill"
  src="./images/logo.jpeg"
  alt="mylog"
  style="max-width: 15%;margin-top:-1.5%; margin-left:2%"
  />>
</audio>
<button onclick="playNext('${datanum}')">next</button>
<button id='modeBtn' onclick="changeMode()">${mode}</button>
<img class="rounded-pill"
src="./images/logo.jpeg"
alt="mylog"
style="max-width: 15%;margin-top:-1.5%; margin-left:2%"
/>

`;
}

/**CHANGE MODE */
function changeMode() {
  if (mode === "play-all") {
    mode = "shuffle";
  } else if (mode === "shuffle") {
     mode = "repeat";
   
  } else {
    mode = "play-all";
  }
  document.getElementById("modeBtn").innerHTML = mode;
}

function onSongEnd(songPath) {
  playNext(songPath);
}

/**NEXT */
function playNext(songPath) {
  if (mode === "play-all") {
    let cSongIndex = songsList.findIndex((song) => song.urlPath === songPath);
    if (cSongIndex < songsList.length - 1) {
      let nextSong = songsList[cSongIndex + 1];
      play(nextSong.urlPath);
    } else {
      let nextSong = songsList[0];
      play(nextSong.urlPath);
    }
  } else if (mode === "repeat") {
    play(songPath);
  } else {
    const remSongs = songsList.filter((song) => song.urlPath !== songPath);
    let nextIndex = Math.floor(Math.random() * remSongs.length);
    let nextSong = remSongs[nextIndex];
    play(nextSong.urlPath);
  }
}

/**PREVIOUS */

function playPrev(songPath) {
  if (mode === "play-all") {
    let cSongIndex = songsList.findIndex((song) => song.urlPath === songPath);
    if (cSongIndex > 0) {
      let prevSong = songsList[cSongIndex - 1];
      play(prevSong.urlPath);
    } else {
      let prevSong = songsList[songsList.length - 1];
      play(prevSong.urlPath);
    }
  } else if (mode === "repeat") {
    play(songPath);
  } else {
    const remSongs = songsList.filter((song) => song.urlPath !== songPath);
    let prevIndex = Math.floor(Math.random() * remSongs.length);
    let prevSong = remSongs[prevIndex];
    play(prevSong.urlPath);
  }
}
