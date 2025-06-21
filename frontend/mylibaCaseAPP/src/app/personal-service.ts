import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Personal{
  id?:string;
  name:string;
  surname:string;
  email:string;
}
@Injectable({
  providedIn: 'root'
})
export class PersonalService {
  private apiUrl='http://localhost:5269/api/user';

  constructor(private http:HttpClient) { }
  getPersonals():Observable<Personal[]>{
    return this.http.get<Personal[]>(this.apiUrl);
  }
  addPersonal(personal: Personal):Observable<Personal>{
    const{name,surname,email}=personal;
    return this.http.post<Personal>(this.apiUrl,personal);
  }
  updatePersonal(id:string,personal:Personal):Observable<Personal>{
    return this.http.put<Personal>(`${this.apiUrl}/${id}`, personal);
  }
  deletePersonal(id:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
