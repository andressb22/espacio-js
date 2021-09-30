let canvas = document.getElementById("canvas")
let lienzo = canvas.getContext("2d");
let fondore = new Image;
let piso = new Image
let imgHeroe = new Image;
let imgHeroeInvertido = new Image;
let imgEnemigo = new Image;
let monedas = new Image;
let llave = new Image;
let puerta = new Image;
let portada = new Image;
let poPlataformas = []
let arrEnemigos = [];
let arrMonedas = [];
let movDerecha = false;
let movIzquierda = false;
let movArriba = false;
let indiceX = 0;
let indiceY = 0;
let vg = 1;
let vY = 0;
let vx = 0;
let vEx = 0
let gravedad = false;
let caida = false;
let direccion = "derecha";
let direccionEnemigo = "derecha"
let colicionEnemigo = 0
let salto = false;
let e1 = false;
let e2 = false;
let e3 = false;
let m1 = false;
let m2 = false;
let m3 = false;
let puntuacion = 0;
let recogerLlave = false;
let reiniciarX = 400;
let reiniciarY = 250;
let cursor = false;

fondore.src ="imagenes/fondo.jpg"
fondore.onload = async function()
{
    await lienzo.drawImage(fondore,0,0,960,500)
}
portada.src = "imagenes/personajeF.png"
portada.onload = async function()
{
  lienzo.drawImage(portada,70,100,70,100)
}
puerta.src = "imagenes/puerta.png"
puerta.onload = async function()
{
  puerta1.dibujar();
}
llave.src = "imagenes/llave.png"
llave.onload = async function()
{
  llave1.dibujar();
}

monedas.src ="imagenes/moneda.png"
monedas.onload = async function()
{
  moneda1.dibujar();
}
imgHeroeInvertido.src= "imagenes/Heroe_Reves.png"
imgHeroeInvertido.onload =async function()
  {
    personaje.dibujar();
  }

imgHeroe.src = "imagenes/Heroe.png"
imgHeroe.onload = async function()
  {

    personaje.dibujar()
  }

piso.src = "imagenes/pattern.png"
piso.onload = async function()
  {
    dibujador();
  }
  imgEnemigo.src = "imagenes/enemy.png";
  imgEnemigo.onload = async function()
    {
      enemigo1 = new Enemigo(300,410,50,50,"enemi1")
      enemigo2 = new Enemigo(15,250,50,50,"enemi2")
      enemigo3 = new Enemigo(685,180,50,50,"enemi3")
      arrEnemigos.push(enemigo1);
      arrEnemigos.push(enemigo2);
      arrEnemigos.push(enemigo3);
    }
class Heroe
{
  constructor(x,y,ancho,alto)
  {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto
  }
  dibujar()
  {
    if (direccion == "derecha")
    {
      lienzo.drawImage(imgHeroe,indiceX*79,indiceY*76,this.ancho,this.alto,this.x,this.y,this.ancho,this.alto)
    }
    if (direccion == "izquierda")
    {

      lienzo.drawImage(imgHeroeInvertido,indiceX*79+10,indiceY*76,this.ancho,this.alto,this.x,this.y,this.ancho,this.alto)

    }

  }
  mover()
  {
    if (movDerecha)
    {
      direccion = "derecha"
      this.avanzar();
    }
    if (movIzquierda)
    {
      direccion = "izquierda"
      this.retroceder();
    }
    if (movArriba )
    {
      this.saltar();
    }
  }
  saltar()
  {
    indiceY = 1
    if (vY > 5)
    {
      vY = 0
      indiceY = 0
      movArriba = false;
      caida = true
      gravedad = true
    }
    else
    {
      vY++
      this.y -= 45
      indiceX += 1
    }
    if (indiceX > 5)
    {
        indiceX = 0
    }
  }
  avanzar()
  {

      if (vx > 5)
      {
        vx = 0
        movDerecha = false;
      }
      else
      {
        vx++
        this.x += 15
        indiceX += 1
      }
      if (indiceX > 5)
      {
          indiceX = 0
      }
      movIzquierda = false





  }
  retroceder()
  {

      if (vx > 5)
      {
        vx = 0
        movIzquierda = false;
      }
      else
      {
        vx++
        this.x -= 15
        indiceX += 1
      }
      if (indiceX > 5)
      {
          indiceX = 0
      }

      movDerecha = false


  }
  aplicarGravedad()
  {
    vg= 10
    if (gravedad == false)
    {
      caida = false
    }
    else
    {
      if (vg >= 10)
      {
          vg = 10
      }
      this.y += vg
    }

  }

}
class Plataformas
{
    constructor(x,y,ancho,alto)
    {
      this.x = x;
      this.y = y;
      this.ancho = ancho
      this.alto = alto
    }
    dibujar()
    {
      lienzo.drawImage(piso,this.x,this.y,this.ancho,this.alto)
    }
}

