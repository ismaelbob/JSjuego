const btnEmpezar = document.getElementById('btn-empezar')

const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const naranja = document.getElementById('naranja')
const verde = document.getElementById('verde')

const ULTIMO_NIVEL = 10

class Juego {
    constructor() {
        this.inicializar()
        this.generarSecuencia()
        setTimeout(this.siguienteNivel, 1000)
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        this.nivel = 1
        this.colores = {
            celeste, violeta, naranja, verde
        }
    }
    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor(Math.random() * 4))
    }
    toggleBtnEmpezar() {
        if(btnEmpezar.classList.contains('hide')) {
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }
    siguienteNivel() {
        this.subnivel = 0
        this.parpadear()
        this.agregarEventoClick()
    }
    numeroAColor(numero) {
        switch(numero) {
            case 0 : return 'celeste'
            case 1 : return 'violeta'
            case 2 : return 'naranja'
            case 3 : return 'verde'
        }
    }
    colorANumero(color) {
        switch(color) {
            case 'celeste' : return 0
            case 'violeta' : return 1
            case 'naranja' : return 2
            case 'verde' : return 3
        }
    }
    parpadear() {
        for(let i = 0; i < this.nivel; i++) {
            let color = this.numeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }
    iluminarColor(color) {
        this.colores[color].classList.add('light')
        setTimeout(() => this.apagarColor(color), 350)
    }
    apagarColor(color) {
        this.colores[color].classList.remove('light')
    }
    agregarEventoClick() {
        this.colores.celeste.addEventListener('click', this.elegirColor)
        this.colores.violeta.addEventListener('click', this.elegirColor)
        this.colores.naranja.addEventListener('click', this.elegirColor)
        this.colores.verde.addEventListener('click', this.elegirColor)
    }
    quitarEventoClick() {
        this.colores.celeste.removeEventListener('click', this.elegirColor)
        this.colores.violeta.removeEventListener('click', this.elegirColor)
        this.colores.naranja.removeEventListener('click', this.elegirColor)
        this.colores.verde.removeEventListener('click', this.elegirColor)
    }
    elegirColor(e) {
        const nombreDeColor = e.target.dataset.color
        const numeroDeColor = this.colorANumero(nombreDeColor)
        this.iluminarColor(nombreDeColor)
        if(numeroDeColor === this.secuencia[this.subnivel]) {
            console.log('acertó')
            this.subnivel++
            if(this.subnivel === this.nivel) {
                this.nivel++
                this.quitarEventoClick()
                if(this.nivel === (ULTIMO_NIVEL + 1)) {
                    this.ganoElJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500)
                }
            }
        } else {
            this.perdioElJuego()
        }
    }
    ganoElJuego() {
        swal('Bob', 'Ganaste, felicidades!', 'success')
        .then(() => this.inicializar())
    }
    perdioElJuego() {
        swal('Bob', 'Que lastima, perdiste!', 'error')
        .then(() => {
            this.quitarEventoClick()
            this.inicializar()
        })
    }
}

const empezarJuego = () => juego = new Juego()

btnEmpezar.addEventListener('click', empezarJuego)

