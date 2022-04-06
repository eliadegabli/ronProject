const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
const mysql = require("mysql");

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'rondb' 
});
  
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());

if(process.env.NODE_ENV === "production"){
    app.use(express.static('build'));
    app.get('/', (req,res) => {
        req.sendFile(path.join(__dirname+'/index.html'));
    })
}

app.post("/api/insert",(req,res)=>{
    const Email = req.body.Email;
    const Phone = req.body.Phone;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const BirthDate = req.body.BirthDate;
    const sqlInsert = "Insert Into users (Email,Phone,First_Name,Last_Name,Birth_Date) Values (?,?,?,?);"
    db.query(sqlInsert, [Email,Phone,FirstName,LastName,BirthDate] ,(err,result) =>{
        res.send(result);
        console.log(result);     
        console.log(err);         
    });
});

app.put("/api/update",(req,res)=>{
    const Email = req.body.Email;
    const Phone = req.body.Phone;
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const sqlUpdate = "Update users set Phone=?,First_Name=?,Last_Name=? Where Email=?;"
    db.query(sqlUpdate, [Phone,FirstName,LastName,Email] ,(err,result) =>{
        const sqlSelect = "Select * From users;"
        db.query(sqlSelect, (err,result) =>{
            res.send(result);  
            console.log(result);        
        });
        //res.send(result);
        //console.log(result);            
    });
});

app.get("/api/get", (req,res) =>{
    const sqlSelect = "Select * From users;"
    db.query(sqlSelect, (err,result) =>{
        res.send(result);         
    });
}); 

app.post("/api/delete", (req,res) =>{
    const Email = req.body.Email;
    const sqlDelete = "delete from users where Email=?;"
    db.query(sqlDelete, Email, (err,result) =>{
        res.send(result);        
    });
}); 

app.listen(5000,() => {
    console.log("run on port 5000");
});

/*app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});*/