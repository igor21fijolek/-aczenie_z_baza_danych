const express = require("express");

const cors = require("cors");

const app = express();

var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "1pro",
})

app.use(cors());

con.connect((err)=>{
    if(!err){
        console.log("polaczaono z baza");
    }else{
        console.log("blad poloczenia");
    }
})

app.get("/getdata", (req,res)=>{
    const sql  = "SELECT *  FROM test"

    con.query(sql, (err, wynik, info_wynik)=>{
        console.log(info_wynik);
        res.send(wynik)
    })
})

app.get("/wiecej", (req,res)=>{
    const sql  = "SELECT * FROM test where wiek >=18"
    con.query(sql, (err,wynik, info_wynik)=>{
        console.log(info_wynik);
        res.send(wynik)
    })
})

app.get("/dodaj/:imie/:nazwisko/:wiek", (req,res)=>{

    let imie = req.params.imie;
    let nazwisko = req.params.nazwisko;
    let wiek = req.params.wiek;
    const sql = `insert into test  (imie, nazwisko, wiek) values ('${imie}','${nazwisko}',${wiek})`

    con.query(sql, (err,wynik, info_wynik)=>{
        console.log(info_wynik);
        res.send("dodano rekord");
    })
})

app.get('/wiecej2/:wiek', (req,res)=>{
    let wiek = req.params.wiek;
    const sql = `select *  from test where wiek >= ${wiek}`
    con.query(sql, (err,wynik, info_wynik)=>{
        console.log(info_wynik);
        res.send(wynik);
    })
})

app.listen(3000, ()=>{
    console.log("dziala");
})
