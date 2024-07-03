const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionreiniciarJuego = document.getElementById("reiniciar")
const botonMascotaJugador = document.getElementById("boton-mascota")

const botonReiniciar = document.getElementById("boton-reiniciar")
sectionreiniciarJuego.style.display = "none"

const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")

const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesDelJugador = document.getElementById("ataques-Del-Jugador")
const ataqueDelEnemigo = document.getElementById("ataques-Del-Enemigo")
const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let Elementos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeElementos
let inputLobo 
let inputLeopardo 
let inputRinoc
let mascotaJugador
let mascotaJugadorObjeto
let ataquesElemento
let ataquesElementoEnemigo
let botonFuego 
let botonAgua 
let botonTierra 
let botones = []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mapa6.png"
let alturaQueBuscamos
let alturaQueBuscamos1
let anchoDelMapa  = window.innerWidth -20
let altoDelMapa  = window.innerWidth -20
const anchoMaximoDelMapa = 440
const largoMaximoDelMapa = 650

if(anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa -20
    altoDelMapa = largoMaximoDelMapa -20
}

alturaQueBuscamos = anchoDelMapa * 600/800
alturaQueBuscamos1 = altoDelMapa * 600/800
mapa.width = alturaQueBuscamos
mapa.height = alturaQueBuscamos1

class Elemento{
    constructor(nombre, foto, vida, fotoMapa){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho  = 54
        this.alto = 85
        this.x = aleatorio(0,mapa.width - this.ancho) 
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()

        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0


    }
    pintarElemento(){
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
}

let Acua = new Elemento ("Acua","./assets/AGUA(1).png", 5,"./assets/AGUA(1).png")

let Terra = new Elemento ("Terra","./assets/TIERRA(30).png", 5, "./assets/TIERRA(30).png")

let Foger = new Elemento ("Foger","./assets/Foger2.png", 5, "./assets/FUEGO(20).png")

let AcuaEnemigo = new Elemento ("Acua","./assets/AGUA(1).png", 5,"./assets/Acua.png")

let TerraEnemigo = new Elemento ("Terra","./assets/TIERRA(30).png", 5, "./assets/Terra.png")

let FogerEnemigo = new Elemento ("Foger","./assets/FUEGO(20).png", 5, "./assets/Foger.png")


Acua.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🎍", id: "boton-tierra"},
)
AcuaEnemigo.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🎍", id: "boton-tierra"},
)
Terra.ataques.push(
    
    {nombre: "🎍", id: "boton-tierra"},
    {nombre: "🎍", id: "boton-tierra"},
    {nombre: "🎍", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
)
TerraEnemigo.ataques.push(
    
    {nombre: "🎍", id: "boton-tierra"},
    {nombre: "🎍", id: "boton-tierra"},
    {nombre: "🎍", id: "boton-tierra"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
)
Foger.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🎍", id: "boton-tierra"},
)
FogerEnemigo.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🎍", id: "boton-tierra"},
)
Elementos.push(Acua,Terra,Foger)

function iniciarJuego(){
    
    sectionSeleccionarAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"

    Elementos.forEach((Elemento) => {
        opcionDeElementos = `
        <input type="radio" name="mascota" id=${Elemento.nombre} />
            <label class ="tarjeta-Animal" for=${Elemento.nombre}>
                <p>${Elemento.nombre}</p>
                <img src=${Elemento.foto} alt=${Elemento.nombre}>
            </label>
        `
    contenedorTarjetas.innerHTML += opcionDeElementos

    inputLobo = document.getElementById("Acua")
    inputRinoc = document.getElementById("Foger")
    inputLeopardo = document.getElementById("Terra")

    })

    botonMascotaJugador.addEventListener("click",seleccionarMascotaJugador)
    
    botonReiniciar.addEventListener("click", reiniciarJuego)

    unirseAlJuego()
}

