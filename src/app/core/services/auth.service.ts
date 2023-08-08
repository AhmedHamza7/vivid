import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  register(registerData:FormData):Observable<any> {
    return this.http.post('https://tarmeezacademy.com/api/v1/register', registerData )
  }
}
