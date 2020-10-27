/* Capturardor de servicio select */
var select = document.getElementById('servicios');
select.addEventListener('change',
    function () {
        var selectedOption = this.options[select.selectedIndex];
        console.log(selectedOption.text);
        var seleccion = selectedOption.text


        switch (selectedOption.text) {
            case "Masajes":
                document.getElementById(`div-checkbox`).innerHTML = "";
                addElemento("masajeTerapeutico", "Masaje terapéutico");
                addElemento("masajeDeTejidoProfundo", "Masaje de tejido profundo");
                addElemento("masajeSueco", "Masaje sueco");
                addElemento("masajeJapones", "Masaje japonés");
                addElemento("masajeBalsamico", "Masaje balsámico");
                addElemento("masajeLomi", "Masaje lomi");
                break;
            case "Manicura":
                document.getElementById(`div-checkbox`).innerHTML = "";
                addElemento("manicuraBasica", "Manicura básica");
                addElemento("manicuraFrancesa", "Manicura francesa");
                addElemento("manicuraDeParafina", "Manicura de parafina");
                addElemento("manicuraAmericana", "Manicura americana");
                addElemento("manicuraDeGel", "Manicura de gel");
                addElemento("manicuraEspejo", "Manicura espejo");
                break;
            case "Faciales":
                document.getElementById(`div-checkbox`).innerHTML = "";
                addElemento("acidoHialuronico", "Ácido hialurónico");
                addElemento("ultherapy", "Ultherapy");
                addElemento("mesoterapia", "Mesoterapia");
                addElemento("micopigmanetacion", "Micopigmanetación");
                addElemento("dermoabrasion", "Dermoabrasión");
                addElemento("radiofrecuencia", "Radiofrecuencia ");
                break;
            case "Depilación":
                document.getElementById(`div-checkbox`).innerHTML = "";
                addElemento("depilacionConHilo", "Depilación con hilo");
                addElemento("depilacionElectrica", "Depilación eléctrica");
                addElemento("depilacionConAparatosMecanicos", "Depilación con aparatos mecánicos");
                addElemento("depilacionPorLaser", "Depilación por láser");
                addElemento("depilacionIPL", "Depilación IPL");
                break;
            case "Pelo":
                document.getElementById(`div-checkbox`).innerHTML = "";
                addElemento("corteDePelo", "Corte de pelo");
                addElemento("coloracion", "Coloracion");
                addElemento("alisado", "Alisado");
                addElemento("nutricion", "Nutrición");
                addElemento("peinados", "peinados");
                addElemento("masajeLomi", "Masaje lomi");
                break;
        }

    });


/* crear html para seleccion de servicios */
function addElemento(id, nombre) {

    var capa1 = document.getElementById(`div-checkbox`);
    var div = document.createElement("div");
    var label = document.createElement("label");
    capa1.appendChild(div);
    div.appendChild(label);
    label.innerHTML = `<input id="${id}" clase= "serviciosespesificos" name="${nombre}" type="checkbox" /> ${nombre}`;
}

