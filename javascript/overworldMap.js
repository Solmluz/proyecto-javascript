class OverworldMap {
  constructor(config) {
      this.gameObjects = config.gameObjects;
      this.cutsceneSpaces = config.cutsceneSpaces || {};
      this.walls = config.walls || {};

      this.bgImage = new Image();
      this.bgImage.src = config.bgSrc;

      this.isCutscenePlaying = false;
  }

  drawBgImage(ctx, cameraPerson) {
      ctx.drawImage(
          this.bgImage, 
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
  Biblioteca: {
      bgSrc: "./imagenes/base.png",
      gameObjects: {
          nina: new Person({
              isPlayerControlled: true,
              x: utils.withGrid(70),
              y: utils.withGrid(25),
          }),
          jacques: new Person({
              x: utils.withGrid(35),
              y: utils.withGrid(21),
              src: "./imagenes/jacquesSprite.png",
              talking: [
                {
                  events: [
                    {type: "textMessage", text: "Ahora mismo no tengo más trabajos para ti.", facePlayer: "jacques"},
                    {type: "textMessage", text: "Vuelve luego."},
                  ]
                }
              ]
          }),
          maggie: new Person({
              x: utils.withGrid(15),
              y: utils.withGrid(24),
              src: "./imagenes/maggieSprite.png",
              talking: [
                {
                  events: [
                    {type: "textMessage", text: "...", facePlayer: "maggie"},
                  ]
                }
              ]
          }),
          keiji: new Person({
              x: utils.withGrid(1),
              y: utils.withGrid(35),
              src: "./imagenes/keijiSprite.png",
              talking: [
                {
                  events: [
                    {type: "textMessage", text: "No puedo hablar ahora, estoy ocupado."},
                  ]
                }
              ]
          }),
      },
      walls: {
        [utils.asGridCoord(64,20)] : true,
        [utils.asGridCoord(63,20)] : true,
        [utils.asGridCoord(62,20)] : true,
        [utils.asGridCoord(61,20)] : true,
        [utils.asGridCoord(60,20)] : true,
        [utils.asGridCoord(59,20)] : true,
        [utils.asGridCoord(58,20)] : true,
        [utils.asGridCoord(57,20)] : true,
        [utils.asGridCoord(56,20)] : true,
        [utils.asGridCoord(55,20)] : true,
        [utils.asGridCoord(54,20)] : true,
      },
      cutsceneSpaces: {
        [utils.asGridCoord(72,25)]: [
          {
            events: [
              {type: "changeMap", map: "Estudio"}
            ]
          }
        ]
      }
  },
  
  Estudio: {
      bgSrc: "./imagenes/base2.png",
      gameObjects: {
          nina: new Person({
              isPlayerControlled: true,
              x: utils.withGrid(70),
              y: utils.withGrid(21),
          }),
          dieter: new Person({
              x: utils.withGrid(50),
              y: utils.withGrid(17),
              src: "./imagenes/dieterSprite.png"
          }),
          gino: new Person({
              x: utils.withGrid(25),
              y: utils.withGrid(30),
              src: "./imagenes/ginoSprite.png",
              talking: [
                {
                  events: [
                    {type: "textMessage", text: ".", facePlayer: "gino"},
                    {type: "textMessage", text: "."},
                  ]
                }
              ]
          }),
          roman: new Person({
              x: utils.withGrid(75),
              y: utils.withGrid(30),
              src: "./imagenes/romanSprite.png"
          }),
      },
      walls: {
          [utils.asGridCoord(66,16)] : true,
          [utils.asGridCoord(65,16)] : true,
          [utils.asGridCoord(64,16)] : true,
          [utils.asGridCoord(63,16)] : true,
          [utils.asGridCoord(62,16)] : true,
          [utils.asGridCoord(61,16)] : true,
          [utils.asGridCoord(60,16)] : true,
          [utils.asGridCoord(59,16)] : true,
          [utils.asGridCoord(58,16)] : true,
          [utils.asGridCoord(57,16)] : true,
          [utils.asGridCoord(56,16)] : true,
        },
        cutsceneSpaces: {
          [utils.asGridCoord(4,21)]: [
            {
              events: [
                {type: "changeMap", map: "Biblioteca"}
              ]
            }
          ]
        }
  }
}