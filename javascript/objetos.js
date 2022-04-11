class Objeto {
    constructor (config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.model = new Model({
            objeto: this,
            src: config.src || "/imagenes/ninaModel.png",
        });
    }
}