class Enemigo
{
  //terminar movimiento de el enemigo monedas y puerta
    constructor(x,y,ancho,alto,nombre)
    {
      this.x = x;
      this.y = y;
      this.ancho = ancho;
      this.alto = alto;
      this.nombre = nombre;
    }
    dibujar()
    {
      lienzo.drawImage(imgEnemigo,this.x,this.y,this.ancho,this.alto)
    }
    movimientoDere()
    {
      vEx ++
      if (vEx >= 50)
      {
        vEx = 0;
        direccionEnemigo = "izquierda";
      }
      else
      {
        this.x += 10;
      }
    }
    movimientoIzquier()
    {
      vEx ++
      if (vEx >= 50)
      {
        vEx = 0;
        direccionEnemigo = "derecha";
      }
      else
      {
        this.x -= 10;
      }
    }
}
class Monedero
{
  constructor(x,y,ancho,alto,nombre)
  {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.nombre = nombre
  }
  dibujar()
  {
    if (this.nombre == "llave")
    {
      lienzo.drawImage(llave,this.x,this.y,this.ancho,this.alto)
    }
    else if (this.nombre == "puerta")
    {
      lienzo.drawImage(puerta,this.x,this.y,this.ancho,this.alto)
    }
    else
    {
      lienzo.drawImage(monedas,this.x,this.y,this.ancho,this.alto)
    }
  }
}

puerta1 = new Monedero(890,400,40,60,"puerta");
moneda1 = new Monedero(160,250,40,30,"moneda1");
moneda2 = new Monedero(500,100,40,30,"moneda2");
llave1 =  new Monedero(860,190,40,30,"llave")
personaje = new Heroe(0,392,72,69)
piso1 = new Plataformas(0,460,960,40)
plataforma = new Plataformas(30,300,180,40);
plataforma1 = new Plataformas(360,150,200,40);
plataforma2 = new Plataformas(700,230,200,40);
poPlataformas.push(piso1);
poPlataformas.push(plataforma);
poPlataformas.push(plataforma1);
poPlataformas.push(plataforma2);
arrMonedas.push(moneda1);
arrMonedas.push(moneda2);
arrMonedas.push(llave1);
arrMonedas.push(puerta1);




function mover(evento)
{
  let tecla = evento.keyCode
  if (tecla == "87"  && salto == false)
  {
    movArriba = true
    salto = true
  }
  else if (tecla == "68")
  {
    movDerecha = true
  }
  else if (tecla == "65")
  {
    movIzquierda = true
  }
}

function dibujador()
{
    piso1.dibujar();
    plataforma.dibujar();
    plataforma1.dibujar();
    plataforma2.dibujar();
    puerta1.dibujar();
    if (m1 == false)
    {
      moneda1.dibujar();
    }
    if (m2 == false)
    {
      moneda2.dibujar();
    }
    if (m3 == false)
    {
      llave1.dibujar();
    }
    if (e1 == false)
    {
      enemigo1.dibujar();
    }
    if (e2 == false)
    {
      enemigo2.dibujar();
    }
    if (e3 == false)
    {
      enemigo3.dibujar();
    }
}




