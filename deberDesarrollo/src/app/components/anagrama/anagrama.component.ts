import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  texto: string = "";
  lstTextoAnalizar: Array<string> = [];
  lstNumerosPrimos: Array<number> = [];
  lstValorPalabra: Array<number> = [];
  lstResultados: Array<string> = [];
  fileToUpload: File = null;
  mensaje: string;
  private LETRAS_ANALIZAR: string = "abcdefghijklmnñopqrstuvwxyzáéíóúü";

  constructor() { }

  ngOnInit(): void {
  }

  procesarTexto() {

    this.texto = jQuery("#txtTexto").val().toString();

    if (this.texto != "") {
      this.mensaje = "Procesando....."
      this.lstTextoAnalizar = this.texto.split("\n");
      this.generarNumerosPrimos(this.LETRAS_ANALIZAR.length);
      for (let index = 0; index < this.lstTextoAnalizar.length; index++) {
        this.lstTextoAnalizar[index] = this.lstTextoAnalizar[index].replace(/\s+/g, '').toLowerCase()
        this.obtenerValorTexto(this.lstTextoAnalizar[index]);
      }
      this.obtenerPalabras();
      this.exportarResultados();
      this.mensaje = "";
    } else {
      this.mensaje = "Error: No existe texto"
    }

  }

  obtenerPalabras(): void {
    const unicosValores = this.lstValorPalabra.filter((valor, indice) => {
      return this.lstValorPalabra.indexOf(valor) === indice;
    }
    );
    let resultadoAnagrama = "";
    for (let index = 0; index < unicosValores.length; index++) {
      for (let indiceValores = 0; indiceValores < this.lstValorPalabra.length; indiceValores++) {
        if (this.lstValorPalabra[indiceValores] == unicosValores[index]) {
          resultadoAnagrama += this.lstTextoAnalizar[indiceValores] + "-";
        }
      }
      resultadoAnagrama = resultadoAnagrama.substr(0, resultadoAnagrama.length - 1);
      this.lstResultados.push(resultadoAnagrama);
      resultadoAnagrama = "";
    }
  }

  obtenerValorTexto(texto: string) {
    let indicadorPalabra: number = 1;
    for (let index = 0; index < texto.length; index++) {
      let element: string = texto[index];
      let position: number = this.LETRAS_ANALIZAR.indexOf(element);
      indicadorPalabra *= this.lstNumerosPrimos[position];
    }
    this.lstValorPalabra.push(indicadorPalabra);
  }

  generarNumerosPrimos(cantidad: number) {
    let cont: number = 1;
    let numero: number = 1;
    do {

      if (this.verificarEsPrimo(numero)) {
        this.lstNumerosPrimos.push(numero);
        cont++;
      }
      numero++;
    } while (cont <= cantidad);

  }

  verificarEsPrimo(numero: number): boolean {
    if (numero == 0 || numero == 1 || numero == 4) return false;
    for (let x = 2; x < numero / 2; x++) {
      if (numero % x == 0) return false;
    }
    // Si no se pudo dividir por ninguno de los de arriba, sí es primo
    return true;
  }

  limpiarVariables() {
    this.lstTextoAnalizar = [];
    this.lstNumerosPrimos = [];
    this.lstValorPalabra = [];
    this.lstResultados = [];
  }

  exportarResultados() {
    let content: string = "";

    for (let index = 0; index < this.lstResultados.length; index++) {
      content += this.lstResultados[index];
      content += "\n";
    }

    var uri = "data:application/octet-stream," + encodeURIComponent(content);
    location.href = uri;

    this.limpiarVariables();
    jQuery("#txtTexto").val("");
    jQuery("#customFile").val("");

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      jQuery("#txtTexto").val(fileReader.result.toString());
    }
    fileReader.readAsText(this.fileToUpload);
  }
}

