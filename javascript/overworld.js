class Overworld {
  constructor(config) {
    this.element = config.element;
    this.canvas = this.element.querySelector(".game-canvas");
    this.ctx = this.canvas.getContext("2d");
  }
 
  init() {
    const image = new Image();
    image.onload = () => {
      this.ctx.drawImage(image,
          0,
          -100,
          1600,
          1000)
    };
    image.src = "./imagenes/fondoPlaceholder.png";

    const nina = new GameObject({
      x: 50,
      y: 6,
    })

    setTimeout(() => {
      nina.sprite.draw(this.ctx);
    }, 200)

  }
}
