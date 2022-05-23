//CLASE PARA LOS DISTINTOS MAPAS /ESCENARIOS/.
class OverworldMap {
  constructor(config) {
    this.gameObjects = config.gameObjects;
    //CREAR EVENTOS.
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    //CREAR PAREDES.
    this.walls = config.walls || {};

    //IMAGEN PARA FONDO.
    this.bgImage = new Image();
    this.bgImage.src = config.bgSrc;

    this.isCutscenePlaying = false;
  }

  //UBICAR IMAGEN PARA FONDO.
  drawBgImage(ctx, cameraPerson) {
    ctx.drawImage(
      this.bgImage,
      utils.withGrid(30) - cameraPerson.x,
      utils.withGrid(12) - cameraPerson.y
    );
  }

  //INDICA SI EL ESPACIO ESTÁ OCUPADO POR UN GAMEOBJECT O NO.
  isSpaceTaken(currentX, currentY, direction) {
    const {x,y} = utils.nextPosition(currentX, currentY, direction);
    return this.walls[`${x},${y}`] || false;
  }

  //SIRVE PARA TRASLADAR LOS OBSTÁCULOS AL MISMO TIEMPO QUE LOS GAMEOBJECTS A LOS CUALES ESTÁN ARRAIGADOS CAMBIAN DE POSICIÓN, ASÍ NO SE CREAN OBSTÁCULOS INVISIBLES.
  //ES POSIBLE QUE NO ESTÉ FUNCIONANDO CORRECTAMENTE.
  mountObjects() {
    Object.keys(this.gameObjects).forEach((key) => {
      let object = this.gameObjects[key];
      object.id = key;

      object.mount(this);
    });
  }

  //PARA CREAR EVENTOS, AÚN ESTÁ EN DESUSO.
  async startCutscene(events) {
    this.isCutscenePlaying = true;

    for (let i = 0; i < events.length; i++) {
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      });
      await eventHandler.init();
    }

    this.isCutscenePlaying = false;

    Object.values(this.gameObjects).forEach((object) =>
      object.doBehaviorEvent(this)
    );
  }

  checkForActionCutscene() {
    const nina = this.gameObjects["nina"];
    const nextCoords = utils.nextPosition(nina.x, nina.y, nina.direction);
    const match = Object.values(this.gameObjects).find((object) => {
      return `${object.x},${object.y}` === `${nextCoords.x}, ${nextCoords.x}`;
    });
    console.log({ match });
    if (!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events);
    }
  }

  checkForFootstepCutscene() {
    const nina = this.gameObjects["nina"];
    const match = this.cutsceneSpaces[`${nina.x},${nina.y}`];
    if (!this.isCutscenePlaying && match) {
      this.startCutscene(match[0].events);
    }
  }

  //AGREGAR PAREDES/OBSTÁCULOS.
  addWall(x, y) {
    this.walls[`${x},${y}`] = true;
  }
  //ELIMINAR PAREDES/OBSTÁCULOS.
  removeWall(x, y) {
    delete this.walls[`${x},${y}`];
  }
  //MOVER PAREDES/OBSTÁCULOS
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const { x, y } = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x, y);
  }
}

