const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
    title : {type : String, required: true},
    year : {type: Number , required: true},
    rating:{type: String, require:true},
})

const Movies = mongoose.model("movie",movieSchema)

module.exports = Movies