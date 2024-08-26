const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            textoNuevaFrase: '', // Campo para añadir el texto de una nueva frase
            autorNuevaFrase: '', // Campo para añadir el nombre del autor de la frase
            fraseEditada: { texto: '', autor: '' }, // Objeto para la edición de una frase
            indiceFraseEditada: null, // Índice de la frase que se está editando
            indiceFraseEliminar: null, // Índice de la frase a eliminar
            mensajeAlerta: '', // Mensaje para mostrar en el modal de alerta
            frases: [ // Lista inicial de frases
                {
                    texto: '"El software es una gran combinación entre arte e ingeniería."',
                    autor: "Bill Gates"
                },
                {
                    texto: '"Primero, resuelve el problema. Luego, escribe el código."',
                    autor: 'John Johnson'
                },
                {
                    texto: '"La simplicidad es la máxima sofisticación."',
                    autor: 'Leonardo da Vinci'
                },
                {
                    texto: '"El código nunca es terminado, solo abandonado."',
                    autor: 'Paul Graham'
                },
                {
                    texto: '"La experiencia es el nombre que todos dan a sus errores."',
                    autor: 'Oscar Wilde'
                }
            ]
        };
    },
    computed: {
        // Propiedad computada para contar el número de frases
        conteoDeFrases() {
            return this.frases.length; // Número de frases
        }
    },
    methods: {
        agregarFrase() {
            // Verificar si los campos de entrada están vacíos
            if (this.textoNuevaFrase.trim() === '' || this.autorNuevaFrase.trim() === '') {
                this.mostrarAlerta('Por favor, completa ambos campos antes de añadir una nueva frase.');
                return;
            }

            // Añadir la nueva frase al array
            this.frases.unshift({
                texto: this.textoNuevaFrase,
                autor: this.autorNuevaFrase
            });

            // Limpiar los campos de entrada después de añadir la frase
            this.textoNuevaFrase = '';
            this.autorNuevaFrase = '';
        },
        mostrarAlerta(mensaje) {
            this.mensajeAlerta = mensaje;
            $('#alertaModal').modal('show'); // Mostrar el modal de alerta usando jQuery
        },
        abrirModalEdicion(indice) {
            this.indiceFraseEditada = indice;
            this.fraseEditada = { ...this.frases[indice] };
            $('#modalEditar').modal('show');
        },
        guardarEdicion() {
            if (this.indiceFraseEditada !== null) {
                this.frases[this.indiceFraseEditada] = { ...this.fraseEditada };
                $('#modalEditar').modal('hide');
            }
        },
        eliminarFrase(indice) {
            this.indiceFraseEliminar = indice;
            $('#confirmarEliminarModal').modal('show'); // Mostrar el modal de confirmación de eliminación
        },
        confirmarEliminar() {
            if (this.indiceFraseEliminar !== null) {
                this.frases.splice(this.indiceFraseEliminar, 1);
                this.indiceFraseEliminar = null;
                $('#confirmarEliminarModal').modal('hide'); // Cerrar el modal de confirmación de eliminación
            }
        }
    }
});

app.mount('#app');