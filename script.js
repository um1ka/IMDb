// console.log("working");

//const { Button } = require("bootstrap");

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

// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': '6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91',
// 		'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
// 	}
// };

// //async function getData (event) {
// //event.preventDefault()
// //let textInput = document.querySelector("#input").value 
// fetch('https://online-movie-database.p.rapidapi.com/auto-complete?q=tourist', options)
// 	.then(response => response.json())
//     .then(data => {
//         const list = data.d;

//         list.map((item) => {
//             const name = item.l;
//             const poster = item.i.imageUrl;
//             const year = item.y;
//             const desc = item.s;
//             const movie = `<li><img src="${poster}"> <h1>${name}</h1> <h3>${year}</h3> <h4>${desc}</h4></li>`
//             document.querySelector('.movies').innerHTML += movie;
//         })
        
//     })
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
    
  
    
    // const option = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91',
    //         'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    //     }
    // };
    
    // fetch('https://online-movie-database.p.rapidapi.com/title/find?q=game%20', option)
    //     .then(response => response.json())
    //     .then(data => {
    //     const movieList = data.results;

    //     movieList.map((item) => {
    //         const name = item.title;
    //         const image = item.image.url;
    //         const time = item.runningTimeInMinutes;
    //         const year = item.year;
    //         const newList = `<li> <h1>${name}</h1><img src="${image}"><h2>${time}</h2><h2>${year}</h2>`
    //         document.querySelector('.video_').innerHTML += newList;

    //     })
    //         console.log(movieList)
    //     })

    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));

       // button.addEventListener("click", data)


       let button = document.querySelector('#button')

        async function getMovie (event) {
            event.preventDefault()
            
            let input = document.querySelector('#input').value
            


            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91',
                    'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
                }
            };
            
            fetch(`https://online-movie-database.p.rapidapi.com/title/find?q=${input}`,options)
            .then(res => {
                return res.json()
            })
            .then(data => {
                    const movieList = data.results;

                    movieList.map((item) => {
                        console.log(item)
                        const name = item.title;
                        const image = item.image.url;
                        const time = item.runningTimeInMinutes;
                        const year = item.year;
                        const id = item.id;
                        const trailerId = item.id.split("").splice(0,6).join("")
                        console.log(trailerId)
                        const newList = `<li> <h1>"${name}"</h1><img class="img" src="${image}"><h2>${time} Minutes</h2><h2>Year: ${year}</h2><p class="movieId">${id}</p>`
                        document.querySelector('.video_').innerHTML += newList;
                        document.querySelector('.img').addEventListener("click",  
                        function(){
                            getTrailer(id)
                            console.log("working")
                        })
                    })
                        console.log(movieList)
                    })


                       
                        
           
                


            .catch(err => {
                console.log("error!", err)
            })
        }
        button.addEventListener("click", getMovie)



    

        async function getTrailer (event , id) {
            // event.preventDefault()
            
            
            
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91',
                'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
            }
        };
        
        fetch('https://online-movie-database.p.rapidapi.com/title/get-video-playback?viconst=vi1015463705', options)
        .then(res => {
            return res.json()
        })
            .then(data => {
                const video = data.resource.encodings;
                console.log(video)
              
                document.querySelector(".trailer").innerHTML = `<iframe src="${video[3].playUrl}"></iframe>`
                // video.map((item) =>{
                //     const trailers = item.playUrl;
                //     const newVideo = `<iframe src="${trailers}"></iframe>`
                    
                // })

                console.log(video)
            })
           


            
           
            .then(res => console.log(res))
            .catch(err => console.error(err));
    }

    

    // const options = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91',
    //         'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
    //     }
    // };
    
    // fetch(`https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=tt0944947&currentCountry=US${input}`, options)
    //     .then(res => res.json())
    //     .then(data =>{
    //         const genre = data;

    //         genre.map((item) =>{
    //             console.log(item)
    //         const rate = item.rating;
    //         const author  = item.author;
    //         const desc = item.text;
    //         const categories = `<li> <h3>Rate: ${rate}</h3><h3>Director: ${author}</h3><p>Description: ${desc}</p></li>`
    //         document.querySelector(".video_").innerHTML += categories;
    //         })
    //     })
    //     .then(res => console.log(res))
    //     .catch(err => console.error(err));