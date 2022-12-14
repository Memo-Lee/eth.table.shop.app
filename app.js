const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const photoControllers = require('./controllers/photoControllers');
const pageControllers = require('./controllers/pageControllers');
const app = express();

// connect DB atlas tanımlaması
mongoose.connect('mongodb+srv://memolee:tAmR6X4M72Npf06x@cluster0.srwwys5.mongodb.net/pcat-db?retryWrites=true&w=majority')
.then(()=>{
    console.log('DB CONNECTED!');
}).catch((err)=>{
    console.log(err);
});

// TEMPLATE ENGINE
app.set("view engine", "ejs");

//MIDDLEWARES
/* request - response döngüsünün içerisindeki görevi olan her fonksiyona 
middleware denir. Yani herşey request ve responsun 'middle'ında ortasında yapılır. */
app.use(express.static('public'));
// requesti response ederek sonlandırma işlemi için gerekli olan express methodları
// urlencoded url okumamıza yarıyor.
app.use(express.urlencoded({ extended: true }));
// json formatına çevirmeye yarıyor.
app.use(express.json());
app.use(fileUpload());
// post require işlemini put olarak göndermek için method-override modülünü kullanıyoruz.
app.use(methodOverride('_method',{
    methods:['POST','GET']
})); // gerektiğinde metotların override olamasını belirtebiliyoruz.


// ROUTES
app.get('/', photoControllers.getAllPhotos);

app.get('/photos/:id', photoControllers.getPhoto);

app.post('/photos', photoControllers.createPhoto);

app.put('/photos/:id', photoControllers.updatePhoto);

app.delete('/photos/:id', photoControllers.deletePhoto);

app.get('/photos/edit/:id', pageControllers.getEditPage);
app.get('/about', pageControllers.getAboutPage);
app.get('/add', pageControllers.getAddPage);
app.get('/contact', pageControllers.getContactPage);


const port = process.env.PORT || 5000; // hosting'in portu belirlemesi için
app.listen(port, () => {
    console.log(`Pcat app sunucu ${port} portunda başlatıldı...`)
});