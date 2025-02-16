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
