//CLASE PARA EL JUGADOR Y LOS NPCS
class Person extends GameObject {
    constructor(config) {
        super(config);
        //INIDICA SI LAS PERSONAS SE VAN A MOVER AL CARGAR.
        this.movingProgressRemaining = 0;

        //SI EL JUGADOR PUEDE CONTROLARLO, ESTÁ PUESTO EN FLASE COMO DEFAULT EXCEPTO PARA EL PERSONAJE DEL JUGADOR.
        this.isPlayerControlled = config.isPlayerControlled || false;

        //QUÉ TAN RÁPIDO SE MUEVE EL PERSONAJE CONTROLABLE.
        this.directionUpdate = {
            "up": ["y", -2.5],
            "down": ["y", 2.5],
            "left": ["x", -2.5],
            "right": ["x", 2.5],
        }
    }

    //CAMBIAR POSICIÓN DEL PC Y ESTABLECER EL USO DE LAS TECLAS PARA DICHO FUNCIÓN.
    update(state) {
        if (this.movingProgressRemaining > 0) {
        this.updatePosition();
        console.log(state.map.isSpaceTaken(this.x, this.y, this.direction));
        } else {
            if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow,
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
            this.movingProgressRemaining = 8; //CÓMO SE PROYECTAN LOS FRAMES.
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

    //ANIMACIÓN QUE SE USA PARA CADA COMPORTAMIENTO.
    updateSprite() {
        if (this.movingProgressRemaining > 0) {
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
        }
    }