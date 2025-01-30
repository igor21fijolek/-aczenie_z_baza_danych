const express = require("express")
const cors = require("cors")
const app = express()
app.use(cors())
var mysql = require("mysql");

var con =  mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'restauracja',
})

con.connect((err)=>{
    if(!err){
        console.log('polczono z baza');
    }else{
        console.log('nie polczono z baza');
    }
})

// wyswietlanie stolikow
app.get("/get-stoliki", (req,res)=>{
    const sql = `select * from stoliki`
    con.query(sql, (err, wynik, info_wynik)=>{
        res.send(wynik)
        console.log(info_wynik);
    })
})

// wyswietlanie kleintow
app.get("/klienci", (req,res)=>{
    const sql = `select * from klienci`
    con.query(sql, (err, wynik, info_wynik)=>{
        res.send(wynik)
        console.log(info_wynik);
    })
})

// wyswietlanie menu
app.get("/get-menu", (req,res)=>{
    const sql = `select * from menu`
    con.query(sql, (err, wynik, info_wynik)=>{
        res.send(wynik)
        console.log(info_wynik);
    })
})

// dodanie sugesti klienta do tabeli
app.get("/add-sugestion", (req,res)=>{
    const sql = `insert into `
    con.query(sql, (err, wynik, info_wynik)=>{
        res.send("dodano rekord")
        console.log(info_wynik);
    })
})

app.listen(3000, ()=>{
    console.log('dziala');
})
