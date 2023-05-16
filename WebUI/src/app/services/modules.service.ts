import { HttpClient , HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modules } from '../Models/Modules';


@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  private apiUrl = `${environment.baseApiUrl}Modules`
  constructor(private http: HttpClient) { }

  getAll(perfil: String) : Observable<Modules[]>{
    return this.http.get<Modules[]>(`${this.apiUrl}/${perfil}`);
  }

}
