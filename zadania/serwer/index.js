const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())

var mysql = require("mysql");

var con =  mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'libary',
})

con.connect((err)=>{
    if(!err){
        console.log('polczono z baza');
    }else{
        console.log('nie polczono z baza');
    }
})


app.get("/get-book/:title/:autor", (req,res)=>{
    let title = req.params.title
    let autor = req.params.autor

    const sql = `Insert into books (title, author) values ('${title}','${autor}')`

    con.query(sql, (err,wynik,info_wynik)=>{
        res.send("dodano rekord");
        console.log("ok");
    })
})

app.get("/books", (req,res)=>{
    const sql = `Select * from books`
    con.query(sql, (err,wynik,info_wynik)=>{
        res.send(wynik)
        console.log(info_wynik);
    })

})

app.listen(3000, ()=>{
    console.log('dziala');
})