function unirseAlJuego(){
    fetch("http://localhost:8080/unirse")
        .then(function(res){
            console.log(res)
            if (res.ok){
                res.text()
                    .then(function (respuesta){
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}

function seleccionarMascotaJugador(){
    
    sectionSeleccionarMascota.style.display = "none"
    

    if (inputLobo.checked){
        spanMascotaJugador.innerHTML = inputLobo.id  
        mascotaJugador = inputLobo.id
    } else if (inputLeopardo.checked){
        spanMascotaJugador.innerHTML = inputLeopardo.id
        mascotaJugador = inputLeopardo.id
    }else if (inputRinoc.checked){
        spanMascotaJugador.innerHTML = inputRinoc.id
        mascotaJugador = inputRinoc.id
    } else  {
        alert("Tienes que seleccionar una mascota primero")
    } 

    seleccionarElemento(mascotaJugador)

        extraerAtaques(mascotaJugador)
        sectionVerMapa.style.display = "flex"
    
        iniciarMapa()
}

function seleccionarElemento(mascotaJugador){
    fetch(`http://localhost:8080/elemento/${jugadorId}`,{
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            elemento: mascotaJugador
        })
    })
}

function extraerAtaques(mascotaJugador){
    let ataques 
    for (let i = 0; i < Elementos.length; i++) {
        if (mascotaJugador === Elementos[i].nombre){
            ataques = Elementos[i].ataques
        }
 
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesElemento = `
        <button id=${ataque.id} class="boton-de-ataque BAtaque" >${ataque.nombre}</button>
        `
        contenedorAtaques.innerHTML += ataquesElemento
    })

    botonAgua = document.getElementById("boton-agua")
    botonFuego = document.getElementById("boton-fuego")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")

}
function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) =>{
            if (e.target.textContent ==="🔥"){
                ataqueJugador.push("FUEGO")
                console.log(ataqueJugador)
                boton.style.background = "rgb(138, 43, 226)"
                boton.disabled = true
            } else if (e.target.textContent === "💧"){
                ataqueJugador.push("AGUA")
                console.log(ataqueJugador)
                boton.style.background = "rgb(138, 43, 226)"
                boton.disabled = true
            } else{
                ataqueJugador.push("TIERRA")
                console.log(ataqueJugador)
                boton.style.background = "rgb(138, 43, 226)"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
    })
        
})
   
}
function seleccionarMascotaEnemigo(enemigo){
    // let mascotaAleatorio = aleatorio(0, Elementos.length -1)

    // spanMascotaEnemigo.innerHTML = Elementos [mascotaAleatorio].nombre
    // ataquesElementoEnemigo = Elementos[mascotaAleatorio].ataques
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesElementoEnemigo = enemigo.ataques
    secuenciaAtaque()
}
function ataqueAleatorioEnemigo(){
    let ataqueAleatorio = aleatorio(0,ataquesElementoEnemigo.length -1)

    if(ataqueAleatorio == 0 || ataqueAleatorio == 1){
        ataqueEnemigo.push("FUEGO")
    }else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
        ataqueEnemigo.push("AGUA")
    }else {
        ataqueEnemigo.push("TIERRA")
    }
    console.log(ataqueEnemigo)
    iniciarPelea()
}
function iniciarPelea(){
    if (ataqueJugador.length === 5){
        combate()
    }
}
function indexAmbosOponentes (jugador, enemigo){
    indexAtaqueJugador = ataqueJugador [jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}  
function combate(){

    for (let index = 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]){
            indexAmbosOponentes (index,index)
            crearMensaje("EMPATE")
        } else if (ataqueJugador[index] === "FUEGO" && ataqueEnemigo[index] === "TIERRA"){
            indexAmbosOponentes (index,index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index] === "AGUA" && ataqueEnemigo[index] === "FUEGO"){
            indexAmbosOponentes (index,index) 
            crearMensaje ("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueJugador[index] === "TIERRA" && ataqueEnemigo[index] === "AGUA"){
            indexAmbosOponentes (index,index) 
            crearMensaje ("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
      
    }
    }


    //revisar las vidas
    revisarVidas()
}
    function revisarVidas(){
        
        if (victoriasJugador === victoriasEnemigo){
            crearMensajeResultado("EMPATASTE!")
        } else if (victoriasJugador > victoriasEnemigo){
            crearMensajeResultado("!!BIEEN GANASTE!!")
        }else {
            crearMensajeResultado("LO SIENTO PERDISTE")
        }
    
}
function crearMensaje(resultado){
    
    let nuevoAtaqueDelJugador= document.createElement("p")
    let nuevoAtaqueDelEnemigo = document.createElement("p")

    sectionMensajes.innerHTML= resultado
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo

    
    ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

}
function crearMensajeResultado(resultadoFinal){
   
    sectionMensajes.innerHTML = resultadoFinal

    sectionreiniciarJuego.style.display = "block"

}
function reiniciarJuego(){

    location.reload()
}
function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}
function pintarCanvas(){

    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height )
    lienzo.drawImage(
    mapaBackground,  
    0,
    0,
    mapa.width,
    mapa.height
    )
  
    mascotaJugadorObjeto.pintarElemento()

    enviarPosicion(mascotaJugadorObjeto.x , mascotaJugadorObjeto.y)

    AcuaEnemigo.pintarElemento()
    TerraEnemigo.pintarElemento()
    FogerEnemigo.pintarElemento()
    if (mascotaJugadorObjeto.velocidadX !==0 || mascotaJugadorObjeto.velocidadY !==0){
        revisarColision(AcuaEnemigo)
        revisarColision(TerraEnemigo)
        revisarColision(FogerEnemigo)
    }
}
function enviarPosicion(x,y){
    fetch(`http://localhost:8080/elemento/${jugadorId}/posicion`, {
        method:"post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    } )
}

function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
    
}
function moverAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
    
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}
function detenerMovimiento(){
    
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePresionoUnaTecla(event){
    switch (event.key) {
        case "ArrowUp":
            moverArriba()
            break;
        case "ArrowDown":
            moverAbajo()
            break;
        case "ArrowLeft":
            moverIzquierda()
            break;
        case "ArrowRight":
            moverDerecha()
            break;
        default:
            break;
    }
}
function iniciarMapa(){
   
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto, mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener("keydown", sePresionoUnaTecla)
    window.addEventListener("keyup", detenerMovimiento)
}
function obtenerObjetoMascota(){
    for (let i = 0; i < Elementos.length; i++) {
        if (mascotaJugador === Elementos[i].nombre){
            return Elementos[i]
        }
 
    }
}
function revisarColision(enemigo){
const arribaEnemigo = enemigo.y
const abajoEnemigo = enemigo.y + enemigo.alto
const derechaEnemigo = enemigo.x + enemigo.ancho
const izquierdaEnemigo = enemigo.x 

const arribaElemento = mascotaJugadorObjeto.y
const abajoElemento = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
const derechaElemento = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
const izquierdaElemento = mascotaJugadorObjeto.x 

    if(
        abajoElemento < arribaEnemigo ||
        arribaElemento > abajoEnemigo ||
        derechaElemento < izquierdaEnemigo ||
        izquierdaElemento > derechaEnemigo
    ) {
        return
    }
    
    detenerMovimiento()
    clearInterval(intervalo)
    sectionSeleccionarAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)

}    

window.addEventListener("load",iniciarJuego)