function cicloJuego()
{
  lienzo.clearRect(0,0,960,500)
  personaje.dibujar();
  personaje.mover();
  if (direccionEnemigo == "izquierda")
  {
    enemigo1.movimientoIzquier();
    enemigo2.movimientoIzquier();
    enemigo3.movimientoIzquier();

  }
  else if (direccionEnemigo == "derecha")
  {
    enemigo1.movimientoDere();
    enemigo2.movimientoDere();
    enemigo3.movimientoDere();
  }
// colicion con la llave :3
  dibujador();
  for (const index in arrEnemigos)
  {
    if (colicion(personaje,arrEnemigos[index]) == true)
    {
      if (caida == true )
      {

           if (arrEnemigos[index].nombre == "enemi1")
          {
            e1 = true
          }
          else if (arrEnemigos[index].nombre == "enemi2")
          {
            e2 = true
          }
          else if (arrEnemigos[index].nombre == "enemi3")
          {
            e3 = true;

          }
          arrEnemigos.splice(index,1)
      }
      else if (caida == false)
      {
        clearInterval(iterador);
        lienzo.clearRect(0,0,960,500)
        lienzo.drawImage(fondore,0,0,960,500)
        lienzo.drawImage(portada,150,210,70,100)
        lienzo.fillStyle = "white";
        lienzo.font = "100px georgia"
        lienzo.fillText("Perdiste",300,100)
        lienzo.font = "50px georgia"
        lienzo.fillText("Reintentar",reiniciarX,reiniciarY)
        canvas.addEventListener("mousemove", reintentar)
        canvas.addEventListener("mouseup", reintentar)

      }
    }
    else
    {

    }
  }

  for (const index in poPlataformas)
  {
    if (colicion(personaje,poPlataformas[index]) == true)
    {

      if (poPlataformas[index].y < personaje.y)
      {
        gravedad = true
        break;
      }
      if (personaje.y + personaje.alto -2  > poPlataformas[index].y)
      {
        gravedad = true
        break;
      }

          gravedad = false
          caida = false
          salto = false
          vg = 0;
          break;
    }
    else
    {
      gravedad = true
    }
  }
  for (const index in arrMonedas)
  {
    if (colicion(personaje,arrMonedas[index]) == true)
    {
      if (arrMonedas[index].nombre == "moneda1")
      {
        m1 = true
        puntuacion += 5;
      }
      else if (arrMonedas[index].nombre == "moneda2")
      {
        m2 = true
        puntuacion += 5;
      }
      else if (arrMonedas[index].nombre == "llave")
      {
        m3 = true
        recogerLlave = true;
      }
      else if (arrMonedas[index].nombre == "puerta")
      {
        if (recogerLlave)
        {

            clearInterval(iterador);
            lienzo.clearRect(0,0,960,500)
            lienzo.drawImage(fondore,0,0,960,500)
            lienzo.drawImage(portada,150,210,70,100)
            lienzo.fillStyle = "white";
            lienzo.font = "100px georgia"
            lienzo.fillText("Ganaste",300,100)
            lienzo.font = "50px georgia"
            lienzo.fillText("Reiniciar",reiniciarX,reiniciarY)
            canvas.addEventListener("mousemove", reintentar)
            canvas.addEventListener("mouseup", reintentar)
        }
        else {
          console.log("puerta cerrada")
        }
      }
    }

  }
  personaje.aplicarGravedad();

}
const  iterador = setInterval(cicloJuego,90);

function colicion (a,b)
{
  var colicionador = false

  if (b.x + b.ancho-40  >= a.x && b.x <=a.x + a.ancho)
  {
    if (b.y+b.alto >= a.y&& b.y <= a.y+  a.alto)
    {
      colicionador = true
    }

  }
    if(b.x <= a.x &&  b.x + b.ancho >= a.x + a.ancho)
    {
      //console.log("choca")
      if (b.y <= a.y && b.y + b.alto >= a.y + a.alto)
      {
        colicionador = true
      }
    }
    if(a.x <= b.x &&  a.x + a.ancho >= b.x + b.ancho)
    {

      if (a.y <= b.y && a.y + a.alto >= b.y + b.alto)
      {
        colicionador = true
      }
    }
    return colicionador
}

function reintentar(evento)
{
  if (evento.type == "mouseup")
  {
    if (cursor)
    {
        window.location.reload();
        return 0;
    }
    else {
      return 0 ;
    }
  }
  else
  {
    if ((evento.clientX + 20  >= reiniciarX && evento.clientX - 10  <= reiniciarX + 230) &&
        (evento.clientY   <= reiniciarY  && evento.clientY   >= reiniciarY - 60 ))
    {
        cursor = true
        lienzo.clearRect(390,110,300,170)
        lienzo.font = "55px georgia"
        lienzo.fillStyle = "#8d4fb6"
        if (caida)
        {
          lienzo.fillText("Reiniciar",reiniciarX,reiniciarY)
        }
        else {
          lienzo.fillText("Reintentar",reiniciarX,reiniciarY)
        }

    }
    else
    {
      cursor = false
      lienzo.clearRect(390,110,300,170)
      lienzo.fillStyle = "white"
      lienzo.font = "50px georgia"
      if (caida)
      {
        lienzo.fillText("Reiniciar",reiniciarX,reiniciarY)
      }
      else {
        lienzo.fillText("Reintentar",reiniciarX,reiniciarY)
      }

    }
  }



}

document.addEventListener("keydown",mover)
