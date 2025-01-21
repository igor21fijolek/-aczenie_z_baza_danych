let btn = document.querySelector("button")
let main = document.getElementById("main")

async function dodai() {
    let ksiazka = document.getElementById("ksiazka").value
    let autor = document.getElementById("autor").value
    const url = `http://localhost:3000/get-book/${ksiazka}/${autor}`
    fetch(url)
}


async function start() {
    let tab = document.querySelector("table");
    if (tab != null) { tab.remove() }
    let tabela = document.createElement("table")
    tabela.innerHTML = `        
        <table>
            <tr>
                <th>id</th>
                <th>tytul</th>
                <th>autor</th>
                <th>akcje</th>
            </tr>
        </table>`
    let data = await fetch("http://localhost:3000/books")
    data = await data.json()
    console.log(data);

    for (let i = 0; i < data.length; i++) {
        let btnUsun = document.createElement("button")
        let btnUpdate = document.createElement("button")
        btnUsun.innerHTML = "usun"
        btnUpdate.innerHTML = "zmien ksiazke"
        const tr = document.createElement("tr")
        const tdAkcja = document.createElement('td')
        const idtd = document.createElement('td')
        idtd.innerHTML = data[i].id
        const titletd = document.createElement("td")
        titletd.innerHTML = data[i].title
        const authortd = document.createElement("td")
        authortd.innerHTML = data[i].author
        tr.appendChild(idtd)
        tr.appendChild(titletd)
        tr.appendChild(authortd)
        tr.appendChild(tdAkcja)
        tdAkcja.appendChild(btnUsun);
        tdAkcja.appendChild(btnUpdate);
        tabela.appendChild(tr)
        btnUpdate.addEventListener("click", async function () {
            let title = data[i].title;
            let author = data[i].author;
            let nazwa2 = prompt("podaj nowy tytul")
            let autor2  = prompt("Podaj nowego autora")
            await fetch(`http://localhost:3000/update-book/${title}/${author}/${nazwa2}/${autor2}`)
        })
        btnUsun.addEventListener("click", async function () {
            let title = data[i].title;
            let author = data[i].author;
            await fetch(`http://localhost:3000/delete-books/${title}/${author}`)
            tabela.removeChild(tr)
        })
    }
    main.appendChild(tabela)
}

btn.addEventListener("click", async function () {
    await dodai();
    await start();
})