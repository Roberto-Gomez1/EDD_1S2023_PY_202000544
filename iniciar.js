
import {Alumno,alumnos} from './Objeto.js';
class login{
    constructor(){
        this.user = document.getElementById('user');
        this.pass = document.getElementById('contra');
        this.btn = document.getElementById('btn');
        this.btn.addEventListener('click', this.validar.bind(this));
    }
    validar(){
        const alumno = alumnos.find(alumno => alumnos.carnet === this.user.value && alumnos.contraseña === this.pass.value);
        if(this.user.value === 'admin' && this.pass.value === 'admin'){
            window.location = 'dashboard.html';
        } else if (!alumno){
            window.location = 'dashboardestduiante.html'
        }else{
            alert('Usuario o contraseña incorrectos');
            }
        }
    }

const loginObj = new login();
      