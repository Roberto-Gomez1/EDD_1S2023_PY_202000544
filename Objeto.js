export {alumnos, Alumno}
class Alumno{
  constructor(nombre,carnet, contraseña,carpeta){
    this.nombre = nombre;
    this.carnet = carnet;
    this.contraseña = contraseña;
    this.carpeta = carpeta;
  }
}

import { ArbolAVL} from "./ArbolAVl.js";
let alumnos = [];
const arbolBinarioAVL = new ArbolAVL();
function cargaAlumnos(e) {
    var archivo = e.target.files[0];

    if (!archivo) {
        return;
    }

    let lector = new FileReader();
    lector.onload = function(e) {
        let contenido = e.target.result;

        const object = JSON.parse(contenido);

        alumnos = object.alumnos.map((alumno) => {
            return new Alumno(alumno.nombre, alumno.carnet, alumno.password, alumno.Carpeta_Raiz);
          });
        for (let i = 0; i < alumnos.length; i++) {
            arbolBinarioAVL.insertaValor(alumnos[i]);
        }
      localStorage.setItem("alumnos", JSON.stringify(alumnos));
      const pre = arbolBinarioAVL;
      const inn = arbolBinarioAVL;
      const post = arbolBinarioAVL;
      localStorage.setItem("preorden", JSON.stringify(arbolBinarioAVL.recorridoPreorden(pre.raiz)));
      localStorage.setItem("inorden", JSON.stringify(arbolBinarioAVL.recorridoInorden(inn.raiz)));
      localStorage.setItem("postorden", JSON.stringify(arbolBinarioAVL.recorridoPostOrden(post.raiz)));
    }
    lector.readAsText(archivo);
}

function agregarEventos() {
    document.getElementById("carga_alumnos").addEventListener("change", cargaAlumnos, false);
    document.getElementById("select-options").addEventListener("change", function(){
        const selectedOption = this.value;
        const container = document.getElementById("alumnos-container");
        if (selectedOption === "option1") {
          const inorden = JSON.parse(localStorage.getItem("inorden"));
          container.innerHTML = "";
          inorden.forEach((alumno) => {
              const card = document.createElement("div");
              card.classList.add("col-xl-3", "col-md-6", "mb-4");
              card.innerHTML = `
                  <div class="card border-left-primary shadow h-100 py-2">
                      <div class="card-body">
                          <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                      Nombre: ${alumno.nombre}</div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                                      Carnet: ${alumno.carnet}
                                  </div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                                      Carpeta: ${alumno.carpeta}
                                  </div>
                              </div>
                              <div class="col-auto">
                                  <i class="fas fa-user fa-2x text-gray-300"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              `;
              container.appendChild(card);
          });
        } else if (selectedOption === "option2") {
          const preorden = JSON.parse(localStorage.getItem("preorden"));

          // Limpiar el contenido del contenedor
          container.innerHTML = "";
          
          // Iterar sobre los datos y crear las tarjetas
          preorden.forEach((alumno) => {
              const card = document.createElement("div");
              card.classList.add("col-xl-3", "col-md-6", "mb-4");
              card.innerHTML = `
                  <div class="card border-left-primary shadow h-100 py-2">
                      <div class="card-body">
                          <div class="row no-gutters align-items-center">
                              <div class="col mr-2">
                                  <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                      Nombre: ${alumno.nombre}</div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                                      Carnet: ${alumno.carnet}
                                  </div>
                                  <div class="h5 mb-0 font-weight-bold text-gray-800">
                                      Carpeta: ${alumno.carpeta}
                                  </div>
                              </div>
                              <div class="col-auto">
                                  <i class="fas fa-user fa-2x text-gray-300"></i>
                              </div>
                          </div>
                      </div>
                  </div>
              `;
              container.appendChild(card);
          });
        }else if (selectedOption === "option3") {
            const postorden = JSON.parse(localStorage.getItem("postorden"));
            container.innerHTML = "";
            postorden.forEach((alumno) => {
                const card = document.createElement("div");
                card.classList.add("col-xl-3", "col-md-6", "mb-4");
                card.innerHTML = `
                    <div class="card border-left-primary shadow h-100 py-2">
                        <div class="card-body">
                            <div class="row no-gutters align-items-center">
                                <div class="col mr-2">
                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Nombre: ${alumno.nombre}</div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                                        Carnet: ${alumno.carnet}
                                    </div>
                                    <div class="h5 mb-0 font-weight-bold text-gray-800">
                                        Carpeta: ${alumno.carpeta}
                                    </div>
                                </div>
                                <div class="col-auto">
                                    <i class="fas fa-user fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
            }
          });
          
    document.getElementById("graficar").addEventListener("click", function(){
    let url = 'https://quickchart.io/graphviz?graph=';
    let body = arbolBinarioAVL.grafica_arbol();
    $("#image").attr("src", url + body);
    });
}


document.addEventListener("DOMContentLoaded", agregarEventos);


