import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-cours',
  templateUrl: './single-cours.component.html',
  styleUrls: ['./single-cours.component.css']
})
export class SingleCoursComponent implements OnInit {
  @Input() coursInput:any;
  imgCours!:String;
  constructor() { }

  ngOnInit(): void {
    this.imgCours=this.coursInput.img;
    
   
  }
  coursColor(a:string){
   
      return "red"
  
  }

}
