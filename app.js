const express = require('express');
const path = require('path');
const app = new express();
const rootDir = require('./utils/path');
const homeroute = require('./routes/home');
const userroute = require('./routes/users');
const bodyparser = require('body-parser');
const expresshbr = require('express-handlebars');
const notfound = require('./controllers/404con.js');
const db = require('./utils/database.js');
//app.engine('hbs',expresshbr({layoutsDir:'views/layouts/',defaultLayout:'layout1.hbs',extname:'hbs'}));
//app.set('view engine','hbs'); //could change name from hbs to anything, but ur file name extension should be same ie .hbs
//app.set('view engine','pug'); //pug is the template engine we are gonna use 
app.set('view engine','ejs');
app.set('views', 'views'); //because the folder which contains our html files , its name is views/
app.use(express.static(path.join(rootDir,'public')));

app.use(bodyparser.urlencoded({extended:true}));
app.use('/admin',userroute.route);
app.use('/',homeroute);

app.use(notfound.notf);

/*db.execute('SELECT * FROM products').then(result=>{
    console.log(result[0]);
}).catch((err)=>{
    console.log(err);
});*/

app.listen(3000);

//templating engines, - eejs, pug, handlebars
//npm install pug--save
//npm install --save express-handlebars@3.0
//npm install --save ejs
