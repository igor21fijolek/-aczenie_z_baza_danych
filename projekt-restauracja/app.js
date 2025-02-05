let main = document.getElementById("main")
async function menu(){
    let tab = document.querySelector("table")
    if (tab != null) { tab.remove() }
    let tabela = document.createElement("table")
    tabela.innerHTML = `
      <table>
            <tr>
                <th>nazwa dania</th>
                <th>cena</th>
                <th>typ dania</th>
            </tr>
        </table>  
    `
    let data = await fetch("http://localhost:3000/get-menu")
    data =  await data.json()
    console.log(data)

    for(let i= 0; i< data.length;i++){
        const tr = document.createElement("tr")
        const tddanie = document.createElement("td")
        const tdcena = document.createElement("td")
        const tdtyp = document.createElement("td")
        tddanie.innerHTML = data[i].nazwa
        tdcena.innerHTML = data[i].cena
        tddanie.innerHTML = data[i].typ_dania
        tr.appendChild(tddanie)
        tr.appendChild(tdcena)
        tr.appendChild(tddanie)
        tabela.appendChild(tr)
    }
    main.appendChild(tabela)
}