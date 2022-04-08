/*DATOS DE LA PARTIDA*/
class save {
  constructor(saveName, groupName) {
  this.saveName = saveName;
  this.groupName = groupName;
  }
  }

/*NOMBRE POR DEFAULT DE GROUPNAME*/
const defaultGroup = "Default"

/*CREAR NUEVA PARTIDA*/
function newSave () {
 let saveName = prompt("Esta una prueba para el proyecto final, para empezar, ponle un nombre a tu partida:");
  if (saveName !== "") {
    console.log(saveName)
    alert("¡Bienvenido " + saveName + "!")
  } else {
  while (saveName =="") {
  saveName = prompt("Ese nombre no es válido, inténtalo de nuevo:")
  }
  console.log(saveName)
  alert("¡Bienvenido " + saveName + "!")
  }
  let groupName = prompt("Escoge el nombre de tu periódico (si no escribes nada se escogerá el nombre por defecto):");
  if (groupName !== "") {
    console.log(groupName)
    alert("¡Entonces será " + groupName + "!")
  } else {
  groupName = defaultGroup
  alert("¡Entonces será " + groupName + "!")
  console.log(defaultGroup)
  }
}

/*OPCIONES DISPONIBLES*/
const opcionA = "a"
const opcionB = "b"
const opcionC = "c"

/*DESTINOS DISPONIBLES*/
const destinos = ["base", "callejon", "hotel", "estacionamiento", "gasolinera"]

newSave();

/*ACÁ EMPIEZA EL DIÁLOGO*/
alert("Anciana: ¡¡¡OOOHHH, la televisión!!! ¡¡Ya era hora!! ¡¡¡Y-yo eh... he visto al f-fantasma de '', EL FANTASMA!!! ¡¡¡E-e-es REAL, s-se los juro, LO VI... ehh-estaba d-dirigiéndose hacia aquel... A-AQUEL CALLEJÓN Y L-LUEGO-");
alert("Guardaespaldas: Señora cálmese por favor.");

/*ELECCIÓN*/
let eleccion1 = prompt("Tú: (¿Qué debería decir?) \na.Hemos recibido noticias al respecto... \nb.¿La televisión?")
if (opcionA.includes(eleccion1)) {
    alert("Tú: Buenos días, somos un grupo de periodistas independientes, no tenemos conexión con ningún canal. Hemos sido notificados al respecto.");
    alert("Reportero: Cuéntenos señora, ¿Qué sucedió exactamente?");}
else {
  alert("¿La televisión? ¿De qué está hablando? ¡No somos de ningún canal!");
  alert("Reportero: (¿Qué diablos fue eso, idiota? ¡Sé más educada!) Disculpe señora, somos un medio independiente, ¿Podría contarnos lo que sucedió?")};

alert("Anciana: Fue cuando... saqué a pasear a mi bebé '', lo vi... ¡¡Lo vi por allí, entrando al callejón de enfrente!! Estaba pálido... tanto como un cadáver... me asusté tanto que entré rápido a la casa y no lo volví a ver...");
alert("Ay... cuando me miró... tenía los ojos v-vacíos, e-era una mirada... horrible...y-y luego... ¡¡Desapareció!! ¡¡E-era un FANTASMA!!");
alert("Guardaespaldas: Cálmese señora...");

/*ELECCIÓN*/
let eleccion2 = prompt("Tú: (¿Qué debería decir?) \na.De hecho, no es la única... \nb.Quizás fue su imaginación... \nc.¿Ha consumido alcohol, drogas, medicamentos...?");
if (opcionA.includes(eleccion2)) {
  alert("Tú: Según nuestro investigador, otras personas también avistaron al presunto 'fantasma' por esta zona en concreto.");
  alert("Reportero: Así es, no es la única.");
  alert("Anciana: Oh, no me diga...");
} else if (opcionB.includes(eleccion2)) {
  alert("Tú: ¿Está segura de que su mente no le ha jugado una mala pasada?");
  alert("Anciana: ¡P-por supuesto que no! ¡Seré mayor pero estoy completamente lúcida!");
  alert("Reportero: Además recibimos reportes de otras personas de por aquí a las que también les pasó lo mismo...");
} else {
  alert("Tú: Dígame, ¿Recuerda haber consumido algo que haya tenido efectos alucinógenos, como alcohol, drogas... algún medicamento con efectos secundarios de ese estilo?");
  alert("Anciana: ¡C-claro que no, señorita! ¡Yo de eso nada!");
  alert("Reportero: No nos adelantemos, recuerda que otras personas también han reportado lo mismo por esta zona... dudo que haya sido por eso.");
}

alert("Guardaespaldas: Entonces... ¿Qué dicen, deberíamos ir a investigar?");

/*ELECCIÓN*/
let eleccion3 = prompt("Tú: (¿Qué debería decir?) \na.Sí \nb.No");
if (opcionA.includes(eleccion3)) {
  alert("Tú: Iremos, al menos para estar seguros.");
  alert("Reportero: Buena idea, ¿Está todo listo?");
  alert("Camarógrafo: Sí, mientras ustedes hablaban con esa mujer pude preparar el equipo.");
} else {
  alert("Tú: No creo que sea buena idea, todo esto me da muy malas vibras.");
  alert("Reportero: ¿Estás bromeando? ¡Más razón para ir a investigar!");
  alert("Camarógrafo: Deberíamos, recién terminaba de preparar todo....");
}

/*ELEGIR DESTINO*/
let elegirDestino = prompt("Selecciona tu destino: \nBase \nCallejón \nHotel \nEstacionamiento \nGasolinera");
if (destinos.includes(elegirDestino)) {
  alert("Muy bien, ¿Están todos listos, no? ¡Vayamos!")
} else {
  do {
    elegirDestino = prompt("Mmm... no creo que podamos ir allí en este momento, mejor vayamos a: \nBase \nCallejón \nHotel \nEstacionamiento \nGasolinera")
  } while (!destinos.includes(elegirDestino));
  alert("Muy bien, ¿Están todos listos, no? ¡Vayamos!")
}