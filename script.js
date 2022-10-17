// console.log("working");

// let button = document.querySelector("#searchBtn")

// async function getData (event) {

//     event.preventDefault()
//     let textInput = document.querySelector("#searchInput").value 
//     fetch(`https://imdb-api.com/en/API/SearchMovie/k_8839trnt/${textInput}`)
//         .then(res =>{
//             return res.json()
//         })
//         .then(res => {
//             console.log("success!", res)
//              let title = document.querySelector('#title')
//              title.innerHTML = res.results[1].title

//             //  console.log(res)
//             //  let img = document.querySelector("#img")
//             //  img.src = res.results[1].image
//             //  console.log(img)

//             // let listOfdesc = res.results.description.map((desc) =>{return `<li>${desc.results.description}</li>`})
//             // description.innerHTML = ''
//             // listOfdesc.forEach((i) => {return res.results.description.innerHTML += i})
            
//         })
//         .catch( err =>{
//             console.log("error!", err)
//         })
// }

// button.addEventListener("click", getData)

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91',
		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
	}
};

//async function getData (event) {
//event.preventDefault()
//let textInput = document.querySelector("#input").value 
fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=tourist', options)
	.then(response => response.json())
    .then(data => {
        const list = data.d;

        list.map((item) => {
            const name = item.l;
            const poster = item.i.imageUrl;
            const year = item.y;
            const desc = item.s;
            const movie = `<li><img src="${poster}"> <h1>${name}</h1> <h3>${year}</h3> <h4>${desc}</h4></li>`
            document.querySelector('.movies').innerHTML += movie;
        })
        
    })
	.then(response => console.log(response))
	.catch(err => console.error(err));
    
    const option = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    
    fetch('https://online-movie-database.p.rapidapi.com/title/get-videos?tconst=tt0944947&limit=25&region=US', option)
        .then(response => response.json())
        .then(data => {
            const newList = data.resource.videos;
            console.log(newList)
            newList.map((item) => {
                const video = item.image;
                const movie = `<li><h4>${video}</h4></li>`
                document.querySelector('.video_').innerHTML += movie;
            })
        })

        .then(response => console.log(response))
        .catch(err => console.error(err));

       // button.addEventListener("click", data)
        

