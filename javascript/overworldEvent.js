class OverworldEvent {
    constructor({map, event}) {
        this.map = map;
        this.event = event;
    }

    textMessage(resolve) {
        if (this.event.facePlayer) {
            const obj = this.map.gameObjects[this.event.facePlayer];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["nina"].direction);
          }
        
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-container"))
    }

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