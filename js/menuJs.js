function openNav() {
    document.getElementById("menu").style.width = "auto";//establece un ancho automatico del menu
    //Pregunta si existe la base de datos
    if (localStorage.getItem("turno") === null) {
        $('#menu').hide(); //esconde el menu si no esta la base de datos
        $('#alerta').remove();//remueve la alerta anterior si es que hay
        $(`body`).before(`
        <div id="alerta" class="text-center alert alert-warning" role="alert">
        Aun no realizó una <strong>reserva</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
        </div>`);//crea alerta        
        ocultarAlerta()// oculta la alerta despacio
    } else {
        $('#menu').show();//si hay base de datos muestra el menu
    }
}

// oculta la alerta animacion
function ocultarAlerta() {
    $(document).ready(function () {
        $(".alert").fadeTo(3000, 50).slideUp(1000, function () {
            $(this).remove();
        });
    });
}
// Cierra el navegador
function closeNav() {
    document.getElementById("menu").style.width = "0";
}

