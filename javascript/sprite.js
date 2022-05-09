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
            "idle-left": [ [0,0] ],
            "walk-left": [ [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0] ],
            "idle-right": [ [0,1] ],
            "walk-right": [ [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1], [8,1] ],
            "idle-up": [ [0,0] ],
            "walk-up": [ [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0] ],
            "idle-down": [ [0,0] ],
            "walk-down": [ [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0], [8,0] ],
        }
        this.currentAnimation = config.currentAnimation || "idle-left";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 7.5;
        this.animationFrameProgress = this.animationFrameLimit;

        this.gameObject = config.gameObject;
    }

    get frame() {
        return this.animations[this.currentAnimation] [this.currentAnimationFrame]
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;   
        }
    }

    updateAnimationProgress() {
        if (this.animationFrameProgress > 0) {
            this.animationFrameProgress -= 1;
            return;
        }
        //RESET.
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if (this.frame === undefined) {
            this.currentAnimationFrame = 0;
        }
    }

    draw(ctx, cameraPerson) {
        const x = this.gameObject.x + utils.withGrid(30) - cameraPerson.x;
        const y = this.gameObject.y + utils.withGrid(12) - cameraPerson.y;

        const [frameX, frameY] = this.frame;

        this.isLoaded && ctx.drawImage(this.image,
            frameX * 1000, frameY * 1000,
            1000, 1000,
            x, 
            y,
            400, 
            400)

            this.updateAnimationProgress();
    }
}