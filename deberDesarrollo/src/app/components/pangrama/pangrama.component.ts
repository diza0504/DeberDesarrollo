import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pangrama',
  templateUrl: './pangrama.component.html',
  styleUrls: ['./pangrama.component.css']
})

export class PangramaComponent implements OnInit {

  texto: string = "";
  lstTextoAnalizar: Array<string> = [];
  lstResultados: Array<string> = [];
  fileToUpload: File = null;
  httpClient: any;
  mensaje: string;

  constructor() { }

  ngOnInit(): void {
  }

  procesarTexto() {

    this.texto = jQuery("#txtTexto").val().toString();

    if (this.texto != "") {
      this.limpiarVariables();
      this.lstTextoAnalizar = this.texto.split("\n");

      for (let index = 0; index < this.lstTextoAnalizar.length; index++) {
        if (this.lstTextoAnalizar[index].length <= 255) {
          this.lstTextoAnalizar[index] = this.lstTextoAnalizar[index].replace(/\s+/g, '');
          this.lstTextoAnalizar[index] = this.lstTextoAnalizar[index].replace(/[^a-zA-ZñÑ]/g, '');
          this.lstTextoAnalizar[index] = this.lstTextoAnalizar[index].toLowerCase();
          if (this.verificarEsPangrama(this.lstTextoAnalizar[index])) {
            this.lstResultados.push("Si\t" + this.lstTextoAnalizar[index].length);
          } else {
            this.lstResultados.push("No");
          }
        } else {
          this.lstResultados.push("Error: Excedido número de carácteres (Máx: 255)");
        }
      }

      this.exportarResultados();
    } else {
      this.mensaje = "Error: No existe texto"
    }

  }

  limpiarVariables() {
    this.lstTextoAnalizar = [];
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

  verificarEsPangrama(cadena: string) {
    const ALFABETO_MINUSCULAS = "abcdefghijklmnopqrstuvwxyz";

    let alfabetoComoArreglo = Array.from(ALFABETO_MINUSCULAS);

    for (let indice = 0; indice < alfabetoComoArreglo.length; indice++) {
      let letraActual = alfabetoComoArreglo[indice];
      if (!cadena.includes(letraActual)) return false;
    }
    return true;
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