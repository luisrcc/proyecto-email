const btnSed = document.querySelector("#enviar");
const btnReset = document.querySelectorAll('#resetBtn')
const email = document.querySelector("#email");
const asunto = document.querySelector("#asunto");
const mensaje = document.querySelector("#mensaje");
const formulario = document.querySelector("#enviar-mail");
const expressionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

eventListeners();
function eventListeners() {
  document.addEventListener("DOMContentLoaded", appInit);

  email.addEventListener("blur", validarFormulario);
  asunto.addEventListener("blur", validarFormulario);
  mensaje.addEventListener("blur", validarFormulario);

  btnReset.addEventListener('click', resetForm);

  formulario.addEventListener('submit', enviarEmail);
}

function appInit() {
  btnSed.disable = true;
  btnSed.classList.add("cursor-not-allowed", "opacity-50");
}

function validarFormulario(e) {


  if (e.target.value.length > 0) {

        const error = document.querySelector('p.error');
        if(error){

            error.remove();
        }

        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");
  } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");
        mostrarError("Todos los campos son obligatorios");
  }

  if (e.target.type === "email") {
    
    if (expressionRegular.test(e.target.value)) {
        const error = document.querySelector('p.error');
        if(error){

            error.remove();
        }

        e.target.classList.remove("border", "border-red-500");
        e.target.classList.add("border", "border-green-500");
    } else {
        e.target.classList.remove("border", "border-green-500");
        e.target.classList.add("border", "border-red-500");
        mostrarError("El email no es valido");
    }
  }

    if (expressionRegular.test(email.value) && asunto.value !== '' && mensaje.value !== '' ){
        btnSed.disable = false;
        btnSed.classList.remove("cursor-not-allowed", "opacity-50");
    } 
}

function mostrarError(mensaje) {
  const mensajeError = document.createElement("p");
  mensajeError.textContent = mensaje;
  mensajeError.classList.add(
    "border",
    "border-red-500",
    "background-red-100",
    "text-red-500",
    "p-3",
    "mt-5",
    "text-center",
    "error"
  );

  const errores = document.querySelectorAll(".error");
  if (errores.length === 0) {
    formulario.appendChild(mensajeError);
  }
}

function enviarEmail(e){
    e.preventDefault();
    
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    setTimeout( () => {
        spinner.style.display = 'none';

        const parrafo = document.createElement('p');
        parrafo.textContent ='el mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'uppercase', 'font-bold');

        formulario.insertBefore(parrafo, spinner);

        setTimeout(() => {
            parrafo.remove();

            resetForm();
        }, 5000);
    }, 3000 );
}

function resetForm(){
    formulario.reset()

    appInit();
}