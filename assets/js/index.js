//Arreglo de objetos con 3 tareas iniciales.
const arreglo_tareas = [
    {
      'id': 1,
      'descripcion': 'Realizar Guias Ejercicios JavaScript',
      'completado': false
    },
    {
      'id': 2,
      'descripcion': 'Repasar Toda La Materia Referente A Modulo JavaScript',
      'completado': false
    },
    {
      'id': 3,
      'descripcion': 'Practicar Ejercicios Programacion JavaScript',
      'completado': false
    }
];

//Variables para seleccionar input, Contenedor estado de tareas
let id = 3;
let input_tarea = document.querySelector('#tarea');
let contenedor_status = document.querySelector('#status');

window.onload = () => {
actualizar_listado_tareas(arreglo_tareas);
actualizarStatus();
}

document.querySelector('#guardar').addEventListener('click', () => {
crearTarea();
});

//Funcion para ingresar tareas desde el input.
function crearTarea() {
if (input_tarea.value != '') {
let texto_tarea = input_tarea.value;
let objeto_tarea = {
    'id': ++id,
    'descripcion': texto_tarea,
    'completado': false

};
arreglo_tareas.push(objeto_tarea);
actualizar_listado_tareas(arreglo_tareas);
actualizarStatus();
} else {
alert('Por favor ingrese una tarea');
input_tarea.focus();
}
}

//Funcion para actualizar listado de tarea al ingresar nueva tarea en input.
function actualizar_listado_tareas(arreglo_tareas) {
let html = '';
for (tarea of arreglo_tareas) {
html += `<tr>
<td>${tarea.id}</td>
<td>${tarea.descripcion}</td>
<td>
`;
if (tarea.completado == true) {
html += `<input type="checkbox" id="estado_tarea_${tarea.id}" name="estado_tarea" value="${tarea.id}" onclick="cambiarEstado(${tarea.id});" checked>`;
} else {
html += `<input type="checkbox" id="estado_tarea_${tarea.id}" name="estado_tarea" value="${tarea.id}" onclick="cambiarEstado(${tarea.id});">`;
}
html += `</td>
<td>
<a href="#" onclick="eliminarTarea(${tarea.id});">Eliminar</a>
</td>
`;
}
document.querySelector('#listado_tareas').innerHTML = html;
}

//Funcion para cambiar estado de tareas, el total.
function cambiarEstado(id_tarea) {
let indice = arreglo_tareas.findIndex((tarea) => tarea.id == id_tarea);
if (arreglo_tareas[indice].completado == false) {
arreglo_tareas[indice].completado = true;
} else {
arreglo_tareas[indice].completado = false;
}
actualizarStatus();
}

//Funcion para eliminar tareas seleccionadas.

function eliminarTarea(id_tarea) {
let indice = arreglo_tareas.findIndex((tarea) => tarea.id == id_tarea);
arreglo_tareas.splice(indice, 1);
actualizar_listado_tareas(arreglo_tareas);
actualizarStatus();
}

//Funcion que actualiza estado de tareas completadas.
function actualizarStatus() {
let total_tareas = arreglo_tareas.length;
let arreglo_tareas_completadas = arreglo_tareas.filter((tarea) => tarea.completado == true);
let total_tareas_completadas = arreglo_tareas_completadas.length;
contenedor_status.innerHTML = `
              <p>Total: ${total_tareas}</p>
              <p>Realizadas: ${total_tareas_completadas}</p>
`;
}