/* AJAX Reconocer Sexo y mostrar imagen acorde */
$(document).ready(function () {

    $("#sexoH").click(function () {
        $.ajax({
            url: 'https://randomuser.me/api/?gender=male',
            dataType: 'json',
            success: function (data) {
                // console.log(data)
                data.results.forEach(element => {
                    $("#moverdiv").empty()
                    $("#moverdiv").append(`
                <div>
                <img width ="300" heigth ="300" src="${element.picture.large}" alt="">                
                </div>
                
                `)
                });
            },
            error: function (error) {
                console.log(error)
            }
        });
    });

    $("#sexoMd").click(function () {
        $.ajax({
            url: 'https://randomuser.me/api/?gender=female',
            dataType: 'json',
            success: function (data) {
                // console.log(data)
                data.results.forEach(element => {
                    $("#moverdiv").empty()
                    $("#moverdiv").append(`
                <div>
                <img width ="300" heigth ="300" src="${element.picture.large}" alt="">                
                </div>
                
                `)
                });
            },
            error: function (error) {
                console.log(error)
            }
        });
    });
});
/* Popup boton */
function popUp() {
    $(document).ready(function () {
        var serviciosSeleccionados = new Array();
        /* var serviciosSeleccionados = new Array(); */
        /* Verificar serviciosSeleccionados */
        $('input[type=checkbox]:checked').each(function () {
            serviciosSeleccionados.push($(this).attr("name"));
        });

        /* var splitSerivios = serviciosSeleccionados.split(" ").attr("name") */

        /* Verificar sexo */
        if ($("#sexoH").is(':checked')) {
            var sexo = "Hombre";
        } else {
            var sexo = "Mujer";
        }
        /* Limpiar clase */
        $(".popup").text("")
        /* Crear etiqueta    */
        var newP = $("<p>");
        /* Asignar clase */
        newP.addClass("popup");

        /* Contenido de popup */
        newP.html(`Nombre: ${$("#nombre").val()} <br />
        Correo Electrónico: ${$("#correo").val()} <br />
        Teléfono: ${$("#telefono").val()} <br />
        Fecha: ${$("#fecha").val()} <br />
        Sexo: ${sexo} <br />
        Servicios: ${serviciosSeleccionados}`);

        /* Cargar contenido en clase .modal.body */
        $(".modal-body").append(newP);


    });
}

var sexo;
var serviciosSeleccionados;
var baseDeDatos = [];
function guardado() {
    $(document).ready(function () {
        /* Funcion constructora objeto */
        function AgregarDatos(nombre, correo, tel, fech, sex, servicio) {
            this.nombre = nombre;
            this.correo = correo;
            this.tel = tel;
            this.fecha = fech;
            this.sexo = sex;
            this.servicios = servicio;
        }

        //verifica si existe la base de datos y decide si la crea o la actualiza
        if (localStorage.getItem("turno") === null) {
            var baseDeDatos = [];
            // Agrega datos actuales al array baseDeDatos
            baseDeDatos.push(new AgregarDatos($("#nombre").val(), $("#correo").val(), $("#telefono").val(), $("#fecha").val()))
            // Guarda datos actuales en LocalStorage
            localStorage.setItem(`turno`, JSON.stringify(baseDeDatos)); /* Guardar JSON */
        } else {
            //Carga la base de datos
            var guardadoLocal = JSON.parse(localStorage.getItem("turno")); /* carga JSON en variable */
            //Agrega datos actuales en LocalStorage
            guardadoLocal.push(new AgregarDatos($("#nombre").val(), $("#correo").val(), $("#telefono").val(), $("#fecha").val()))
            //Guarda datos actualizados en LocalStorage
            localStorage.setItem(`turno`, JSON.stringify(guardadoLocal)); /* Guardar JSON */
        }
    });
}



function carrito() {
    $(document).ready(function () {

        var guardadoLocal = JSON.parse(localStorage.getItem("turno"));
        var i = -1;
        $(".guardados").html("") //borrar contenido anterior

        //Recorre el array
        guardadoLocal.forEach(element => {
            i++;

            cargar(i, guardadoLocal)
        })
        // Carga al carrito
        function cargar(i, guardadoLocal) {

            var seleccionados = $("<p>"); //Asignar parrafo a variable
            seleccionados.html("") //Limpia html si es que tenia
            $(seleccionados).attr('id', `turno${i}`); //Genera id segun la posicion del array
            $(`.guardados`).append(seleccionados); //Genera el parrafo en blanco con el id del array
            
            //texto de carrito            
            seleccionados.html(`Nombre: ${guardadoLocal[i].nombre} <br />
            Correo Electrónico: ${guardadoLocal[i].correo} <br />
            Teléfono: ${guardadoLocal[i].tel} <br />
            Fecha: ${guardadoLocal[i].fecha} <br />
            Sexo: ${guardadoLocal[i].sexo} <br />
            Servicios: ${guardadoLocal[i].servicios}`); //Asignar html a variable
            
            $(`#turno${i}`).append(seleccionados);//Carga al nuevo id
        }

    });
}