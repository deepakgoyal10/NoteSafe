const mongoose = require('mongoose')
const mongoURI = "mongodb://127.0.0.1:27017/iNotebook?directConnection=true"
const connectToMongo = ()=>{
    mongoose.connect(mongoURI, async()=>{
        console.log('connected to mongo successfully')
    },  {useNewUrlParser:true, useUnifiedTopology:true }, mongoose.set('strictQuery', false))
}
module.exports = connectToMongo