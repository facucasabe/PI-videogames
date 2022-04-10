const axios = require ("axios")
const {Videogame, Genre} = require("../db")
const {API_KEY} =  process.env

const getApiInfo = async () => {    
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    const api = await apiUrl.data.results.map(d=> {
        return {
            id: d.id,
            name: d.name,
            description: d.description_raw,
            date: d.released,
            ratings: d.ratings[0].title,
            platforms: d.parent_platforms.map(c=> c.platform.name),
            image: d.background_image,
            genres: d.genres            
            }
        })
       
    return api 
}

const getNextInfo = async () => {
    var apiInfoMap = []
    for (let i=2; i < 6; i++ ) {        
        const apiNext = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&&page=${i}`)
        apiInfoMap.push(await apiNext.data.results.map(d => {
        // var apiInfoMap = await apiNext.data.results.map(d => {
            return {
                id: d.id,
                name: d.name,
                description: d.description_raw,
                date: d.released,
                ratings: d.ratings[0].title,
                platforms: d.parent_platforms.map(c=> c.platform.name),
                image: d.background_image,
                genres: d.genres
                }
        }))
    }
        
    return apiInfoMap
}

const allApiInfo = async () => {
    const apiInfo = await getApiInfo()
    const nextInfo = await getNextInfo()
    const allInfo = apiInfo.concat(nextInfo[0]).concat(nextInfo[1]).concat(nextInfo[2]).concat(nextInfo[3])
    return allInfo  
}
    
const getDbInfo = async () => {
    try {
        return await Videogame.findAll({
            include: {
                model: Genre,
                attributes: ["name"],
                through: {
                    attributes: []
                }
            }
        })
    }
    catch (error) {return error}
}

const getAllInfo = async () => {
    const apiInfo = await allApiInfo()
    const dbInfo = await getDbInfo()
    const allInfo = apiInfo.concat(dbInfo)
    return allInfo
}

module.exports = {
    allApiInfo,
    getDbInfo,
    getAllInfo
}