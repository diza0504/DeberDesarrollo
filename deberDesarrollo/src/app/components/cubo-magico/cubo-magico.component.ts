import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cubo-magico',
  templateUrl: './cubo-magico.component.html',
  styleUrls: ['./cubo-magico.component.css']
})
export class CuboMagicoComponent implements OnInit {

  lstNumeros: Array<number> = [];
  lstNumerosCompletos: Array<number> = [];
  lstSumaFilas: Array<number> = [];
  lstSumaColumnas: Array<number> = [];
  isClicked: boolean = false;
  auxiliar: number;
  mensaje: string;

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(number) {

    this.mensaje="";

    if (!this.isClicked) {
      switch (number) {
        case 1: case 3: case 5: case 7: case 9:
          this.deshabilitarPares();
          break;
        case 2: case 4: case 6: case 8: case 0:
          this.deshabilitarImpares();
          break;
      }
      this.isClicked = true;
    }

    if (!this.verificarExisteNumero(number)) {
      this.lstNumeros.push(number);
    } else {
      const index = this.lstNumeros.indexOf(number, 0);
      if (index > -1) {
        this.lstNumeros.splice(index, 1);
      }
    }

    this.imprimirNumeros();

  }

  generarCuadrado(): void {
    if (this.lstNumeros.length != 0 && this.lstNumeros.length % 2 == 0 && this.lstNumeros.length < 3) {
      this.generarVectorValores();
      this.modificarVector();
      this.mensaje = "";
    } else {
      this.mensaje = "Error: Cantidad de numeros seleccionados (Máx: 2).";
    }
  }

  modificarVector(): void {

    this.auxiliar = this.lstNumerosCompletos[0];
    this.lstNumerosCompletos[0] = this.lstNumerosCompletos[15];
    this.lstNumerosCompletos[15] = this.auxiliar;

    this.auxiliar = this.lstNumerosCompletos[3];
    this.lstNumerosCompletos[3] = this.lstNumerosCompletos[12];
    this.lstNumerosCompletos[12] = this.auxiliar;

    this.auxiliar = this.lstNumerosCompletos[5];
    this.lstNumerosCompletos[5] = this.lstNumerosCompletos[10];
    this.lstNumerosCompletos[10] = this.auxiliar;

    this.auxiliar = this.lstNumerosCompletos[6];
    this.lstNumerosCompletos[6] = this.lstNumerosCompletos[9];
    this.lstNumerosCompletos[9] = this.auxiliar;

    jQuery("#mensajeResultado").css("visibility", "visible");

    this.calcularTotales();

  }

  limpiarDatos(): void {
    jQuery("#mensajeResultado").css("visibility", "hidden");
    this.habilitatBotones();
    jQuery("#txtNumeros").val("");
    this.lstNumeros = [];
    this.lstNumerosCompletos = [];
    this.lstSumaFilas = [];
    this.lstSumaColumnas = [];
    this.isClicked = false;
  }

  calcularTotales(): void {
    let suma: number = 0;
    let contador: number = 1;
    // Calculo totales filas
    for (let index = 0; index < this.lstNumerosCompletos.length; index++) {
      suma += Number(this.lstNumerosCompletos[index]);
      if (contador == 4) {
        this.lstSumaFilas.push(suma);
        suma = 0;
        contador = 0;
      }
      contador++;
    }
    // Calculo totales columnas
    for (let index = 0; index < 4; index++) {
      suma = Number(this.lstNumerosCompletos[index]) + Number(this.lstNumerosCompletos[index + 4]) + Number(this.lstNumerosCompletos[index + 8]) + Number(this.lstNumerosCompletos[index + 12]);
      this.lstSumaColumnas.push(suma);
    }
  }

  generarVectorValores(): void {
    this.lstNumeros = this.lstNumeros.sort();
    let indice: number = 0;
    for (let index: number = 0; index < 16; index++) {
      if (index % Number(this.lstNumeros.length) == 0) {
        indice = 0;
      }
      this.lstNumerosCompletos.push(this.lstNumeros[indice]);
      indice++;
    }
  }

  deshabilitarPares(): void {
    jQuery("#btnCero").prop("disabled", true);
    jQuery("#btnDos").prop("disabled", true);
    jQuery("#btnCuatro").prop("disabled", true);
    jQuery("#btnSeis").prop("disabled", true);
    jQuery("#btnOcho").prop("disabled", true);
  }

  deshabilitarImpares(): void {
    jQuery("#btnUno").prop("disabled", true);
    jQuery("#btnTres").prop("disabled", true);
    jQuery("#btnCinco").prop("disabled", true);
    jQuery("#btnSiete").prop("disabled", true);
    jQuery("#btnNueve").prop("disabled", true);
  }

  habilitatBotones() {
    jQuery("#btnCero").prop("disabled", false);
    jQuery("#btnDos").prop("disabled", false);
    jQuery("#btnCuatro").prop("disabled", false);
    jQuery("#btnSeis").prop("disabled", false);
    jQuery("#btnOcho").prop("disabled", false);
    jQuery("#btnUno").prop("disabled", false);
    jQuery("#btnTres").prop("disabled", false);
    jQuery("#btnCinco").prop("disabled", false);
    jQuery("#btnSiete").prop("disabled", false);
    jQuery("#btnNueve").prop("disabled", false);
  }

  verificarExisteNumero(number): boolean {

    for (let index = 0; index < this.lstNumeros.length; index++) {
      const element = this.lstNumeros[index];
      if (element === number) {
        return true;
      }
    }
    return false;

  }

  imprimirNumeros() {

    var texto = "";

    for (let index = 0; index < this.lstNumeros.length; index++) {
      texto += this.lstNumeros[index] + "-";
    }

    texto = texto.substring(0, texto.length - 1);

    jQuery("#txtNumeros").val(texto);

  }

}
