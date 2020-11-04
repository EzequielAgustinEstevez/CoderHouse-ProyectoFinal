// Capturardor de servicio select
var select = document.getElementById('servicios');
select.addEventListener('change',
    function () {
        var selectedOption = this.options[select.selectedIndex];
        // var seleccion = selectedOption.text


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
// Constructor html para seleccion de servicios
function addElemento(id, nombre) {

    var capa1 = document.getElementById(`div-checkbox`);
    var div = document.createElement("div");
    var label = document.createElement("label");
    capa1.appendChild(div);
    div.appendChild(label);
    label.innerHTML = `<input id="${id}" clase= "serviciosespesificos" name="${nombre}" type="checkbox" /> ${nombre}`;
}
// AJAX Reconocer Sexo y muestra imagen acorde
$(document).ready(function () {

    $("#sexoH").on('click touchstart', function () {
        $.ajax({
            url: 'https://randomuser.me/api/?gender=male',
            dataType: 'json',
            success: function (data) {
                data.results.forEach(element => {
                    $("#imagen").empty()
                    $("#imagen").append(`
                <div>
                <img class="mx-auto d-block" width="50%" heigth ="300" src="${element.picture.large}" alt="">                
                </div>
                
                `)
                });
            },
            error: function (error) {
                console.log(error)
            }
        });
    });

    $("#sexoMd").on('click touchend', function () {
        $.ajax({
            url: 'https://randomuser.me/api/?gender=female',
            dataType: 'json',
            success: function (data) {
                data.results.forEach(element => {
                    $("#imagen").empty()
                    $("#imagen").append(`
                <div>
                <img class="mx-auto d-block" width="50%" heigth ="300" src="${element.picture.large}" alt="">                
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
// Modal boton
function popUp() {
    $(document).ready(function () {

        /* Limpiar clase */
        $(".popup").text("")
        /* Crear etiqueta    */
        var newP = $("<p>");
        /* Asignar clase */
        newP.addClass("popup");
        /* Contenido de popup */
        newP.html(`<strong>Nombre:</strong> ${$("#nombre").val()} <br />
        <strong>Correo Electrónico:</strong> ${$("#correo").val()} <br />
        <strong>Teléfono:</strong> ${$("#telefono").val()} <br />
        <strong>Fecha:</strong> ${$("#fecha").val()} <br />
        <strong>Sexo:</strong> ${VerSexo()} <br />
        <strong>Servicios:</strong> ${ServiciosSelecionados()}`);
        /* Cargar contenido en clase .modal.body */
        $(".modal-body").append(newP);
    });
}
// Verifica que servicio fue selecionado
function ServiciosSelecionados() {
    var serviciosSeleccionados = new Array();
    $('input[type=checkbox]:checked').each(function () {
        serviciosSeleccionados.push($(this).attr("name"));
    });
    return serviciosSeleccionados;
}
// Verifica que radio buton fue selecionado
function VerSexo() {
    /* Verificar sexo */
    if ($("#sexoH").is(':checked')) {
        var sexo = "Hombre";
    } else {
        var sexo = "Mujer";
    }
    return sexo;
}
//Guarda en LocalStorge como JSON los datos del formulario
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
            baseDeDatos.push(new AgregarDatos($("#nombre").val(), $("#correo").val(), $("#telefono").val(), $("#fecha").val(), VerSexo(), ServiciosSelecionados()))
            // Guarda datos actuales en LocalStorage
            localStorage.setItem(`turno`, JSON.stringify(baseDeDatos)); /* Guardar JSON */
        } else {
            //Carga la base de datos
            var guardadoLocal = JSON.parse(localStorage.getItem("turno")); /* carga JSON en variable */
            //Agrega datos actuales en LocalStorage
            guardadoLocal.push(new AgregarDatos($("#nombre").val(), $("#correo").val(), $("#telefono").val(), $("#fecha").val(), VerSexo(), ServiciosSelecionados()))
            //Guarda datos actualizados en LocalStorage
            localStorage.setItem(`turno`, JSON.stringify(guardadoLocal)); /* Guardar JSON */
        }
        $('#myform')[0].reset(); //Borra todos los campos
        closeNav();//cierra el menú
        $("#botonCentral").prop("disabled", true);
    });
}
//Muestra desde LocalStorge los datos almacenados
function carrito() {
    $(document).ready(function () {

        var guardadoLocal = JSON.parse(localStorage.getItem("turno"));
        var i = -1;
        $(".guardados").html("") //borrar contenido anterior
        // alert(guardadoLocal.length)

        //Recorre el array
        guardadoLocal.forEach(element => {
            i++;
            cargar(i)
        })

        // Carga al carrito
        function cargar(i) {
            var seleccionados = $("<p>"); //Asignar parrafo a variable
            seleccionados.html("") //Limpia html si es que tenia
            $(seleccionados).attr('id', `turno${i}`); //Genera id segun la posicion del array
            $(`.guardados`).append(seleccionados); //Genera el parrafo en blanco con el id del array
            //texto de carrito            
            seleccionados.html(`<strong>Nombre:</strong> ${guardadoLocal[i].nombre} <br />
            <strong>Correo Electrónico:</strong> ${guardadoLocal[i].correo} <br />
            <strong>Teléfono:</strong> ${guardadoLocal[i].tel} <br />
            <strong>Fecha:</strong> ${guardadoLocal[i].fecha} <br />
            <strong>Sexo:</strong> ${guardadoLocal[i].sexo} <br />
            <strong>Servicios:</strong> ${guardadoLocal[i].servicios}`); //Asignar html a variable

            $(`#turno${i}`).append(seleccionados);//Carga al nuevo id
            // Boton eliminar turnos
            $(`.guardados`).append(`<button id="borrado${i}" type="button" class="puntitos btn btn-secondary"
            data-dismiss="modal" onclick="borrarTurno(${i})">&times; Eliminar turno</button>`);
            $(`#turno${i}`).before(`<p class="puntitos2"></p>`);
        }

    });
}
// Borra el turno seleccionado
function borrarTurno(i) {
    var guardadoLocal = JSON.parse(localStorage.getItem("turno"));
    guardadoLocal.splice(i, 1);
    localStorage.setItem(`turno`, JSON.stringify(guardadoLocal));
    if (guardadoLocal.length === 0) {
        localStorage.clear();
        $('#menu').hide();
    } else {
        carrito();
    }
}
// Detectar campos incompletos
$(document).ready(function() {
    //Al salir de un campo de texto, se chequeará esta función
    $("#myform input").keyup(function() {
        var form = $(this).parents("#myform");
        var check = checkCampos(form);
        if(check) {
            $("#botonCentral").prop("disabled", false);
        }
        else {
            $("#botonCentral").prop("disabled", true);
        }
    });
});

//Comprobar los campos de texto
function checkCampos(obj) {
    var camposRellenados = true;
    obj.find("input").each(function() {
    var $this = $(this);
        if( $this.val().length <= 0 ) {
            camposRellenados = false;
            return false;
        }
    });
    if(camposRellenados == false) {
        return false;
    }
    else {
        return true;
    }
}