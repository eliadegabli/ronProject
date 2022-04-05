const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
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

app.listen(process.env.PORT || PORT,() => {
    console.log('run on port ${PORT}');
});