class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage, 
            utils.withGrid(30) - cameraPerson.x, 
            utils.withGrid(12) - cameraPerson.y, 1600, 1000)
    }
}

window.OverworldMaps = {
    Placeholder: {
        lowerSrc: "./imagenes/placeholder.png",
        gameObjects: {
            nina: new Player({
                x: utils.withGrid(50),
                y: utils.withGrid(15),
            }),
            dieter: new GameObject({
                x: utils.withGrid(60),
                y: utils.withGrid(15),
                src: "./imagenes/dieterModel.png"
            }),
            gino: new GameObject({
                x: utils.withGrid(25),
                y: utils.withGrid(35),
                src: "./imagenes/ginoModel.png"
            }),
            roman: new GameObject({
                x: utils.withGrid(70),
                y: utils.withGrid(25),
                src: "./imagenes/romanModel.png"
            }),
            jacques: new GameObject({
                x: utils.withGrid(35),
                y: utils.withGrid(20),
                src: "./imagenes/jacquesModel.png"
            }),
            maggie: new GameObject({
                x: utils.withGrid(15),
                y: utils.withGrid(24),
                src: "./imagenes/maggieModel.png"
            }),
            keiji: new GameObject({
                x: utils.withGrid(0),
                y: utils.withGrid(30),
                src: "./imagenes/keijiModel.png"
            }),
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