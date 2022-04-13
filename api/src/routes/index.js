const { Router } = require('express');
const axios = require ("axios")
const {Videogame, Genre} = require("../db")
const {getAllInfo, allApiInfo} = require("../controllers/videogameCont")
const {getGenres} = require("../controllers/genreCont");
const {API_KEY} = process.env


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// [ ] GET /videogames:
// Obtener un listado de los videojuegos
// Debe devolver solo los datos necesarios para la ruta principal
// [ ] GET /videogames?name="...":
// Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
// Si no existe ningún videojuego mostrar un mensaje adecuado

router.get("/videogames", async (req, res) => {
    let name = req.query.name
    const allVideogames = await getAllInfo()    
    // console.log(allVideogames)
    if (name) {
        const gameName = await allVideogames.filter(v => v.name.toLowerCase().includes(name.toLowerCase()))
        if (gameName) {
            return res.status(202).json(gameName)
        } else return res.status(404).send("Videogame not found")
    }       
    return res.status(200).json(allVideogames)
})

// [ ] GET /videogame/{idVideogame}:
// Obtener el detalle de un videojuego en particular
// Debe traer solo los datos pedidos en la ruta de detalle de videojuego
// Incluir los géneros asociados

router.get("/videogame/:idVideogame", async (req, res) => {
    const {idVideogame} = req.params
    if (idVideogame.includes("-")) {
        try {
             const dbInfo = await Videogame.findByPk(idVideogame, {include: Genre})            
             let videogameGenre = {
                id: dbInfo.id,
                name: dbInfo.name,
                description: dbInfo.description,
                date: dbInfo.date,
                ratings: dbInfo.ratings,
                platforms: dbInfo.platforms,
                genres: dbInfo.genres.map(e => e.name),
                image: dbInfo.image
                  }
            if (videogameGenre)  res.status(200).json(videogameGenre)
             }
             catch (error) { res.status(404).json({error: "Game not found DB"})}
        } else {
            try {
                const dbInfo = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)
                let apiGame = {
                    id: dbInfo.data.id,
                    name: dbInfo.data.name,
                    description: dbInfo.data.description_raw,
                    date: dbInfo.data.released,
                    rating: dbInfo.data.ratings[0].title,
                    // rating: dbInfo.data.ratings.map(e=> {
                    //     return e.title
                    // })[0],
                    platforms: dbInfo.data.parent_platforms.map(c=> c.platform.name),
                    image: dbInfo.data.background_image,
                    genres: dbInfo.data.genres.map(e=> e.name)
                }
               
                if(apiGame)  res.status(200).json(apiGame)
            }
            catch(error) { res.status(404).json({error: "Game Not Found API"})}
        }
})

// [ ] GET /genres:
// Obtener todos los tipos de géneros de videojuegos posibles
// En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí

router.get("/genres", async (req, res) => {
    const genres = await getGenres()
    res.status(200).json(genres)
})

// [ ] POST /videogame:
// Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
// Crea un videojuego en la base de datos

router.post("/videogame" , async (req, res, next) => {
    let {name, description, date, ratings, platforms, image, genres} = req.body
    // console.log(genres)
    try {
        let newGame = await Videogame.create({
            name, description, date, ratings, platforms, image
        })          
        genres.forEach( async e=> {
            let genresDb = await Genre.findAll(
            {
                where: {name: e},
            })
            await newGame.addGenre(Object.values(genresDb))
        })
        res.status(200).send(newGame) 
    }
    catch(error) {next(error)}
})

router.get("/platforms", async (req, res) => {
    const url = await getAllInfo()
    const platforms = await url.map(e => e.platforms)
    res.status(200).json(platforms)
})

module.exports = router;
