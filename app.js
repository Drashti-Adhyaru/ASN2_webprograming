 /****************************************************************************** ***
* ITE5315 – Assignment 2
* I declare that this assignment is my own work in accordance with Humber Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students. *
* Name: Drashti Student ID: n01539964 Date:3-11-2023 *
* ****************************************************************************** **/var express = require('express');
var path = require('path');
var app = express();
const exphbs = require('express-handlebars');
const sample = require('./ite5315-A1-Car_sales.json');
const salesData = require('./SuperSales.json');

const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({extended:false})

const port = process.env.port || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', exphbs.engine({ extname: '.hbs' ,
helpers:{
    rating: function (options) {
    if(options==0){
      return false;
    }else{
      return true;
    }
  }
,
rating1: function (options) {
    if(options!=0){
      return false;
    }else{
      return true;
    }
  },
edit:function (rating) {
    return rating === 0;
  },convert:function(value) {
    if (value === 0) {
      return 'zero';
    } else {
      return value;
    }
  },
  im: function(options) {
    // Check if the value is an image URL
    if (typeof options === 'string' && options.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
        return "<img src="+options+" alt='Product Image' style='max-width: 100px; max-height: 100px;'>";
    } else {
        return options;
    }
}
},

}));
app.set('view engine', 'hbs');


app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});
app.get('/users', function(req, res) {
//   res.send('respond with a resource');
  res.render('layout', { data: 'respond with a resource' });

});

app.get('/data',function(req,res){
    res.send(sample)
   //console.log(sample);
})
app.get('/data/invoiceNo/:n',function(req,res){
    num = req.params.n
    if(num>=0 && num<sample.carSales.length){
        n = sample.carSales[req.params.n].InvoiceNo;
        // res.send('<h2>'+n+'</h2>')
        res.render('layout', { data: n });

    }else{
        // res.send('<h2>Invalid Input!! Please add valid Index</h2>')
        res.render('layout', { data: "Invalid Input!! Please add valid Index"});
    }
})
app.get('/search/invoiceNo',function(req,res,next){
    // res.send(`<form method="POST" action="/search/invoiceNo"><input type="text" 
    // name="username" placeholder="Enter Invoice No"><input type="submit"></form>`);
    res.render('search', { });

})

app.post('/search/invoiceNo',urlencodedParser,function(req,res){
    username = req.body.username;
    data1 = {}
    for(i=0;i<sample.carSales.length;i++){
        if(username==sample.carSales[i].InvoiceNo){
            data1 = sample.carSales[i];
        }
    }
    res.render('invoiceNo',{data1:data1});
})

app.get('/search/Manufacturer/',function(req,res){
   // res.send(`<form method="POST" action="/search/Manufacturer"><input type="text" 
   // name="manufacturer" placeholder="Enter Manufacturer"><input type="submit"></form>`);
   res.render('manufacture', { });
    
})

app.post('/search/Manufacturer/',urlencodedParser,function(req,res){
    username = req.body.manufacturer;
    console.log(username);
    data2 = []
    for(i=0;i<sample.carSales.length;i++){
        if((sample.carSales[i].Manufacturer).includes(username)){
            data1 = sample.carSales[i];
            data2.push(data1)
        }
    }



    // str+=`</tbody></table></div></body></html>`;
    res.render('manufactureData',{data :data2});

})

app.get('/viewData', function(req, res) {
    res.render('viewData', { sales: salesData });
});

app.get('/nonZeroRating', function(req, res) {
    res.render('nonZeroRating', { sales: salesData });
});

app.get('/editZero', function(req, res) {
    res.render('editZero', { sales: salesData });
});

app.get('*', function(req, res) {
  res.render('error', { title: 'Error', message:'Wrong Route' });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})