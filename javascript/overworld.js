class Overworld {
    constructor(config) {
      this.element = config.element;
      this.canvas = this.element.querySelector(".game-canvas");
      this.context = this.canvas.getContext("2d");
    }
   
    init() {
      const image = new Image();
      image.onload = () => {
        this.context.drawImage(image,
            0,
            -100,
            1600,
            1000)
      };
      image.src = "/imagenes/fondoPlaceholder.png";

      //Acá van los objetos.
      const player = new Objeto({
        x: 2,
        y: 1,
      })

      setTimeout(() => {
        player.model.draw(this.context);
      }, 200);
    }
}