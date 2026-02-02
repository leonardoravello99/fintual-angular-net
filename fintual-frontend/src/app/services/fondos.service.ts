import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VariacionFinal } from '../models/variacion-final.model';

@Injectable({
  providedIn: 'root'
})
export class FondosService {

  private apiUrl = 'https://localhost:7144/api/Fondos'

  constructor(private http:HttpClient) { }

  getVariaciones(
    assetId: number,
    from: string,
    to: string
  ): Observable<VariacionFinal[]>{
    return this.http.get<VariacionFinal[]>(
      `${this.apiUrl}/variacionfinal`,
      {
        params: {
          assetId,
          from,
          to
        }
      }
    );
  }
}
