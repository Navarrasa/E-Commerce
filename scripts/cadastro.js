// Realizar Cadastro
const variavel = document.getElementById("btn-login")

function btnClicado(){
    if(emailVazio === false && senhaVazia === false){
        alert("Cadastro Feito com Sucesso!")
        window.location.href="../pages/login.html";
    }
    else{
        alert("Está faltando um dos campos!")
    }
}
variavel.addEventListener("click", () => btnClicado())
// Fim


// Verificar Label Vazia
const login = document.getElementById("label-email")
const senha = document.getElementById("label-senha")

function labelVazia(verifyLoginLabel, type){
    if(verifyLoginLabel == ""){
        if(type === "email"){
            emailVazio = true;
        }
        else{
            senhaVazia = true;
        }
    } else {
        if(type === "email"){
            emailVazio = false;
        }
        else{
            senhaVazia = false;
        }
    }
}
login.addEventListener("change", (e) => {labelVazia(e.target.value, "email")})
senha.addEventListener("change", (e) => {labelVazia(e.target.value, "senha")})
let emailVazio = true;
let senhaVazia = true;