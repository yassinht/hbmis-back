const express = require('express')
const nodemailer = require('nodemailer')
const dotenv = require('dotenv');
const path=require('path');
dotenv.config();
const app = express();
const cors =require('cors')
const port =5000 ;











app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.post('/send-mail',(req,res)=>{
    const{name,email,phone,message} =req.body
    const transporter = nodemailer.createTransport({
        service:'gmail',
        host:"smtp.gmail.com",
        auth :{
            user: process.env.EMAIL_USERNAME, 
            pass: process.env.EMAIL_PASSWORD 
        }
    });
    const html = `Bonjour, <br> Nom:${name} <br> Email:${email}<br>Objet:${phone}<br>Message:${message}`;

const mailOptions={
    from:'scores2023v2@gmail.com',
    to:'yassinhtt@gmail.com',
    name:name,
    message:html
}
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred while sending email:', error);
        res.status(500).send('Error sending email');
    } else {
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully');
    }
});



});


const staticFilesPath = path.join(__dirname, 'dist', 'hbmis');
app.use(express.static(staticFilesPath));

// Route to serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(staticFilesPath, 'index.html'));
});

app.listen(port,()=>{
    console.log(`server us running on port  ${port}`)
})