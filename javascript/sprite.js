class Sprite {
    constructor (config) {

        //ACÁ VAN LOS ARCHIVOS DE IMAGEN
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //CONFIGURACIÓN DE ANIMACIONES Y FRAMES
        this.animations = config.animations || {
            idleLeft: [
                [0,0]
            ]
        }
        this.currentAnimation = config.currentAnimation || "idleLeft";
        this.currentAnimationFrame = 0;

        this.gameObject = config.gameObject;
    }
    draw(ctx) {
        const x = this.gameObject.x * 16 - 8;
        const y = this.gameObject.y * 16 - 18;

        this.isLoaded && ctx.drawImage(this.image,
            0, 0,
            1000, 1000,
            x, 
            y,
            400, 
            400)
    }
}