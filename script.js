//1st MovieCard API 
let button = document.querySelector("#button");
let movieIds = []
async function getMovie(event) {
  event.preventDefault();
  movieIds = []
  let input = document.querySelector("#input").value;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };

  fetch(
    `https://online-movie-database.p.rapidapi.com/title/find?q=${input}`,
    options
  )
    .then((res) => {
      return res.json();
      
    })
    .then((data) => {
      const movieList = data.results;
       
      movieList.map((item, i) => {
        console.log(item);
        const name = item.title;
        const image = item.image.url;
        const time = item.runningTimeInMinutes;
        const year = item.year;
        const actor = item.principals[0].name;
        const actor2 = item.principals[1].name;
        const id = item.id;
        const trailerId = item.id.split("").splice(7, 9).join("");
        console.log(trailerId);
        movieIds.push(trailerId)
        
         

        const newList = `<li> <img class="img" src="${image}"> <h1>"${name}"</h1> <p>Time: ${time} mins</p><p>Year: ${year}</p><h3>${actor} and ${actor2}</h3><p class="movieId"></p> <button class="details" class="btn btn-dark">More Details</button><div class="movieInfo${movieIds[i]}"></div>`;
        document.querySelector(".video_").innerHTML += newList;
          const imgs = document.querySelectorAll(".img")
          imgs.forEach((img, i) =>{
              img.addEventListener(
                "click", function(){
                    getTrailer(movieIds[i])
                })
          })
          const detailsBtns = document.querySelectorAll(".details")
            detailsBtns.forEach((btn, i) => {
	         btn.addEventListener("click", function(){
	        getOtherInfo(movieIds[i])
            })
        })
     }) 
       

      console.log(movieList);
    })

    .catch((err) => {
      console.log("error!", err);
    });
}
button.addEventListener("click", getMovie);

//2nd Trailer API 
async function getTrailerId(id){
    
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    let trailerId = null;
    function idFinder (){ 
        return fetch(`https://online-movie-database.p.rapidapi.com/title/get-videos?tconst=${id}&limit=25&region=US`, options)
        .then(response => response.json())
        .then((response) => {
            trailerId = response.resource.videos[0].id
            return trailerId.split("").splice(9).join("")
        })
        .catch(err => console.error(err));
        
    }
    return idFinder()
}

    async function getTrailer(id) {
    let finalId = await getTrailerId(id)
    console.log(finalId)
    const options = {
     method: "GET",
     headers: {
       "X-RapidAPI-Key":
         "6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91",
       "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
     },
   };

   fetch(`https://online-movie-database.p.rapidapi.com/title/get-video-playback?viconst=${finalId}`, options)
     .then((res) => {
       return res.json();
     })
     .then((data) => {
       const video = data.resource.encodings;
       console.log(video);

       document.querySelector(
         ".trailer"
       ).innerHTML = `<iframe src="${video[3].playUrl}"></iframe>`;
       console.log(video);
     })

    
     .catch((err) => console.error(err));
 }

//3rd MovieInfo API 

async function getOtherInfo(id) {
  

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91",
      "X-RapidAPI-Host": "online-movie-database.p.rapidapi.com",
    },
  };

  fetch(
    `https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=${id}&currentCountry=US`,
    options
  )
    .then((res) => res.json())
    .then((data) => {
      const otherInfo = data.plotSummary;
      console.log(otherInfo)
         const author = otherInfo.author;
         const desc = otherInfo.text;
         const categories = ` <h3>Director:  ${author}</h3><p class="text"> ${desc}</p>`;
         document.querySelector(`.movieInfo${id}`).innerHTML += categories;
   
    
    })
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}
