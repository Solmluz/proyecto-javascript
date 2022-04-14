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
            nina: new Player({
                x: utils.withGrid(50),
                y: utils.withGrid(6),
            })
        }
    },
    Placeholder2: {
        lowerSrc: "./imagenes/fondoPlaceholder2.png",
        gameObjects: {
            nina: new Player({
                x:50,
                y:10,
            })
        }
    },
}