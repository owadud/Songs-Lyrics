document.getElementById('search').addEventListener('click', function () {

    const searchText = document.getElementById("searchText").value;

    const url = `https://api.lyrics.ovh/suggest/${searchText}`;

    fetch(url)
        .then(res => res.json())
        .then(data => displaySong(data.data))

});

const displaySong = songs => {

    const parentDiv = document.getElementById('single');

    //reset 
    parentDiv.innerHTML = '';
    document.getElementById('searchText').value = '';

    songs.forEach(song => {

        const SongDiv = document.createElement('div');
        SongDiv.innerHTML = ` <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">Album by <span>${song.artist.name}</span></p>
            <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
        </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="showLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
    </div>`;

        parentDiv.appendChild(SongDiv);


    })

}
const showLyrics = (name,title) =>{
    
    
    const url =` https://api.lyrics.ovh/v1/${name}/${title}`;
    
    fetch(url)
    .then(res=>res.json())
    .then(data=>findLyrics(data.lyrics));
   
}

const findLyrics = lyricsText=>{
document.getElementById('lyrics').innerText = lyricsText;
window.scroll(10, 0);

}
