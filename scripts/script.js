let getName = document.getElementById("getName");
let errorModal = document.getElementById("myModal");
let domain = "http://localhost:8080";
let textModal = document.getElementById('textModal');
let tables = new Map();
tables.set("users", domain + "/api/user/");

let ajax = new AJAX(tables);

function callback(object, params) {
    console.log("name", object[0].name);
}
function redirect(object,params) {
    if(object===null){
        textModal.textContent='Usuario no validdo'
        $('#exampleModal').modal('show');
    }else{
        textModal.textContent='Bienvenido '+object.name
        $('#exampleModal').modal('show');
    }
}
getName.onclick = () => {
    
    ajax.read("users", callback, "all", "");
};

function logSubmit(event) {
    //log.textContent = `Form Submitted! Time stamp: ${event.timeStamp}`;
    var email=event.target[0].value;
    var password=event.target[1].value;
    var endpoint=email+'/'+password
    if(email!==''&&password!==''){
        ajax.read('users',redirect,endpoint,'')
    }else{
        textModal.textContent='Ingrese datos validos'
        $('#exampleModal').modal('show');
    }
    event.preventDefault();
}

const form = document.getElementById("form");
//const log = document.getElementById("log");
form.addEventListener("submit", logSubmit);
