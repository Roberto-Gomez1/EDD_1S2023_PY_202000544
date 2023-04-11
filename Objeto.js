class Alumno{
    constructor(nombre,carnet, contraseña,carpeta){
        this.nombre = nombre;
        this.carnet = carnet;
        this.contraseña = contraseña;
        this.carpeta = carpeta;
    }
}

let alumnos = [];
export {alumnos, Alumno}
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
            console.log(alumnos[i]);
        }
        
    }
    lector.readAsText(archivo);
}

function agregarEventos() {
    document.getElementById("carga_alumnos").addEventListener("change", cargaAlumnos, false);
    document.getElementById("select-options").addEventListener("change", function(){
        const selectedOption = this.value;
        const container = document.getElementById("alumnos-container");
        if (selectedOption === "option1") {
            container.innerHTML = "";
            alumnos.forEach((alumno) => {
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
            container.innerHTML = "";
            let index = 0;
            
            const createCard = (alumno) => {
              const card = document.createElement("div");
              card.classList.add("col-xl-3", "col-md-6", "mb-4");
              card.innerHTML = `
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          Nombre: ${alumno.nombre}
                        </div>
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
            };
            
            const createCards = (alumnos) => {
              if (!alumnos || alumnos.length === 0) {
                return;
              }
              createCard(alumnos[index++]);
              createCards(alumnos[index - 1].hijos);
              if (index === alumnos.length) {
                return;
              }
              createCards(alumnos);
            };
            
            createCards(alumnos);
          }else if (selectedOption === "option3") {
            container.innerHTML = "";
            const createPostOrderCards = (alumnos) => {
              if (!alumnos || alumnos.length === 0) {
                return;
              }
          
              const [left, right] = [alumnos.filter((_, i) => i < alumnos.length - 1), alumnos[alumnos.length - 1]];
          
              const card = document.createElement("div");
              card.classList.add("col-xl-3", "col-md-6", "mb-4");
              card.innerHTML = `
                <div class="card border-left-primary shadow h-100 py-2">
                  <div class="card-body">
                    <div class="row no-gutters align-items-center">
                      <div class="col mr-2">
                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                          Nombre: ${right.nombre}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                          Carnet: ${right.carnet}
                        </div>
                        <div class="h5 mb-0 font-weight-bold text-gray-800">
                          Carpeta: ${right.carpeta}
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
              
              createPostOrderCards(left);
            };
            
            createPostOrderCards(alumnos);
          }
    });
}

document.addEventListener("DOMContentLoaded", agregarEventos);


