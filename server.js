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
        res.render('hospitals.ejs')
    } catch (error) {
        res.status(500).send({message: error.message})
    }
    
})

app.get('/hospital/:facilityName', async (req,res)=>{
   try {
    let institution = req.params.facilityName.toLowerCase()
    const facilityFetch = await fetch(
        `https://api.healthtools.codeforafrica.org/search/health-facilities?q=[${institution}]&per_page=1000`
    )

    //fetch the data then parse it to json 
    .then((res) => {
        if (res.ok){
            return res.json()
        }else{
            throw new Error('NETWORK RESPONSE ERROR')
        }
    })
    
    //here we retrive the data then select what we need and create the institution object
    .then (data => {
        let institution = []
        //the institution array will hold all data returned from the search
        for (let i=0;i<data.result.total;i++){
        
            //this is the object contructor for each single hospital facility
            //it will contain all the key information like name, county,location and serices offered
        function DisplayFacility(data) {
            this.facility = data.result.hits[i]._source.name;
            this.type_facility = data.result.hits[i]._source.facility_type_category
            this.owner = data.result.hits[i]._source.owner_type_name
            this.county_name = data.result.hits[i]._source.county_name
            this.services = data.result.hits[i]._source.service_names

        }
         
        let hosi = new DisplayFacility(data)

        //each new object will be called hosi(common short name for hospital)
        institution.push(hosi)
        //each object will then be pushed to the institution array
    }
        JSON.stringify(institution)
        //the array will then be converted to json through the stringify() function and then sent out as json for the main fetch request
        res.send(institution)
        
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