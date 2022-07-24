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
        res.render('hospitals.ejs')
    } catch (error) {
        res.status(500).send({message: error.message})
    }
    
})

app.get('/hospital/api/:facilityName', async (req,res)=>{
   try {
    let institution = req.params.facilityName.toLowerCase()
    const facilityFetch = await fetch(
        `https://api.healthtools.codeforafrica.org/search/health-facilities?q=[${institution}]&per_page=1000`
    )
    .then((res) => {
        if (res.ok){
            return res.json()
        }else{
            throw new Error('NETWORK RESPONSE ERROR')
        }
    })
    
    .then (data => {
        console.log(data);
        res.send(data)
        
    })
    
   } catch (error) {
        console.error('Fetch Error:',error)
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