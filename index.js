const express = require ('express');
const formidable = require("express-formidable");
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(formidable());
app.use(cors());

var api_key = process.env.API_KEY_MAILGUN;
var domain = process.env.DOMAIN_MAINGUN;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 

app.get('/', (req,res) => {
    res.json({message : "Welcome to my Tripadvisor backend"})
}); 

app.post("/formulaire", async (req,res) => {
const data = {
from: `${req.fields.firstname} ${req.fields.secondname} <${req.fields.email}>`,
to: `${process.env.MONMAIL}`,
subject: 'Nouveau message reçu',
text: `${req.fields.message}`
};      
await mailgun.messages().send(data, (error, body) => {
if (!error) {
res.json({ message: "Message a bien été reçu" });
} else {
res.status(400).json(error);
}})
});

app.all("*", (req,res) => {
    res.json("Page not found")
})
app.listen(process.env.PORT , () => {
    console.log("Server has started")   
}); 