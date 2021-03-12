import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cubo-magico',
  templateUrl: './cubo-magico.component.html',
  styleUrls: ['./cubo-magico.component.css']
})
export class CuboMagicoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClickButton(number) {

    console.log(number);

  }

}
