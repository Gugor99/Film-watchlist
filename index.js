let myMovies = []
let actualArray = ""
const searchInput = document.getElementById("search-input")

document.getElementById("watchlist-page").addEventListener('click', ()=>{
    window.location.href = "/watchlist.html"
})

document.getElementById('search-btn').addEventListener('click', thisFunction)

function thisFunction(){
    fetch(`https://www.omdbapi.com/?s=${searchInput.value}&apikey=1274b560`)
        .then(res =>res.json())
        .then(data=> {
            actualArray = data
            let html = ""
            for (let film of data.Search){
                html += `<div id="list-item">
                            <img src="${film.Poster}" id="movie-img">
                            <div id="item-side">
                                <div id="top">
                                    <h1 class="film-title">${film.Title}</h1>
                                    <h4>⭐⭐⭐⭐⭐</h4>
                                </div>
                                <div id="middle">
                                    <p class="p">Year:${film.Year}</p>
                                    <p class="p">Type:${film.Type}</p>
                                    <div id="add-btn">
                                        <i id="${film.Title}" class="fa-solid">+</i>
                                        <p id="${film.Title}">Add to list</p>
                                    </div>                                    
                                </div>
                                <h5 class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dapibus urna, sed iaculis orci. Sed in luctus massa. Curabitur ac dui urna. Nullam eget convallis massa</h5>
                            </div>
                        </div>`
            }
            document.getElementById("list").innerHTML = html
    }).catch(error => {
            console.error('Error fetching data:', error);
        })  
}

document.getElementById('list').addEventListener('click', function(e){
    if (e.target.id){
       addItemToList(e.target.id)
    }
})
function addItemToList(targetItem){
        const targetItemObj = actualArray.Search.filter(function(movie){
        return movie.Title === targetItem
    })[0]
    if (targetItemObj) {
        const storedMovies = localStorage.getItem("myMovies");
        let myMovies = storedMovies ? JSON.parse(storedMovies) : [];

        const isMoviePresent = myMovies.some(movie => movie.Title === targetItem);

        if (!isMoviePresent) {
            myMovies.push(targetItemObj);
            localStorage.setItem("myMovies", JSON.stringify(myMovies));
            showNotification("Movie added to watchlist");
        } else {
            console.log("Movie already present in myMovies:", targetItem);
        }
    } else {
        console.log("No movie found with title:", targetItem);
    }
    function showNotification(message) {
        const notification = document.createElement("div");
        notification.className = "notification";
        notification.textContent = message;
        document.body.appendChild(notification);
    

        setTimeout(() => {
            notification.style.opacity = "0";
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 1000);
        }, 2000);
    }
} 