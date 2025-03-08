let main = document.querySelector(".main")
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
        tddanie.innerHTML = data[i].nazwa;
        tdcena.innerHTML = data[i].cena;
        tdtyp.innerHTML = data[i].typ_dania;
        tr.appendChild(tddanie)
        tr.appendChild(tdcena)
        tr.appendChild(tdtyp)
        tabela.appendChild(tr)
    }
    main.appendChild(tabela)
}

async function dodaj_menu() {
    let danieInput = document.getElementById("nazwa_dania");
    let cenaInput = document.getElementById("cena");
    let typDaniaInput = document.getElementById("typ_dania");

    let danie = danieInput.value;
    let cena = cenaInput.value;
    let typ_dania = typDaniaInput.value;

    await fetch(`http://localhost:3000/menu-add/${danie}/${cena}/${typ_dania}`);

    alert("Dodano do menu");

  
    danieInput.value = "";
    cenaInput.value = "";
    typDaniaInput.value = "";
}

async function zapsiz_klienta() {
    let imieInput = document.getElementById("imie");
    let nazwiskoInput = document.getElementById("nazwisko");
    let telefonInput = document.getElementById("telefon");
    let emailInput = document.getElementById("email");

    let imie = imieInput.value;
    let nazwisko = nazwiskoInput.value;
    let telefon = telefonInput.value;
    let email = emailInput.value;

    await fetch(`http://localhost:3000/client-add/${imie}/${nazwisko}/${telefon}/${email}`);
    alert("Dodano do restauracji");

    
    imieInput.value = "";
    nazwiskoInput.value = "";
    telefonInput.value = "";
    emailInput.value = "";
}

async function dodaj_sugestia_klienta() {
    let nazwaInput = document.getElementById("danie")
    let typInput = document.getElementById("typ_dania")
    let cenaInput = document.getElementById("cena_danie")
    let idInput = document.getElementById("id_klienta")


    let nazawa = nazwaInput.value
    let typ = typInput.value
    let cena = cenaInput.value
    let id = idInput.value

    await fetch(`http://localhost:3000/add-sugestion/${nazawa}/${typ}/${cena}/${id}`)
    alert("Dodano propozycje")


    nazwaInput.value = ""
    typInput.value = ""
    cenaInput.value = ""
    idInput.value = ""
}
async function dodaj_stolik() {
    let liczbaOs = document.getElementById("liczba_os")
    let czyZarezerwowane = document.getElementById("czy_zarezerwowane")

    let liczba_os = liczbaOs.value
    let czy_zarezerwowane = czyZarezerwowane.value

    await fetch(`http://localhost:3000/add-table/${liczba_os}/${czy_zarezerwowane}`)
    alert("Dodano stolik")

    liczbaOs.value = ""
    czyZarezerwowane.value = ""
}

async function pokaz_stolik() {
    let tab = document.querySelector("table")
    if (tab != null) { tab.remove() }
    let tabela = document.createElement("table")
    tabela.innerHTML = `
      <table>
            <tr>
                <th>lizcba osób</th>
                <th>czy zarezerwowane</th>
            </tr>
        </table>  
    `
    let data = await fetch("http://localhost:3000/get-stoliki")
    data =  await data.json()
    console.log(data)

    for(let i= 0; i< data.length;i++){
        const tr = document.createElement("tr")
        const tdOsoby = document.createElement("td")
        const tdCzyZare = document.createElement("td")
        tdOsoby.innerHTML = data[i].max_liczba_os;
        tdCzyZare.innerHTML = data[i].czy_zarezerwowano;
        tr.appendChild(tdOsoby)
        tr.appendChild(tdCzyZare)
        tabela.appendChild(tr)
    }
    main.appendChild(tabela)
}

async function zarezerwuj_stolik() {
        let main = document.querySelector("#stoliki")
        let tab = document.querySelector("table")
        if (tab != null) { tab.remove() }
        let tabela = document.createElement("table")
        tabela.innerHTML = `
          <table>
                <tr>
                    <th>liczba osób</th>
                    <th>czy zarezerwowane</th>
                    <th>zarezerwuj</th>
                </tr>
            </table>  
        `;
        let response = await fetch("http://localhost:3000/get-stoliki")
        let data = await response.json()
        console.log(data)
    
        for (let i = 0; i < data.length; i++) {
            const tr = document.createElement("tr")
            const tdOsoby = document.createElement("td")
            const tdCzyZare = document.createElement("td")
            const tdZare = document.createElement("button")
            tdOsoby.innerHTML = data[i].max_liczba_os
            tdCzyZare.innerHTML = data[i].czy_zarezerwowano
            tdZare.innerHTML = "zarezerwuj"
            tdZare.addEventListener("click", async function () {
                let id_klienta = prompt("podaj id klienta")
                let id_stolika = data[i].id
                let data_rezerwacji = prompt("podaj date")
                let godzina_rezerwacji = prompt("podaj godzine")
                let liczba_os = data[i].max_liczba_os
                await fetch(`http://localhost:3000/add-rezerwacja/${id_klienta}/${id_stolika}/${data_rezerwacji}/${godzina_rezerwacji}/${liczba_os}`)
                alert("zarezerwowano")
                pokaz_stolik()
            })
            tr.appendChild(tdOsoby)
            tr.appendChild(tdCzyZare)
            tr.appendChild(tdZare)
            tabela.appendChild(tr)
        }
        main.appendChild(tabela)
    }
