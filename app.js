const titulo = document.querySelector('#titulo');
const autor = document.querySelector('#autor');
const isbn = document.querySelector('#isbn');
// const vacio = titulo || autor || isbn === '';

class Libro {
	constructor(titulo, autor, isbn) {
		this.titulo = title;
		this.autor = author;
		this.isbn = ibn;
	}
}

class UI {
	// métodos
	static mostrarLibros() {}

	static agregarLibros(libro) {}
	static eliminarLibro() {}
	static mostrarAlerta(mensaje, className) {
		const alertaGroup = document.querySelectorAll('.form-group');

		alertaGroup.forEach((arrayAlerta) => {
			const div = document.createElement('div');
			div.className = `alert alert-${className}`;
			div.appendChild(document.createTextNode(mensaje));

			if (titulo.value === '') {
				arrayAlerta.appendChild(div);
			}
			if (autor.value === '') {
				arrayAlerta.appendChild(div);
			}
			if (isbn.value === '') {
				arrayAlerta.appendChild(div);
			}
		});
		
		setTimeout(() => {
			const deleteAlert = document.querySelectorAll('.alert');
			deleteAlert.forEach((arrayDelAlert) => {
				arrayDelAlert.remove();
			});
		}, 3000);
	}
	static limpiarCampos() {}
}
class Datos {
	// métodos
	static traerLibros() {
		// consulta si hay libros
	}
	// libro es el objeto
	static agregarLibro(libro) {}
	static removerLibro(isbn) {}
}
// Controlar el evento Submit
document.querySelector('#libro-form').addEventListener('submit', (e) => {
	e.preventDefault();

	// Obtener valores de los campos
	// const titulo = document.querySelector('#titulo').value;
	// const autor = document.querySelector('#autor').value;
	// const isbn = document.querySelector('#isbn').value;

	// const vacio = titulo || autor || isbn === '';
	console.log(titulo.value);
	console.log(autor.value);
	console.log(isbn.value);
	if (titulo.value === '') {
		UI.mostrarAlerta('Por favor ingrese TITULO todos los datos', 'danger');
		return;
	}
	if (autor.value === '') {
		UI.mostrarAlerta('Por favor ingrese AUTOR todos los datos', 'danger');
		return;
	}
	if (isbn.value === '') {
		UI.mostrarAlerta('Por favor ingrese ISBN todos los datos', 'danger');
		return;
	}
});
