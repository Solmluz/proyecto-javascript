//SIRVE PARA INICIALIZAR TODO Y QUE SE VISUALICE EN EL NAVEGADOR.
(function () {

  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  overworld.init();

})();