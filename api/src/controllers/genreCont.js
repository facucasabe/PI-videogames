const axios = require("axios")
const {Genre} = require("../db")
const {API_KEY} = process.env

const getGenres = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    const genres = await apiUrl.data.results.map(e => e.name)
    genres.forEach(e => {
        Genre.findOrCreate({
            where: {name: e}
        })
    });
    // console.log(genres)
    const dBgenres = await Genre.findAll();
    const allGenres = await dBgenres.map(e=> {
        return {
            name: e.name
        }
    })
    return allGenres    
}

module.exports={
    getGenres
}