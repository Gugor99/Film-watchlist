const myList = localStorage.getItem("myMovies") ? JSON.parse(localStorage.getItem("myMovies")) : []
console.log(myList)
const reversedList = myList.slice().reverse();

for (let film of reversedList){
            document.getElementById("local-storage-list").innerHTML += `
                    <div id="list-item" data-title="${film.Title}">
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
                                    <i id="${film.Title}" class="fa-solid">-</i>
                                    <p>Remove</p>
                                </div>
                            </div>
                            <h5 class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac dapibus urna, sed iaculis orci. Sed in luctus massa. Curabitur ac dui urna. Nullam eget convallis massa</h5>
                        </div>
                    </div>`
}
        



document.getElementById("index-page").addEventListener('click', ()=>{
window.location.href = "/index.html"
})

document.getElementById("local-storage-list").addEventListener('click', (e) => {
    let targetElement = e.target;

    while (targetElement && !targetElement.dataset.title) {
        targetElement = targetElement.parentElement;
    }

    if (targetElement && targetElement.dataset.title) {
        const title = targetElement.dataset.title;
        console.log("title", title);
        removeItemFromList(title);
    }
});


function removeItemFromList(title) {
    const updatedList = myList.filter(movie => movie.Title !== title);
    localStorage.setItem("myMovies", JSON.stringify(updatedList));
    location.reload();
}