//CLASE PARA LOS GAMEOBJECTS.
class GameObject {
    constructor (config) {
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        //SPRITE DEL GAMEOBJECT, SI NO SE ESPECIFICA SE PONE POR DEFECTO EL SIGUIENTE:
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "./imagenes/ninaSprites.png",
        });

        //PARA LOS GAMEOBJECTS QUE TIENEN COMPORTAMIENTOS EN LOOP, EN DESUSO POR AHORA.
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;

        //PARA QUE LOS GAMEOBJECTS CON CLASE "PERSON" PUEDAN HABLAR.
        this.talking = config.talking || [];
    }

    mount(map) {
        this.isMounted = true;
        map.addWall(this.x, this.y);

        //HACER UNA PAUSA.
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10)
    }

    update() {

    }

    //PARA COMPORTAMIENTOS EN LOOP, EN DESUSO HASTA TENER LOS SPRITES ADECUADOS.
    async doBehaviorEvent (map) {
        if (map.isCutscenePlaying || this.behaviorLoop.length === 0) {
            return;
          }

        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        const eventHandler = new OverworldEvent({map, event: eventConfig});
        await eventHandler.init();

        this.behaviorLoopIndex += 1;
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
          this.behaviorLoopIndex = 0;
        } 
    
        this.doBehaviorEvent(map);
    }

}