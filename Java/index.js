// let doIt = () => {
//     fetch("http://localhost:3000/films")
//     .then(res => res.json())
//     .then(data => console.log(data))
// }
// doIt()

let movies = []
let searchInput =  document.querySelector("#srch-bar")
let film = document.querySelector('.film-card')

// searchInput.addEventListener("input", z => {
//     const Value = z.target.value.toLowerCase()
//     console.log(Value)
//     movies.forEach(movie => {
//         console.log (movie)
//         let isVisible = movie.title.includes(Value)
//         film.element.classList.toggle("hide",!isVisible)
//     })
// })

function CreateFilmCard(z){
    //let z = a[0]
    //console.log (a)
    //console.log(z)
    let y = document.createElement('div')
    y.className = "film-card"
    let insidestuff = `
    <h1>${z.title}</h1>
    <img src="${z.poster}" alt="Film Poster">\
    <p>${z.description}</p>
    <h2>Runtime: ${z.runtime}</h2>
    <h3>Showtime: ${z.showtime}:</h3>
    <p id = "cap">Capacity: ${z.capacity}:</p>
    <p id = "tick">Tickets sold: ${z.tickets_sold}</p>
    <p id="ava">Available tickets: ${z.capacity - z.tickets_sold} </p>
    <button>Book ticket</button>

    `
    y.innerHTML = insidestuff
    document.querySelector('.films').appendChild(y)

    let btn = y.querySelector('button')
    btn.addEventListener('click', () => {
        let availableTickets = z.capacity - z.tickets_sold
        if (availableTickets > 0){
            alert (`Ticket for ${z.title} Bought!`);
            // let tick = y.querySelector('#tick')
            // tick.innerHTML =`available tickets: ${z.tickets_sold - 1}`
            // let cap = y.querySelector('#cap')
            // cap.innerHTML = `Capacity:`
            let a = z.tickets_sold
            a ++
            let tick = y.querySelector('#tick')
            tick.innerHTML = `Tickets sold: ${a}`
            let ava = y.querySelector("#ava")
            ava.innerHTML = `Available tickets : ${z.capacity - a}`

        }
    })

}

document.addEventListener('DOMContentLoaded',() => {
    fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(data => 
       movies= data.map(Data => CreateFilmCard(Data)))
})





