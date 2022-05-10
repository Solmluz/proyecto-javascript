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
      this.map.drawBgImage(this.ctx, cameraPerson);

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

  //VENTANA QUE APARECE AL INICIAR EL JUEGO.
  instrucciones () {
    Swal.fire({
      title: 'Controles',
      html: `
      <p class="instrucciones-texto">Avanzar:</p>
      <img class="img-avanzar" src="./imagenes/controlesAvanzar.png" alt="Arrow keys/WASD">
      <p class="instrucciones-texto">Interactuar:</p>
      <img class="img-interactuar" src="./imagenes/controlesInteraccion.png" alt="Enter">`,
      color: '#D8C58A',
      background:'#518278',
      width: '35rem',
      padding: '1rem',
      confirmButtonText: 'Aceptar',
      buttonsStyling: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      customClass: {
        confirmButton: 'boton',
      }
    })
  }

  bindActionInput() {
    new KeyPressListener("Enter", () => {
      //HAY ALGUIEN A QUIEN HABLARLE?
      this.map.checkForActionCutscene()
    })
  }
 
  bindPlayerPositionCheck() {
    document.addEventListener("PersonWalkingComplete", e => {
      if (e.detail.whoId === "nina") {
        //LA POSICIÓN DEL JUGADOR HA CAMBIADO.
        this.map.checkForFootstepCutscene()
      }
    })
  }
 
  //CARGAR EL ESCENARIO CORRESPONDIENTE.
  startMap(mapConfig) {
   this.map = new OverworldMap(mapConfig);
   this.map.overworld = this;
   this.map.mountObjects();
  }

  //INICIA TODO LO DESCRITO ANTERIORMENTE TANTO EN ESTE JS COMO EN LOS DEMÁS.
  init() {
    //EL ESCENARIO ACTUAL.
    this.startMap(window.OverworldMaps.Estudio);
    console.log(this.map.walls);

    this.bindActionInput();
    this.bindPlayerPositionCheck();

    this.directionInput = new DirectionInput();
    this.directionInput.init();

    this.startGameLoop();

    //PARA CAMBIAR DE MAPA MEDIANTE EL CÓDIGO.
    this.map.startCutscene([
      {type: "changeMap", map: "Biblioteca"}
    ])

    this.instrucciones();
  }
}