const socket = io();
const agregarAlumnos = document.querySelector('#agregarAlumno');

agregarAlumnos.addEventListener('submit', (e) => {
	e.preventDefault();

	const alumno = {
		nombre: document.querySelector('#nombre').value,
		edad: document.querySelector('#edad').value
	}

	socket.emit('agregarAlumno', alumno);
});

async function render(alumnos){
	const template = await fetch('/plantilla/alumnos.hbs');
	const textTemplate = await template.text();
	const functionTemplate = Handlebars.compile(textTemplate);
	const html = functionTemplate({ alumnos });

	document.querySelector('#alumnos').innerHTML = html;
}

socket.on('alumnos', data => render(data));