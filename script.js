       //1st MovieCard API //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

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
                        const trailerId = item.id.split("").splice(7,9).join("")
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



    

       
            
  //2nd Trailer API ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////        
        
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

    //3rd MovieInfo API //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


    async function getOtherInfo (event) {
        event.preventDefault()

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '6534f8d41bmshc365272f6276afdp1cd116jsn007772c79a91',
            'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com'
        }
    };
    
    fetch('https://online-movie-database.p.rapidapi.com/title/get-overview-details?tconst=tt0944947&currentCountry=US', options)
        .then(res => res.json())
        .then(data =>{
            const otherInfo = data.plotOutline;
            console.log(other)
            otherInfo.map((item) =>{
                console.log(item)
            const rate = item.rating;
            const author  = item.author;
            const desc = item.text;
            const categories = `<li> <h3>Rate: ${rate}</h3><h3>Director: ${author}</h3><p>Description: ${desc}</p></li>`
            document.querySelector(".movieInfo").innerHTML += categories;
            })
        })
        .then(res => console.log(res))
        .catch(err => console.error(err));

        
    }