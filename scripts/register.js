let register = document.getElementById("register");
let errorModal = document.getElementById("myModal");
let domain = "http://localhost:8080";
let textModal = document.getElementById('textModal');
let tables = new Map();
tables.set("users", domain + "/api/user/");

let ajax = new AJAX(tables);

function registerCllbck(response,params) {
    console.log("Respuesta",response);
    if(response===null){
        textModal.textContent='Usuario ya esta registrado'
        $('#exampleModal').modal('show');
    }else{
        textModal.textContent='Usuario '+response.name+" creado";
        $('#exampleModal').modal('show');
    }
}

function logSubmit(event) {
    //log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    /*var email=event.target[0].value;
    var password=event.target[1].value;
    var endpoint=email+'/'+password
    if(email!==''&&password!==''){
        ajax.read('users',redirect,endpoint,'')
    }else{
        textModal.textContent='Ingrese datos validos'
        $('#exampleModal').modal('show');
    }
    event.preventDefault();*/
    var email = event.target[0].value;
    var name = event.target[1].value;
    var password = event.target[2].value;
    if (email !== '' && password !== '' && name !== '') {
        var user={"email":email,"name":name,'password':password};
        ajax.write("POST","users",JSON.stringify(user),registerCllbck,"new","");
        //ajax.read('users', redirect, endpoint, '')
    } else {
        textModal.textContent = 'Ingrese datos validos'
        $('#exampleModal').modal('show');
    }
    event.preventDefault();
}

const form = document.getElementById("form");
//const log = document.getElementById("log");
form.addEventListener("submit", logSubmit);
