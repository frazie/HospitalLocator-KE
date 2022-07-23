// dependancies
const express = require('express')
const app = express()
const cors = require('cors')
const { dirname } = require('path')
const { request } = require('http')
const PORT = 4000
// middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
// end of middleware

// api urls


app.get('/', async (req,res)=>{
    try {
        res.render('index.ejs')
    } catch (error) {
        res.status(500).send({message: error.message})
    }
    
})

app.get('/hospital', async (req,res)=>{
   try {
    let institution = 'nairobi'
    const facilityFetch = await fetch(
        `https://api.healthtools.codeforafrica.org/search/health-facilities?q=[${institution}]&per_page=1000`
    )
    .then((res) => res.json())
  
    .then (data => {
        console.log(data)
        console.log(data.result.total)
//lopp through all the results from the data

        for (let i=0;i<data.result.total;i++){
        console.log(data.result.hits[i]._source.county_name)
        console.log(data.result.hits[i]._source.name)
        console.log(data.result.hits[i]._source.owner_type_name)
        console.log(data.result.hits[i]._source.facility_type_category)
        console.log(data.result.hits[i]._source.service_names)
        }

            
    })
        res.render('hospitals.ejs')
   } catch (error) {
        console.log(error)
   }
})

// app.get('/doctors', async (req,res)=>{
//    try {
    
//    } catch (error) {
    
//    }
// }
// app.get('/nurses', async (req,res)=>{
//    try {
    
//    } catch (error) {
    
//    }
// }

app.listen(process.env.PORT || PORT, () =>{
    console.log(`server running on port = ${PORT}`)
})