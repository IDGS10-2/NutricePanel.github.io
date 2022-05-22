let list = document.querySelectorAll('.navigation li');
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');
let tablename = document.getElementById('name');
let fila = document.getElementById('fila');

let html = '';

// -[ Sidebar Animation ]-
function activeLink(){
    list.forEach((item)=>
        item.classList.remove('hovered'));
        this.classList.add('hovered');
}

list.forEach((item)=>
item.addEventListener('mouseover',activeLink));

// -[ Toggle Menu ]-
toggle.onclick = function (){
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}

// -[ Cards Data Processing ]-
let customersDOM = document.getElementById('customers');
let income = document.getElementById('income');

function getCustomersCount() {
    fetch('/api/users')
    .then(response =>{
        // -[ Response Handler ]-
        response = response.json()
        .then(res=>{
            numPacientes = res.listaPacientes.length;
            console.log(numPacientes);
        })
    })
}
getCustomersCount();

function fillTable() {
    // -[ Fetch Data on page Load ]-
    fetch('/api/users')
    .then(response =>{
        // -[ Response Handler ]-
        response = response.json()
        .then(res=>{
            arrayPacientes = res.listaPacientes;
            arrayPacientes.forEach(element => {
                console.log(element.name);
                // -[ Table Construction ]-
                let htmlSegment = `
                <tr>
                    <td class="name" id="name">${element.name}</td>
                    <td>$1,200</td>
                    <td>Pagado</td>
                    <td><a href="#"><ion-icon name="pencil-outline"></ion-icon></a><a href="#" ><ion-icon name="locate-outline"></ion-icon></a><a href="#"><ion-icon name="trash-bin-outline"></ion-icon></a></td>
                    <td><span id="status" onclick="actionBtns(this)" class="status delivered">Activo</span></td>
                </tr>
                `;
                html += htmlSegment;
            });

            // -[ Insert Processed Data into DOM Elements ]-
            let numPacientes = arrayPacientes.length;
            let income_count = (numPacientes*1200).toLocaleString('en-US');

            fila.innerHTML = html;
            customersDOM.innerHTML = numPacientes;
            income.innerHTML = income_count;
 
        })
    })
    .catch(error =>{
        // -[ Error Handler ]-
        console.log(error);
    })
}
fillTable();

// JQuery Realtime Search
$(document).ready(function() {
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#fila tr").filter(function() {
            $(this).toggle($(this).text()
            .toLowerCase().indexOf(value) > -1)
        });
    });
});
    let flag=false;

// Action Buttons
function actionBtns(td) {
    
    if (flag==false) {
        td.classList.remove('status', 'delivered');
        td.classList.add('status', 'pending');
        td.innerHTML='Pendiente';
        flag=true;
    }else if(flag==true){
        td.classList.remove('status', 'pending');
        td.classList.add('status', 'delivered');
        td.innerHTML='Activo';
        flag=false;
    }
    
}