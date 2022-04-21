class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.map = null;
  }
 
  startGameLoop () {
    const step = () => {

      //LIMPIAR CANVAS.
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);

      //CONFIGURACIÓN DE LA CÁMARA.
      const cameraPerson = this.map.gameObjects.nina;

      //ACTUALIZAR OBJETOS.
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        })
      })

      //ACÁ VA EL FONDO.
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //ACÁ VAN LOS OBJETOS.
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson);
      })

      requestAnimationFrame(() => {
        step();
      })
    }
    step();
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //HAY ALGUIEN A QUIEN HABLARLE?
      this.map.checkForActionCutscene()
    })
  }
 
  bindHeroPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "nina") {
        //LA POSICIÓN DEL JUGADOR HA CAMBIADO.
        this.map.checkForFootstepCutscene()
      }
    })
  }
 
  startMap(mapConfig) {
   this.map = new OverworldMap(mapConfig);
   this.map.overworld = this;
   this.map.mountObjects();
  }

  init() {
    this.startMap(window.OverworldMaps.Placeholder2);

    this.bindActionInput();
    this.bindHeroPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    this.map.startCutscene([
      //{type: "changeMap", map: "Placeholder"}
    ])
  }
}