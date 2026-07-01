document.addEventListener('DOMContentLoaded', function () {

    const botonesUnirse = document.querySelectorAll('.btn-unirse');
    botonesUnirse.forEach(boton => {
        boton.addEventListener('click', function () {
            if (this.classList.contains('btn-success')) {
                this.textContent = 'Unirse al Club';
                this.style.backgroundColor = '#00AFB9';
                this.classList.remove('btn-success');
            } else {
                this.textContent = '¡Te uniste! ✓';
                this.classList.add('btn-success');
            }
        });
    });

    const formDonacion = document.getElementById('formDonacion');
    const btnAgregarOtro = document.getElementById('btnAgregarOtro');

    if (formDonacion) {
        formDonacion.addEventListener('submit', function (evento) {
            evento.preventDefault();

            const titulo = document.getElementById('tituloLibro').value;
            const tipo = document.getElementById('tipoLibro').value;

            if (titulo.length < 3) {
                alert('Por favor, ingresá un título válido (mínimo 3 caracteres).');
                return;
            }
            if (!tipo) {
                alert('Por favor, seleccioná una categoría de libro.');
                return;
            }

            console.log('Procesando donación:', titulo);
            alert(`¡Gracias! La solicitud para "${titulo}" fue registrada. Te contactaremos pronto.`);
            
            formDonacion.reset();
        });
    }

    if (btnAgregarOtro) {
        btnAgregarOtro.addEventListener('click', () => {
            if (confirm("¿Querés limpiar los campos para cargar un nuevo libro?")) {
                formDonacion.reset();
                document.getElementById('tituloLibro').focus();
            }
        });
    }

    const btnFiltrar = document.getElementById("btnAplicarFiltros");
    const clubes = document.querySelectorAll(".tarjeta-club-item");
    const alertaNoResultados = document.getElementById("alertaNoResultados");

    if (btnFiltrar) {
        btnFiltrar.addEventListener("click", function () {
            const filtros = {
                idioma: document.getElementById("selectIdioma").value,
                categoria: document.getElementById("selectCategoria").value,
                tipo: document.getElementById("selectTipo").value,
                modalidad: document.getElementById("selectModalidad").value,
                edad: document.getElementById("selectEdad").value
            };

            let contadorVisibles = 0;
            clubes.forEach(club => {
                const match = 
                    (filtros.idioma === "todos" || club.dataset.idioma === filtros.idioma) &&
                    (filtros.categoria === "todos" || club.dataset.categoria === filtros.categoria) &&
                    (filtros.tipo === "todos" || club.dataset.tipo === filtros.tipo) &&
                    (filtros.modalidad === "todos" || club.dataset.modalidad === filtros.modalidad) &&
                    (filtros.edad === "todos" || club.dataset.edad === filtros.edad);

                club.classList.toggle("d-none", !match);
                if (match) contadorVisibles++;
            });

            alertaNoResultados.classList.toggle("d-none", contadorVisibles > 0);
        });
    }
});