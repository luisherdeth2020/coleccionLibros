class Libro {
	constructor(titulo, autor, isbn) {
		this.titulo = titulo;
		this.autor = autor;
		this.isbn = isbn;
	}
}

class UI {
	// métodos
	static mostrarLibros() {}

	static agregarLibros(libro) {}
	static eliminarLibro() {}
	static mostrarAlerta(className) {
		const alertaGroup = document.querySelectorAll('.form-group');
		const mensajeArray = [];

		mensajeArray[0] = 'Por favor ingrese TITULO todos los datos';
		mensajeArray[1] = 'Por favor ingrese AUTOR todos los datos';
		mensajeArray[2] = 'Por favor ingrese ISBN todos los datos';

		alertaGroup.forEach((arrayAlerta, index) => {
			console.log({ arrayAlerta });
			const div = `<div class="alert alert-${className}">${mensajeArray[index]}</div>`;
			if (arrayAlerta.children[1].value === '') {
				arrayAlerta.innerHTML += div;
			}
		});

		// const btnSubmit = document.querySelector('.btn');
		// btnSubmit.disabled = true;

		setTimeout(() => {
			const deleteAlert = document.querySelectorAll('.alert');
			deleteAlert.forEach((arrayDelAlert) => {
				arrayDelAlert.remove();
				// btnSubmit.disabled = false;
			});
		}, 3000);
	}
	static limpiarCampos() {}
}
class Datos {
	// métodos
	static traerLibros() {
		// consulta si hay libros
		let libros;
		// existen los libros?
		if (localStorage.getItem('libros') === null) {
			libros = [];
		} else {
			// si existe, te lo envia al otro método de abajo
			libros = JSON.parse(localStorage.getItem('libros'));
			console.log('🚀 ~ file: app.js ~ line 59 ~ Datos ~ traerLibros ~ libros', libros);
		}
		return libros;
	}
	// libro es el objeto
	static agregarLibro(libro) {
		// crear el arreglo (addLibro)
		const addLibro = Datos.traerLibros();
		addLibro.push(libro);
		// setItem = para guardar la información
		localStorage.setItem('addLibro', JSON.stringify(addLibro));
	}
	static removerLibro(isbn) {}
}
// Controlar el evento Submit
document.querySelector('#libro-form').addEventListener('submit', (e) => {
	e.preventDefault();

	const titulo = document.querySelector('#titulo').value;
	const autor = document.querySelector('#autor').value;
	const isbn = document.querySelector('#isbn').value;

	const vacio = (titulo || autor || isbn) === '';
	if (vacio) {
		UI.mostrarAlerta('danger');
	} else {
		const libro = new Libro(titulo, autor, isbn);
		Datos.agregarLibro(libro);
	}
});
