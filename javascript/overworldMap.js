class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.cutsceneSpaces = config.cutsceneSpaces || {};
        this.walls = config.walls || {};

        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;

        this.isCutscenePlaying = false;
    }

    drawLowerImage(ctx, cameraPerson) {
        ctx.drawImage(
            this.lowerImage, 
            utils.withGrid(30) - cameraPerson.x, 
            utils.withGrid(12) - cameraPerson.y,)
    }
    

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction);
        return this.walls[`${x},${y}`] || false;
      }
    
      mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
    
          let object = this.gameObjects[key];
          object.id = key;
    
          object.mount(this);
    
        })
      }
    
      async startCutscene(events) {
        this.isCutscenePlaying = true;
    
        for (let i=0; i<events.length; i++) {
          const eventHandler = new OverworldEvent({
            event: events[i],
            map: this,
          })
          await eventHandler.init();
        }
    
        this.isCutscenePlaying = false;

        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))
      }

      checkForActionCutscene() {
          const nina = this.gameObjects["nina"];
          const nextCoords = utils.nextPosition(nina.x, nina.y, nina.direction);
          const match = Object.values(this.gameObjects).find(object => {
            return `${object.x},${object.y}` === `${nextCoords.x}, ${nextCoords.x}`
          });
          console.log({match});
          if (!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
          }
      }

      checkForFootstepCutscene() {
        const nina = this.gameObjects["nina"];
        const match = this.cutsceneSpaces[`${nina.x},${nina.y}`];
        if (!this.isCutscenePlaying && match) {
          this.startCutscene(match[0].events)
        }
      }
    
      addWall(x,y) {
        this.walls[`${x},${y}`] = true;
      }
      removeWall(x,y) {
        delete this.walls[`${x},${y}`]
      }
      moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
      }
    
    }    

window.OverworldMaps = {
    Placeholder: {
        lowerSrc: "./imagenes/base.png",
        gameObjects: {
            nina: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(65),
                y: utils.withGrid(25),
            }),
            jacques: new Person({
                x: utils.withGrid(35),
                y: utils.withGrid(21),
                src: "./imagenes/jacquesModel.png"
            }),
            maggie: new Person({
                x: utils.withGrid(15),
                y: utils.withGrid(24),
                src: "./imagenes/maggieModel.png"
            }),
            keiji: new Person({
                x: utils.withGrid(1),
                y: utils.withGrid(35),
                src: "./imagenes/keijiModel.png"
            }),
        }
    },
    Placeholder2: {
        lowerSrc: "./imagenes/base2.png",
        gameObjects: {
            nina: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(10),
                y: utils.withGrid(25),
            }),
            dieter: new Person({
                x: utils.withGrid(50),
                y: utils.withGrid(22),
                src: "./imagenes/dieterModel.png"
            }),
            gino: new Person({
                x: utils.withGrid(25),
                y: utils.withGrid(35),
                src: "./imagenes/ginoModel.png",
                talking: [
                  {
                    events: [
                      {type: "textMessage", text: "FUNCIONA.", facePlayer: "gino"},
                      {type: "textMessage", text: "Felicidades."},
                    ]
                  }
                ]
            }),
            roman: new Person({
                x: utils.withGrid(75),
                y: utils.withGrid(35),
                src: "./imagenes/romanModel.png"
            }),
        },
        walls: {
            [utils.asGridCoord(65,21)] : true,
            [utils.asGridCoord(64,21)] : true,
            [utils.asGridCoord(63,21)] : true,
            [utils.asGridCoord(62,21)] : true,
            [utils.asGridCoord(61,21)] : true,
            [utils.asGridCoord(60,21)] : true,
            [utils.asGridCoord(59,21)] : true,
            [utils.asGridCoord(58,21)] : true,
            [utils.asGridCoord(57,21)] : true,
          }
    },
    cutsceneSpaces: {
      [utils.asGridCoord(5,25)]: [
        {
          events: [
            {type: "changeMap", map: "Placeholder"}
          ]
        }
      ]
    }
}
