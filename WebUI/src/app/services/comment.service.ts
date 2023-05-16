import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { APIResponse } from '../Models/APIResponse';
import { HttpHeaders } from '@angular/common/http';
import { Comment } from '../Models/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private apiUrl = `${environment.baseApiUrl}moments/comments`;
  httpopt = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  constructor(private http: HttpClient) { }

  createComment(data: Comment): Observable<APIResponse<Comment>>{
    return this.http.post<APIResponse<Comment>>(this.apiUrl, data, this.httpopt)
  }

  getComments(momentId: Number){
    return this.http.get<Comment[]>(`${this.apiUrl}/${momentId}`,this.httpopt)
  }
}
