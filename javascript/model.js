class Model {
    constructor (config) {

        //ACÁ VAN LOS ARCHIVOS DE IMAGEN
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //CONFIGURACIÓN DE ANIMACIONES Y FRAMES
        this.animaciones = config.animaciones || {
            paradoIzquierda: [
                [0,0]
            ]
        }
        this.animacionActual = config.animacionActual || "paradoIzquierda";
        this.frameActual = 0;

        this.objeto = config.objeto;
    }
    draw(ctx) {
        const x = this.objeto.x * 16 - 8;
        const y = this.objeto.y * 16 - 18;

        this.isLoaded && ctx.drawImage(this.image,
            0, 0, 0, 0,
            x, 
            y,
            400, 
            400)
    }
}