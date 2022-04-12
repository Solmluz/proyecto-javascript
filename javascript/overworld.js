class Overworld {
    constructor(config) {
      this.element = config.element;
      this.canvas = this.element.querySelector(".game-canvas");
      this.ctx = this.canvas.getContext("2d");
    }
   
    init() {
      //ACÁ VAN LOS FONDOS.
      const image = new Image();
      image.onload = () => {
        this.ctx.drawImage(image,
          0,
          -100,
          1600,
          1000)
      };
      image.src = "./imagenes/fondoPlaceholder.png";

      //ACÁ VAN LOS OBJETOS.
      const player = new Image();
      player.onload = () => {
        this.ctx.drawImage(player,
          600, //izquierda
          230, //arriba
          400, //anchura
          400) //altura
      };
      player.src = "./imagenes/ninaModel.png";
    }
}