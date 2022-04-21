class Person extends GameObject {
    constructor(config) {
        super(config);
        this.movingProgressRemaining = 0;

        this.isPlayerControlled = config.isPlayerControlled || false;

        this.directionUpdate = {
            "up": ["y", -2.5],
            "down": ["y", 2.5],
            "left": ["x", -2.5],
            "right": ["x", 2.5],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
        this.updatePosition();
        } else {
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            this.updateSprite(state);
        }
    }

    startBehavior(state, behavior) {
        //ASIGNAR DIRECCIÓN DEL PERSONAJE.
        this.direction = behavior.direction;
        if (behavior.type === "walk") {
            //DETENERSE SI NO HAY ESPACIO.
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                behavior.retry && setTimeout(() => {
                    this.startBehavior(state, behavior)
                }, 10);
                return;
            }
            //CAMINAR.
            state.map.moveWall(this.x, this.y, this.direction);
            this.movingProgressRemaining = 8;
            this.updateSprite(state);

            if (behavior.type === "stand") {
                setTimeout(() => {
                  utils.emitEvent("PersonStandComplete", {
                    whoId: this.id
                  })
                }, behavior.time)
              }
        }
    }

    updatePosition() {
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;

            if (this.movingProgressRemaining === 0) {
                //TERMINA DE CAMINAR.
                utils.emitEvent("PersonWalkingComplete", {
                  whoId: this.id
                })
        
              }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
        }
    }