import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  map, tap } from 'rxjs/operators';

export type ApiResponse = {
  results: {}
}

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {
  private url:  string = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100';
  constructor(
    private httpClient: HttpClient
  ) { }

  get apiListAllPokemons():Observable<any>{
    return this.httpClient.get<any>(this.url).pipe(
      tap( res => res ),
      tap( res => {
        res.results.map( (resPokemons: any) => {

          this.apiGetPokemon(resPokemons.url).subscribe(
            res => resPokemons.status = res
          );

        })
      })
    )
  }

  public apiGetPokemon( url: string ):Observable<any>{
    return this.httpClient.get<any>( url ).pipe(
      map(
        res => res
      )
    )
  }
  
}
