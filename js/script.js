'use strict';

document.addEventListener('DOMContentLoaded', () => {
    iniciarNavegacion();
    iniciarTema();
    iniciarAnimaciones();
    iniciarFormulario();
    actualizarAnio();
});

/*
|--------------------------------------------------------------------------
| Navegación
|--------------------------------------------------------------------------
*/

function iniciarNavegacion() {
    const botonMenu = document.querySelector(
        '.boton-menu'
    );

    const enlacesNavegacion =
        document.querySelector(
            '.enlaces-navegacion'
        );

    const enlaces = document.querySelectorAll(
        '.enlace-navegacion'
    );

    const navegacion = document.querySelector(
        '.navegacion'
    );

    if (!botonMenu || !enlacesNavegacion) {
        return;
    }

    botonMenu.addEventListener(
        'click',
        () => {
            const menuAbierto =
                enlacesNavegacion.classList.toggle(
                    'abierto'
                );

            botonMenu.classList.toggle(
                'abierto',
                menuAbierto
            );

            botonMenu.setAttribute(
                'aria-expanded',
                String(menuAbierto)
            );

            botonMenu.setAttribute(
                'aria-label',
                menuAbierto
                    ? 'Cerrar menú de navegación'
                    : 'Abrir menú de navegación'
            );
        }
    );

    enlaces.forEach((enlace) => {
        enlace.addEventListener(
            'click',
            (evento) => {
                const destino =
                    enlace.getAttribute('href');

                if (
                    !destino ||
                    !destino.startsWith('#')
                ) {
                    return;
                }

                evento.preventDefault();

                const seccion =
                    document.querySelector(destino);

                if (seccion) {
                    const movimientoReducido =
                        window.matchMedia(
                            '(prefers-reduced-motion: reduce)'
                        ).matches;

                    seccion.scrollIntoView({
                        behavior: movimientoReducido
                            ? 'auto'
                            : 'smooth',
                        block: 'start'
                    });
                }

                cerrarMenu(
                    botonMenu,
                    enlacesNavegacion
                );
            }
        );
    });

    window.addEventListener(
        'resize',
        () => {
            if (window.innerWidth > 850) {
                cerrarMenu(
                    botonMenu,
                    enlacesNavegacion
                );
            }
        }
    );

    window.addEventListener(
        'scroll',
        () => {
            if (!navegacion) {
                return;
            }

            navegacion.classList.toggle(
                'desplazado',
                window.scrollY > 30
            );

            actualizarEnlaceActivo();
        },
        { passive: true }
    );

    actualizarEnlaceActivo();
}

function cerrarMenu(
    botonMenu,
    enlacesNavegacion
) {
    // enlacesNavegacion.classList.remove(
    //     'abierto'
    // );
    enlacesNavegacion.classList.toggle(
        'abierto'
    );

    botonMenu.classList.remove(
        'abierto'
    );

    botonMenu.setAttribute(
        'aria-expanded',
        'false'
    );

    botonMenu.setAttribute(
        'aria-label',
        'Abrir menú de navegación'
    );
}

function actualizarEnlaceActivo() {
    const secciones = [
        ...document.querySelectorAll(
            'main section[id]'
        )
    ];

    const enlaces = [
        ...document.querySelectorAll(
            '.enlace-navegacion'
        )
    ];

    if (
        secciones.length === 0 ||
        enlaces.length === 0
    ) {
        return;
    }

    let seccionActual = 'inicio';

    secciones.forEach((seccion) => {
        const posicion =
            seccion.getBoundingClientRect().top;

        if (posicion <= 180) {
            seccionActual = seccion.id;
        }
    });

    enlaces.forEach((enlace) => {
        const destino =
            enlace.getAttribute('href');

        enlace.classList.toggle(
            'activo',
            destino === `#${seccionActual}`
        );
    });
}

/*
|--------------------------------------------------------------------------
| Tema claro y oscuro
|--------------------------------------------------------------------------
*/

function iniciarTema() {
    const botonTema = document.querySelector(
        '#boton-tema'
    );

    if (!botonTema) {
        return;
    }

    const temaGuardado =
        localStorage.getItem('tema-linodev');

    if (temaGuardado === 'oscuro') {
        aplicarTema(
            'oscuro',
            botonTema
        );
    } else {
        aplicarTema(
            'claro',
            botonTema
        );
    }

    botonTema.addEventListener(
        'click',
        () => {
            const temaOscuro =
                document.body.classList.contains(
                    'dark'
                );

            aplicarTema(
                temaOscuro
                    ? 'claro'
                    : 'oscuro',
                botonTema
            );
        }
    );
}

