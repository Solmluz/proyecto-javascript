//CLASE PARA EVENTOS DE DIÁLOGO Y CAMBIO DE ESCENARIO.
class OverworldEvent {
    constructor({map, event}) {
        this.map = map;
        this.event = event;
    }

    //DIÁLOGOS.
    textMessage(resolve) {
        //PARA QUE CIERTOS NPCS SE VOLTEEN HACIA EL JUGADOR CUANDO ÉSTE LES HABLE.
        if (this.event.facePlayer) {
            const obj = this.map.gameObjects[this.event.facePlayer];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["nina"].direction);
          }
        
        //CREAR EVENTOS DE DIÁLOGO.
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-container"))
    }

    //CAMBIAR DE MAPA /ESCENARIO/.
    changeMap(resolve) {
        this.map.overworld.startMap(window.OverworldMaps[this.event.map] );
        resolve();
      }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}