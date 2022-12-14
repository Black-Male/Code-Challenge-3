let doIt = () => {
    fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(data => console.log(data))
}
doIt()

//used this to make sure that the movie list will automatically appear on the page with no calling 
document.addEventListener("DOMContentLoaded", () => {
    //fetch bellow calls for all movies to be listed on the page
    fetch ("http://localhost:3000/films")
    .then(res => res.json())
    .then(data => data.forEach(Data => ListMovies(Data)))

    //function/event below is to listen and tells computer what to do after submit has been called
    // this is to search for a specific movie 
    document.querySelector('form').addEventListener('submit', (e) => {
        e.preventDefault()
        let Inputs = e.target.querySelector("#text-input")
        let val = Inputs.value
        fetch(`http://localhost:3000/films?q=${val}`)
        .then(res => res.json())
        .then(data => filmDisplay(data))
    })
    
    function filmDisplay(z){
        if (z.length > 2){
            warn(`Search Not Specific`)
        }else {
            let data = z[0]
            let insertionPoint = document.querySelector('#filmInfo')
            let element =  document.createElement('div')
            console.log(data)
            let resp;
            element.innerHTML = `
            <img src="${data.poster}" alt="MoviePoster">
            <h1>${data.title}</h1>
            <h2>${data.description}</h2>
            <ul>
                <li>duration: ${data.runtime}</li>
                <li>air time:${data.showtime}</li>
                <li>max cinema capacity:${data.capacity}</li>
                <li id ="tick">current tickets:${data.tickets_sold}</li>
                <p>${resp}<p>
                <button id="BookSeat">BookSeat</button>
            </ul>
            `
            insertionPoint.appendChild(element)

            element.querySelector(`#BookSeat`).addEventListener('click',() => {
                if (data.capacity - data.tickets_sold > 0){
                    data.tickets_sold = data.tickets_sold-1
                    let y = data.tickets_sold
                    let resp = "TICKET SOLD"
                    alert(resp)
                    alert(`available tickets are now ${y}`)
                    // element.querySelector('tick').textContent= `${data.tickets_sold}`
                    // element.querySelector('p').textContent = `${resp}`
                }else {
                    let resp = "SOLD OUT!"
                    // console.warn(`${data.title} IS SOLD OUT!`);
                    // element.querySelector('p').textContent = `${resp}`
                }
            } )

        }

    }
})
//this function here decides how the items are arranged and the order in  which they appear in on html 
let ListMovies = (z) => {
    let card = document.createElement('li')
    card.id = z.id
    let image = document.createElement('img')
    image.src = z.poster
    let filmName = document.createElement('h1')
    filmName.innerHTML = z.title
    let description = document.createElement('p')
    description.innerHTML = z.description
    let btn = document.createElement('button')
    btn.textContent = 'Movie-Info'
    
    card.appendChild(image)
    card.appendChild(filmName)
    card.appendChild(description)
    card.appendChild(btn)

    let insertionPoint = document.querySelector('ul')
    insertionPoint.appendChild(card)
}