//ACÁ ESTÁN UBICADOS LOS MAPAS:
window.OverworldMaps = {
  Biblioteca: {
    bgSrc: "./imagenes/fondoBiblioteca.png",
    gameObjects: {
      nina: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(70),
        y: utils.withGrid(21),
      }),
      jacques: new Person({
        x: utils.withGrid(45),
        y: utils.withGrid(18),
        src: "./imagenes/jacquesSprite.png",
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "Ahora mismo no tengo más trabajos para ti.",
                facePlayer: "jacques",
              },
              { type: "textMessage", text: "Vuelve luego." },
            ],
          },
        ],
      }),
      maggie: new Person({
        x: utils.withGrid(10),
        y: utils.withGrid(25),
        src: "./imagenes/maggieSprite.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: "...", facePlayer: "maggie" },
            ],
          },
        ],
      }),
      keiji: new Person({
        x: utils.withGrid(-2),
        y: utils.withGrid(31),
        src: "./imagenes/keijiSprite.png",
        talking: [
          {
            events: [
              {
                type: "textMessage",
                text: "No puedo hablar ahora, estoy ocupado.",
              },
            ],
          },
        ],
      }),
      mesaBiblioteca: new GameObject({
        x: utils.withGrid(75),
        y: utils.withGrid(31.2),
        src: "./imagenes/mesaBiblioteca.png",
      }),
      asiento1Biblioteca: new GameObject({
        x: utils.withGrid(34),
        y: utils.withGrid(24),
        src: "./imagenes/asiento1Biblioteca.png",
      }),
      asiento2Biblioteca: new GameObject({
        x: utils.withGrid(46.5),
        y: utils.withGrid(30),
        src: "./imagenes/asiento2Biblioteca.png",
      }),
      pizarraBiblioteca: new GameObject({
        x: utils.withGrid(56.5),
        y: utils.withGrid(16),
        src: "./imagenes/pizarraBiblioteca.png",
      }),
      equipoBiblioteca: new GameObject({
        x: utils.withGrid(35),
        y: utils.withGrid(17),
        src: "./imagenes/equipoBiblioteca.png",
      }),
      libreroBiblioteca: new GameObject({
        x: utils.withGrid(17),
        y: utils.withGrid(16),
        src: "./imagenes/libreroBiblioteca.png",
      }),
    },
    //PAREDES, NO ESTÁ FUNCIONANDO CORRECTAMENTE.
    walls: {
      [utils.asGridCoord(70, 16)]: true,
      [utils.asGridCoord(69, 16)]: true,
      [utils.asGridCoord(68, 16)]: true,
      [utils.asGridCoord(67, 16)]: true,
      [utils.asGridCoord(66, 16)]: true,
      [utils.asGridCoord(55, 16)]: true,
      [utils.asGridCoord(54, 16)]: true,
      [utils.asGridCoord(53, 16)]: true,
      [utils.asGridCoord(52, 16)]: true,
      [utils.asGridCoord(51, 16)]: true,
      [utils.asGridCoord(50 , 16)]: true,
    },
    //CAMBIAS DE MAPA AL POSICIONARTE SOBRE LA SALIDA, NO FUNCIONA.
    cutsceneSpaces: {
      [utils.asGridCoord(72, 25)]: [
        {
          events: [{ type: "changeMap", map: "Estudio" }],
        },
      ],
    },
  },

  Estudio: {
    bgSrc: "./imagenes/fondoEstudio.png",
    gameObjects: {
      nina: new Person({
        isPlayerControlled: true,
        x: utils.withGrid(70),
        y: utils.withGrid(21),
      }),
      dieter: new Person({
        x: utils.withGrid(50),
        y: utils.withGrid(17),
        src: "./imagenes/dieterSprite.png",
      }),
      gino: new Person({
        x: utils.withGrid(25),
        y: utils.withGrid(30),
        src: "./imagenes/ginoSprite.png",
        talking: [
          {
            events: [
              { type: "textMessage", text: ".", facePlayer: "gino" },
              { type: "textMessage", text: "." },
            ],
          },
        ],
      }),
      roman: new Person({
        x: utils.withGrid(75),
        y: utils.withGrid(30),
        src: "./imagenes/romanSprite.png",
      }),
    },
    //PAREDES, NO ESTÁ FUNCIONANDO CORRECTAMENTE.
    walls: {
      [utils.asGridCoord(66, 16)]: true,
      [utils.asGridCoord(65, 16)]: true,
      [utils.asGridCoord(64, 16)]: true,
      [utils.asGridCoord(63, 16)]: true,
      [utils.asGridCoord(62, 16)]: true,
      [utils.asGridCoord(61, 16)]: true,
      [utils.asGridCoord(60, 16)]: true,
      [utils.asGridCoord(59, 16)]: true,
      [utils.asGridCoord(58, 16)]: true,
      [utils.asGridCoord(57, 16)]: true,
      [utils.asGridCoord(56, 16)]: true,
    },
    //CAMBIAS DE MAPA AL POSICIONARTE SOBRE LA SALIDA, NO FUNCIONA.
    cutsceneSpaces: {
      [utils.asGridCoord(4, 21)]: [
        {
          events: [{ type: "changeMap", map: "Biblioteca" }],
        },
      ],
    },
  },
};
