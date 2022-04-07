const axios = require("axios")
const {Videogame, Genre} = require("../db")
const {API_KEY} = process.env

const getGenres = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = await apiUrl.data.results
    genres.forEach(e => {
        Genre.findOrCreate({
            where: {name: e}
        })
    });
    // console.log(genres)
    const allGenres = await Genre.findAll();
    return allGenres    
}

module.exports={
    getGenres
}