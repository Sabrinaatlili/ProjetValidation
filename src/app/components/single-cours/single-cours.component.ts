import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-cours',
  templateUrl: './single-cours.component.html',
  styleUrls: ['./single-cours.component.css']
})
export class SingleCoursComponent implements OnInit {
  @Input() coursInput:any;
  constructor() { }

  ngOnInit(): void {
  }

}
