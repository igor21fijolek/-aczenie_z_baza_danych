



// btn.addEventListener("click", function(){
//     console.log("object");
//     let tr = document.createElement("tr")
//     let tdKsiazka = document.createElement("td")
//     let tdAuotr = document.createElement("td")
//     let table = document.querySelector("table")
//     tdAuotr.textContent = autor
//     tdKsiazka = ksiazka
//     table.appendChild(tr)
//     tr.appendChild(tdKsiazka)
//     tr.appendChild(tdAuotr)
// })

async function dodai() {
    let ksiazka = document.getElementById("ksiazka").value
    let autor = document.getElementById("autor").value
    const url = `http://localhost:3000/get-book/${ksiazka}/${autor}`
    fetch(url)
}
let json = []
 async function start(){
    let tabla = document.querySelector("table")
    const url = `http://localhost:3000/books`
    let data = await fetch(url)
    json = await data.json()
    console.log(json);
    for(let i=0;i<json.length;i++){
        const tr = document.createElement("tr")
        tabla.appendChild(tr)
        const td1 = document.createElement("td")
        td1.innerHTML=  json[i].title
        const td2 = document.createElement("td")
        td2.innerHTML=  json[i].author

        tr.appendChild(td1)
        tr.appendChild(td2)

    }
 }
start()
let btn = document.querySelector("button")

btn.addEventListener("click", async function(){
    const url = `http://localhost:3000/books`
    const data = await fetch(url)
    json = await data.json()

}
)
