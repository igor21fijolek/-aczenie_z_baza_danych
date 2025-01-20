let btn = document.querySelector("button")
let main = document.getElementById("main")
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
 async function start(){
    let tab = document.querySelector("table");
    if(tab != null){tab.remove()}
    let tabela = document.createElement("table")
    tabela.innerHTML = `        
        <table>
            <tr>
                <th>id</th>
                <th>tytul</th>
                <th>autor</th>
            </tr>
        </table>`
    let data = await fetch("http://localhost:3000/books")
    data = await data.json()
    console.log(data);
    for(let i=0;i<data.length;i++){
        let btn  = document.createElement("button")
        btn.innerHTML = "usun"
        const tr = document.createElement("tr")
        tabela.appendChild(tr)
        main.appendChild(tabela)
        const idtd = document.createElement('td')
        idtd.innerHTML = data[i].id
        const titletd = document.createElement("td")
        titletd.innerHTML = data[i].title
        const authortd = document.createElement("td")
        authortd.innerHTML = data[i].author
        tr.appendChild(idtd)
        tr.appendChild(titletd)
        tr.appendChild(authortd)
    }
 }

btn.addEventListener("click", async function(){
    await dodai();
    await start()
})
