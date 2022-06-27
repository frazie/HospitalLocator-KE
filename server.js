// dependancies
const express = require('express')
const app = express()
const cors = require('cors')
const { dirname } = require('path')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = process.env.PORT


// set up database

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'sample_mflix',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log('Connected to database')
        db = client.db(dbName)
        collection = db.collection('movies')
    })

// middleware

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())


// end of middleware

app.get('/', async (req,res)=>{
    try {
        res.render('index.ejs')
    } catch (error) {
        res.status(500).send({message: error.message})
    }
    
})

app.listen(process.env.PORT || PORT, () =>{
    console.log(`server running on port = ${PORT}`)
})