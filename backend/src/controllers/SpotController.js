const Spot = require('../models/Spot')
const User = require('../models/User')


module.exports = {
    async index(req, res){
        const {tecnologia} = req.query

        const spots = await Spot.find({tecnologia: tecnologia})

        return res.json(spots)

    },

    async store(req, res){
        const { filename } = req.file;
        const {empresa, tecnologia, valor } = req.body
        const { user_id} = req.headers
        
        const user = await User.findById(user_id)

        if(!user){
            return res.status(400).json({ error: 'Usuario não existe!'})
        }

        const spot = await Spot.create({
            user: user_id,
            imagem: filename,
            empresa, 
            tecnologia : tecnologia.split(',').map(tecnologia => tecnologia.trim()),
            valor
        })

        return res.json(spot)
    }
}