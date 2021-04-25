class Libro {
	constructor(titulo, autor, isbn) {
		this.titulo = titulo;
		this.autor = autor;
		this.isbn = isbn;
	}
}

class UI {
	// methods
	static mostrarLibros() {}

	static agregarLibros(libro) {}
	static eliminarLibro() {}
	static mostrarAlerta(className) {
		// const div = document.createElement('div');
		// div.className = `alert alert-${className}`;
		// div.appendChild(document.createTextNode(mensaje));

		// const container = document.querySelector(".container");
		// const form = document.querySelector("#libro-form");
		const alerta = document.querySelectorAll('.form-group');
		const btnsubmit = document.querySelector('.btn');
		// var alerta2 = document.querySelectorAll(".alertasOn");
		// console.log(alerta2.parentNode);
		// var main = itemList.parentNode;
		// form.insertBefore(div, alerta);
		const mensajeAlert = [];
		mensajeAlert[0] = 'Por favor ingrese el TITULO';
		mensajeAlert[1] = 'Por favor ingrese el AUTOR';
		mensajeAlert[2] = 'Por favor ingrese el ISBN';

		alerta.forEach((alertaArray, index) => {
			const div = `<div class="alert alert-${className}">${mensajeAlert[index]}</div>`;
			if (alertaArray.children[1].value === '') {
				alertaArray.innerHTML += div;
				// btnsubmit.disabled = true;
			}
		});

		// setTimeout(() => document.querySelector('.alert').remove(), 3000);
		setTimeout(() => {
			const deleteAlert = document.querySelectorAll('.alert');
			deleteAlert.forEach((classAlert) => {
				classAlert.remove();
				// btnsubmit.disabled = false;
			});
		}, 3000);
	}
	static limpiarCampos() {
		document.querySelector('#titulo').value = '';
		document.querySelector('#autor').value = '';
		document.querySelector('#isbn').value = '';
	}
}
class Datos {
	// métodos
	static traerLibros() {
		// consulta si hay libros y los parsea, si no, parcea un arreglo vacio, y les retorna segun sea
		return JSON.parse(localStorage.getItem('libros') || '[]');
	}
	// libro es el objeto
	static agregarLibro(libro) {
		// cargamos el arreglo para manejarlo
		let libros = Datos.traerLibros();
		// agregamos el libro
		libros.push(libro);
		// setItem para guardar información en el mismo item en el que hacemos get
		localStorage.setItem('libros', JSON.stringify(libros));
	}
	static removerLibro(isbn) {
		// esto de aqui es solo una idea, filtramos para que nos de todos los libros menos el del parametro
		const libros = Datos.traerLibros().filter((libro) => { libro != isbn });
		// guardamos
		localStorage.setItem('libros', JSON.stringify(libros));
	}
}
// Controlar el evento Submit
document.querySelector('#libro-form').addEventListener('submit', (e) => {
	e.preventDefault();

	// Obtener valores de los campos
	const titulo = document.querySelector('#titulo').value;
	const autor = document.querySelector('#autor').value;
	const isbn = document.querySelector('#isbn').value;

	const inputVacio = (titulo || autor || isbn) === '';
	if (inputVacio) {
		UI.mostrarAlerta('danger');
	} else {
		const newLibro = new Libro(titulo, autor, isbn);
		Datos.agregarLibro(newLibro);
		UI.limpiarCampos();
	}
});
