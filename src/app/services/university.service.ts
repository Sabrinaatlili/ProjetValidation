import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  // déclaration du @destinataire 
  universiteUrl: string="http://localhost:3000/universities";
  constructor(private httpClient: HttpClient) { }


    searchUniversity(country:any){
      return this.httpClient.post<{result:any}>(this.universiteUrl,country)
     }


  
}