function aplicarTema(
    tema,
    botonTema
) {
    const temaOscuro = tema === 'oscuro';

    document.body.classList.toggle(
        'dark',
        temaOscuro
    );

    localStorage.setItem(
        'tema-linodev',
        tema
    );

    botonTema.setAttribute(
        'aria-pressed',
        String(temaOscuro)
    );

    botonTema.setAttribute(
        'aria-label',
        temaOscuro
            ? 'Cambiar a tema claro'
            : 'Cambiar a tema oscuro'
    );

    const icono =
        botonTema.querySelector('i');

    if (!icono) {
        return;
    }

    icono.classList.toggle(
        'fa-moon',
        !temaOscuro
    );

    icono.classList.toggle(
        'fa-sun',
        temaOscuro
    );
}

/*
|--------------------------------------------------------------------------
| Animaciones de entrada
|--------------------------------------------------------------------------
*/

function iniciarAnimaciones() {
    const elementos = [
        ...document.querySelectorAll(
            '.seccion, .tarjeta-especialidad, .tarjeta-proyecto, .tarjeta-servicio, .item-beneficio, .paso-proceso'
        )
    ];

    if (elementos.length === 0) {
        return;
    }

    const movimientoReducido =
        window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

    if (movimientoReducido) {
        elementos.forEach((elemento) => {
            elemento.classList.add(
                'visible'
            );
        });

        return;
    }

    elementos.forEach((elemento) => {
        elemento.classList.add(
            'animar-entrada'
        );
    });

    const observador =
        new IntersectionObserver(
            (entradas, observer) => {
                entradas.forEach((entrada) => {
                    if (
                        !entrada.isIntersecting
                    ) {
                        return;
                    }

                    entrada.target.classList.add(
                        'visible'
                    );

                    observer.unobserve(
                        entrada.target
                    );
                });
            },
            {
                threshold: 0.12,
                rootMargin: '0px 0px -40px 0px'
            }
        );

    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });
}

/*
|--------------------------------------------------------------------------
| Formulario de contacto
|--------------------------------------------------------------------------
*/

function iniciarFormulario() {
    const formulario = document.querySelector(
        '#formulario-contacto'
    );

    const estadoFormulario =
        document.querySelector(
            '#estado-formulario'
        );

    if (!formulario || !estadoFormulario) {
        return;
    }

    formulario.addEventListener(
        'submit',
        (evento) => {
            evento.preventDefault();

            if (!formulario.checkValidity()) {
                formulario.reportValidity();

                estadoFormulario.textContent =
                    'Revisa los campos antes de continuar.';

                estadoFormulario.className =
                    'estado-formulario error';

                return;
            }

            const nombre =
                document.querySelector('#nombre')
                    ?.value.trim();

            const celular =
                document.querySelector('#celular')
                    ?.value.trim();

            const asunto =
                document.querySelector('#asunto')
                    ?.value.trim();

            const mensaje =
                document.querySelector('#mensaje')
                    ?.value.trim();

            const celularValido =
                /^[0-9+\s()-]{7,20}$/.test(
                    celular
                );

            if (!celularValido) {
                estadoFormulario.textContent =
                    'Escribe un número de celular válido.';

                estadoFormulario.className =
                    'estado-formulario error';

                return;
            }

            const numeroWhatsApp =
                '51927291508';

            const texto =
                `Hola, soy ${nombre}.%0A%0A` +
                `Mi celular: ${celular}%0A` +
                `Asunto: ${asunto}%0A%0A` +
                `Mensaje:%0A${mensaje}`;

            const enlaceWhatsApp =
                `https://wa.me/${numeroWhatsApp}?text=${texto}`;

            estadoFormulario.textContent =
                'Abriendo WhatsApp...';

            estadoFormulario.className =
                'estado-formulario exito';

            window.open(
                enlaceWhatsApp,
                '_blank',
                'noopener,noreferrer'
            );

            formulario.reset();
        }
    );
}

// =====================================================
// Botón "Ver más proyectos"
// =====================================================

const botonVerProyectos = document.getElementById('boton-ver-proyectos');
const rejillaProyectos = document.getElementById('rejilla-proyectos');

if (botonVerProyectos && rejillaProyectos) {
    botonVerProyectos.addEventListener('click', () => {
        const estaAbierto = rejillaProyectos.classList.toggle('mostrar-todos');

        botonVerProyectos.classList.toggle('esta-abierto', estaAbierto);
        botonVerProyectos.setAttribute('aria-expanded', String(estaAbierto));

        botonVerProyectos.innerHTML = estaAbierto
            ? 'Ver menos proyectos <i class="fa-solid fa-chevron-up" aria-hidden="true"></i>'
            : 'Ver más proyectos <i class="fa-solid fa-chevron-down" aria-hidden="true"></i>';

        if (!estaAbierto) {
            document.getElementById('proyectos')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

/*
|--------------------------------------------------------------------------
| Año automático
|--------------------------------------------------------------------------
*/

function actualizarAnio() {
    const elementoAnio =
        document.querySelector(
            '#anio-actual'
        );

    if (!elementoAnio) {
        return;
    }

    elementoAnio.textContent =
        new Date().getFullYear();
}