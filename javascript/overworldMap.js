class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, -100, 1600, 1000)
    }
}

window.OverworldMaps = {
    Placeholder: {
        lowerSrc: "./imagenes/fondoPlaceholder.png",
        gameObjects: {
            nina: new GameObject({
                x:5,
                y:6,
            })
        }
    },
    Placeholder2: {
        lowerSrc: "./imagenes/fondoPlaceholder2.png",
        gameObjects: {
            nina: new GameObject({
                x:50,
                y:10,
            })
        }
    },
}