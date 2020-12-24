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
        setTimeout(() => this.parpadear(), 1000)
    }

    inicializar() {
        btnEmpezar.classList.add('hide')
        this.nivel = 1
        this.colores = {
            celeste, violeta, naranja, verde
        }
    }
    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map( n => Math.floor(Math.random() * 4))
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
}

const empezarJuego = () => juego = new Juego()

btnEmpezar.addEventListener('click', empezarJuego)

