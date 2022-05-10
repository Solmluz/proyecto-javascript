//CLASE PARA LOS DIÁLOGOS.
class TextMessage {
    constructor({text, onComplete}){
        this.text = text;
        this.onComplete = onComplete;
        this.element = null;
    }

    //CREA DIVS CADA VEZ QUE SE HABLE CON ALGUIEN.
    createElement () {
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
        <p class="TextMessage_p">${this.text}</p>
        <button class="TextMessage_button">Ok</button>
        `)

        this.element.querySelector("button").addEventListener("click", () => {
            //CERRAR VENTANA DE DIÁLOGO CON UN BOTÓN.
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter", () => {
            this.actionListener.unbind();
            //CERRAR VENTANA DE DIÁLOGO CON ENTER.
            this.done();
          })

    }

    //ELIMINA EL DIV AL CERRAR LA VENTANA DE DIÁLOGO.
    done(){
        this.element.remove();
        this.onComplete();
    }

    //INICIA EL PROCEDIMIENTO ANTERIOR LISTADO.
    init(container) {
        this.createElement();
        container.appendChild(this.element)
    }
}