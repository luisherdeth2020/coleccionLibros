class Libro {
	constructor(titulo, autor, isbn) {
		this.titulo = titulo;
		this.autor = autor;
		this.isbn = isbn;
	}
}

class UI {
	// methods
	static mostrarLibros() {
		const viewLibros = Datos.traerLibros();
		console.log(viewLibros);
		viewLibros.forEach((libros) => UI.agregarLibrosLista(libros));
	}

	static agregarLibrosLista(libro) {
		const addList = document.querySelector('#libr-list');
		const fila = document.createElement('tr');
		fila.innerHTML = `
			<td>${libro.titulo}</td>
			<td>${libro.autor}</td>
			<td>${libro.isbn}</td>
			<td><a href="#" class="btn btn-danger btn-sm delete">x</td>
		`;
		addList.appendChild(fila);
	}
	static eliminarLibro(elemento) {
		if (elemento.classList.contains('delete')) {
			elemento.parentElement.parentElement.remove();
		}
	}
	static mostrarAlerta(className) {
		const alerta = document.querySelectorAll('.form-group');
		const alerta2 = document.querySelector('.btn-block');
		const camposCompletos = document.getElementById('libro-form');
		const btnsubmit = document.querySelector('.btn');

		let focusUsed = false;
		const mensajeAlert = [];
		mensajeAlert[0] = 'Por favor ingrese el TITULO';
		mensajeAlert[1] = 'Por favor ingrese el AUTOR';
		mensajeAlert[2] = 'Por favor ingrese el ISBN';

		alerta.forEach((alertaArray, index) => {
			const div = `<div class="alert alert-${className}">${mensajeAlert[index]}</div>`;
			if (alertaArray.children[1].value === '') {
				alertaArray.innerHTML += div;
				if (!focusUsed) {
					alertaArray.children[1].focus();
					focusUsed = true;
				}
				btnsubmit.disabled = true;
			}
		});
		if (className === 'success') {
			const alertaFinal = document.createElement('div');
			alertaFinal.innerHTML += `<div class="alert alert-${className}">Libro agregado a la colección</div>`;

			camposCompletos.insertBefore(alertaFinal, alerta2);
		}
		if (className === 'warning') {
			const alertaFinal = document.createElement('div');
			alertaFinal.innerHTML += `<div class="alert alert-${className}">Este libro existe</div>`;

			camposCompletos.insertBefore(alertaFinal, alerta2);
		}

		setTimeout(() => {
			const deleteAlert = document.querySelectorAll('.alert');
			deleteAlert.forEach((classAlert) => {
				classAlert.remove();
				btnsubmit.disabled = false;
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
		/**======================
		 *    Forma OPTIMIZADA
		 *========================**/
		// return JSON.parse(localStorage.getItem('upLibro') || '[]');
		let existeLibro;
		if (localStorage.getItem('upLibro') === null) {
			existeLibro = [];
		} else {
			existeLibro = JSON.parse(localStorage.getItem('upLibro'));
		}
		return existeLibro;
	}
	// libro es el objeto
	static agregarLibro(libro) {
		const upLibro = Datos.traerLibros();

		upLibro.push(libro);
		// setItem para guardar información
		localStorage.setItem('upLibro', JSON.stringify(upLibro));
	}
	static removerLibro(isbn) {
		const removerLibro = Datos.traerLibros();
		removerLibro.forEach((libro, index) => {
			if (libro.isbn === isbn) {
				removerLibro.splice(index, 1);
			}
		});
		localStorage.setItem('upLibro', JSON.stringify(upLibro));
	}
}

/**----------------------
 *    CARGA DE LA PÁGINA
 *------------------------**/

document.addEventListener('DOMContentLoaded', UI.mostrarLibros());
// Algo como: const ui = new UI(); document.addEventListener('DOMContentLoaded', ui.mostrarLibros);

// Controlar el evento Submit
document.querySelector('#libro-form').addEventListener('submit', (e) => {
	e.preventDefault();

	// Obtener valores de los campos
	const titulo = document.querySelector('#titulo').value;
	const autor = document.querySelector('#autor').value;
	const isbn = document.querySelector('#isbn').value;

	const inputVacio = titulo === '' || autor === '' || isbn === '';
	if (inputVacio) {
		UI.mostrarAlerta('danger');
	} else {
		const buscarLibro = JSON.parse(localStorage.getItem('upLibro'));
		const existeLibro = buscarLibro?.some((item) => item.isbn === isbn);

		if (existeLibro) {
			UI.mostrarAlerta('warning');
			return;
		}

		const newLibro = new Libro(titulo, autor, isbn);
		Datos.agregarLibro(newLibro);
		UI.agregarLibrosLista(newLibro);
		UI.mostrarAlerta('success');
		UI.limpiarCampos();
	}
});

document.getElementById('libr-list').addEventListener('click', (e) => {
	console.log(e.target);
	UI.eliminarLibro(e.target);
	// elemento padre y el elemento previo el texto(<td>${libro.isbn}</td>)
	Datos.removerLibro(e.target.parentElement.previousElementSibling.textContent);
});
