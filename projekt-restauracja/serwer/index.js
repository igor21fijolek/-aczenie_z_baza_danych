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

// dodawanie stolika
app.get("/add-stolik/:ilosc_osob/:czy_zarezerwowane", (req,res)=>{
    let ilosc_osob = parseInt(req.params.ilosc_osob)
    let czy_zarezerwowane = req.params.czy_zarezerwowane
    const sql = `insert into stoliki (max_liczba_os, czy_zarezerwowano) values (${ilosc_osob}, '${czy_zarezerwowane}')`
    con.query(sql, (err, wynik, info_wynik)=>{
        res.send("dodano stolik")
        console.log(info_wynik);
    })
})

// // wyswietlanie klientow
// app.get("/klienci", (req,res)=>{
//     const sql = `select * from klienci`
//     con.query(sql, (err, wynik, info_wynik)=>{
//         res.send(wynik)
//         console.log(info_wynik);
//     })
// })

// wyswietlanie menu
app.get("/get-menu", (req,res)=>{
    const sql = `select * from menu`
    con.query(sql, (err, wynik, info_wynik)=>{
        res.send(wynik)
        console.log(info_wynik);
    })
})

// dodanie sugesti klienta do tabeli propozycje
app.get("/add-sugestion/:danie/:typDania/:cena/:id", (req,res)=>{
    let danie = req.params.danie
    let typ_dania = req.params.typDania
    let cena = parseFloat(req.params.cena)
    let id_klienta = parseInt(req.params.id)
    const sql = `insert into propozycje_klientow (nazwa, typ_dania, cena, id_klienta) values ('${danie}', '${typ_dania}', ${cena}, ${id_klienta})`
    con.query(sql, (err, wynik, info_wynik)=>{
        res.send("dodano rekord")
        console.log(info_wynik);
    })
})

//wyswietlanie sugesti klienta
app.get("/get-sugestion", (req,res)=>{
    const sql = `select * from propozycje_klientow`
    con.query(sql, (err, wynik, info_wynik)=>{
        res.send(wynik)
        console.log(info_wynik);
    })
})


//dodawanie do menu
app.get("/menu-add/:nazwa/:cena/:typ_dania", (req,res)=>{
    let nazwa = req.params.nazwa
    let cena = parseInt(req.params.cena)
    let typ_dania = req.params.typ_dania

    const sql = `insert into menu (nazwa, cena , typ_dania) values ('${nazwa}', ${cena}, '${typ_dania}')`
    con.query(sql,(err,wynik, info_wynik)=>{
        res.send("dodano do menu")
        console.log(info_wynik);
    })
})

//zapsiuwanie sie klientow
app.get("/client-add/:imie/:nazwisko/:telefon/:email",(req,res)=>{
    let imie = req.params.imie
    let nazwisko = req.params.nazwisko
    let telefon = req.params.telefon
    let email = req.params.email

    const sql = `insert into klienci (imie,nazwisko,telefon,email) values ('${imie}','${nazwisko}','${telefon}','${email}')`
    con.query(sql,(err,wynik,info_wynik)=>{
        res.send("zapsisano do restauracji")
        console.log(info_wynik);
    })
})

app.listen(3000, ()=>{
    console.log('dziala');
})
