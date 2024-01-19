import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniversityService } from 'src/app/services/university.service';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.css']
})
export class UniversityComponent implements OnInit {
  universiteForm!:FormGroup;
  universiteResult : any;
  test=false;
  constructor(private formBuilder:FormBuilder,
    private universiteService: UniversityService) { }

  ngOnInit(): void {
    this.universiteForm =this.formBuilder.group({
      country:["",[Validators.required,Validators.minLength(5)]],
    })
  }
  search(){
    const requestData = {
      country: this.universiteForm.get('country')?.value
  };
  console.log(requestData);
  
   this.universiteService.searchUniversity(requestData).subscribe((data)=>{
   console.log("here response from BE",data.result);
    this.universiteResult=data.result
    this.test=true
   })

  }

}
