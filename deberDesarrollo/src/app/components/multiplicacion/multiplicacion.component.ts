import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multiplicacion',
  templateUrl: './multiplicacion.component.html',
  styleUrls: ['./multiplicacion.component.css']
})
export class MultiplicacionComponent implements OnInit {

  numeroA: number;
  numeroB: number;
  lstVectorPosiciones: Array<number> = [];
  lstVectorValores: Array<number> = [];
  lstResultados: Array<number> = [];
  mensaje = "";
  fileToUpload: File = null;

  constructor() { }

  ngOnInit(): void {
  }

  calcularResultado() {

    if (this.mensaje == "") {
      if (jQuery("#numeroA").val() != "" && jQuery("#numeroB").val() != "") {
        this.numeroA = Number(jQuery("#numeroA").val());
        this.numeroB = Number(jQuery("#numeroB").val());
        this.mensaje = "";
        if (this.numeroA != 0 && this.numeroB != 0) {
          this.generarVectorPosiciones();
          this.generarVectorValores();
          this.imprimirResultado(1);
        } else {
          this.imprimirResultado(0);
        }
      } else {
        this.mensaje = "Error: Existen campos vacios.";
      }
    }
  }

  limpiarVariables() {
    this.lstVectorPosiciones = [];
    this.lstVectorValores = [];
    this.lstResultados = [];
    this.fileToUpload = null;
  }

  generarVectorPosiciones() {

    let cantidadValores: number = this.numeroA.toString().length * this.numeroB.toString().length * 2;
    let cantidadColumnas: number = this.numeroB.toString().length * 2;
    let contadorInicial: number = 0;
    let auxiliar: number = contadorInicial;

    do {
      this.lstVectorPosiciones.push(auxiliar)
      for (let index = 0; index < cantidadColumnas - 2; index++) {
        if (index % 2 == 0) {
          auxiliar++;
        }
        this.lstVectorPosiciones.push(auxiliar)
      }
      this.lstVectorPosiciones.push(auxiliar + 1);
      contadorInicial++;
      auxiliar = contadorInicial;
    } while (this.lstVectorPosiciones.length < cantidadValores)

  }

  generarVectorValores() {

    for (let indexNumeroA = 0; indexNumeroA < this.numeroA.toString().length; indexNumeroA++) {
      let valorA = this.numeroA.toString()[indexNumeroA];
      for (let indexNumeroB = 0; indexNumeroB < this.numeroB.toString().length; indexNumeroB++) {
        let valorB = this.numeroB.toString()[indexNumeroB];
        let resultado: number = Number(valorA) * Number(valorB);
        if (resultado < 10) {
          this.lstVectorValores.push(0);
          this.lstVectorValores.push(resultado);
        } else {
          let resultadoString: string = resultado.toString();
          this.lstVectorValores.push(Number(resultadoString[0]));
          this.lstVectorValores.push(Number(resultadoString[1]));
        }
      }
    }

    this.calcularTotales();

  }

  calcularTotales() {

    const unicosValores = this.lstVectorPosiciones.filter((valor, indice) => {
      return this.lstVectorPosiciones.indexOf(valor) === indice;
    }
    );

    let auxiliar: number = 0;
    for (let index = unicosValores.length - 1; index >= 0; index--) {
      const element = unicosValores[index];
      let suma: number = 0;
      for (let indexPosicion = 0; indexPosicion < this.lstVectorPosiciones.length; indexPosicion++) {
        if (element == this.lstVectorPosiciones[indexPosicion]) {
          suma += this.lstVectorValores[indexPosicion];
        }
      }
      suma += auxiliar;
      if (suma >= 10) {
        auxiliar = Math.trunc(suma / 10);
        this.lstResultados.push(suma % 10);
      } else {
        auxiliar = 0;
        this.lstResultados.push(suma);
      }

      suma = 0;
    }

  }

  imprimirResultado(verificador: number) {
    let resultado: string = "";
    if (verificador != 0) {
      for (let index = this.lstResultados.length - 1; index >= 0; index--) {
        resultado += this.lstResultados[index];
      }
    } else {
      resultado = "0";
    }
    jQuery("#resultado").val(Number(resultado));

    var uri = "data:application/octet-stream," + encodeURIComponent(resultado);
    window.open(uri);
    location.reload();
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      if (fileReader.result.toString().split("\n").length != 2) {
        this.mensaje = "Error: Cantidad de valores incorrectos";
      } else {
        let valorA = fileReader.result.toString().split("\n")[0];
        let valorB = fileReader.result.toString().split("\n")[1];

        if (valorA.length > 100) {
          this.mensaje = "Error: Primer Número supera la longitud";
          this.fileToUpload = null;
        } else if (valorB.length > 100) {
          this.mensaje = "Error: Segundo Número supera la longitud";
          this.fileToUpload = null;
        } else if (this.tiene_letras(valorA) || this.tiene_letras(valorB)) {
          this.mensaje = "Error: Números en archivos incorrectos";
          this.fileToUpload = null;
        } else {
          jQuery("#numeroA").val(valorA);
          jQuery("#numeroB").val(valorB);
        }
      }
    }
    fileReader.readAsText(this.fileToUpload);
    jQuery("#resultado").val("");
  }


  tiene_letras(texto): boolean {
    const LETRAS = "abcdefghyjklmnñopqrstuvwxyz";
    texto = texto.toLowerCase();
    for (let i = 0; i < texto.length; i++) {
      if (LETRAS.indexOf(texto.charAt(i), 0) != -1) {
        return true;
      }
    }
    return false;
  }

}
