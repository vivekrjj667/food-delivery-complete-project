const express =require("express")
const path=require("path")
const port=80;
const app=express();
// establishing connection from node js to mongod
const mongoose = require('mongoose');
const { constants } = require("buffer");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');
}
const vivfoodcontactschema = new mongoose.Schema({
    name: String,
    address: String,
    email:String,
    paymentmethod:String,
    orderno:String,
    textarea:String
    

  });
  const Kitten = mongoose.model('Kitten',vivfoodcontactschema );

//express specefic stuff(serving static files)
app.use('/static',express.static('static'))
app.use(express.urlencoded())

// pug specefic stuff
app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

//end points
app.get('/',(req,res)=>{
    const params={}
    res.status(200).render('index.pug',params)
})
app.get('/contact',(req,res)=>{
const params={}
res.status(200).render('contact.pug',params)

})
app.post('/contact',(req,res)=>{
    const data=new Kitten(req.body);
    data.save().then(()=>{
        res.send('this data has been saved to database')
    }).catch(()=>{
        res.status(400).send('item was not saved to database')

    })
    //res.status(200).render('contact.pug')
    
    })
    
    app.post('/sendotp',(req,res)=>{
        const params={}
        res.status(200).render('verifyotp.pug',params)
    })


//start the server
app.listen(port,()=>{
console.log('the server has been started successfully')
})