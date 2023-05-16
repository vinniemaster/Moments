import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isEmpty, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Moments } from '../Models/Moments';
import { APIResponse } from '../Models/APIResponse';
import { MessagesService } from './messages.service';
import { TypeofExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class MomentsService {
  private response!: APIResponse<Moments>;
  private post!: APIResponse<Moments>;
  private apiUrl = `${environment.baseApiUrl}Moments`;
  httpopt = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  
  constructor(private http: HttpClient, private messageService: MessagesService) { }

  getAll(): Observable<Moments[]>{
    return this.http.get<Moments[]>(this.apiUrl, this.httpopt)
  }
  

  getByID(id: Number): Observable<APIResponse<Moments>>{
    return this.http.get<APIResponse<Moments>>(`${this.apiUrl}/${id}`, this.httpopt)
  }

  createMoment(moment: Moments): APIResponse<Moments>{

    this.post = { data : moment}
    this.http.post<APIResponse<Moments>>(this.apiUrl, this.post, this.httpopt).subscribe((res) => {
      this.response = res
      this.messageService.showMessage(res.message!)

    })

    return this.response;
  }

  removeMoment(id: Number){
    return this.http.delete<APIResponse<Moments>>(`${this.apiUrl}/${id}`, this.httpopt)
  }


  updateMoment(moment: Moments){

    this.post = { data : moment}
    return this.http.post<APIResponse<Moments>>(this.apiUrl, this.post, this.httpopt)
  }
}
