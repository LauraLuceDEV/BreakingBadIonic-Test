import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {BBCharacter, characterQuote} from '../Models/Interfaces';

@Injectable({
  providedIn: 'root'
})
export class BreakingBadApiService {
  private apiURL = `https://www.breakingbadapi.com/api`;

  constructor(private request: HttpClient) { }

  // Nos devuelve a todos los personajes
  getAllcharacters(): Observable<BBCharacter[]>{
    const url = `${this.apiURL}/characters`;
    return this.request.get<BBCharacter[]>(url);
  }

  // Nos devuelve a un personaje a través de su ID
  getcharacterByID(id: number): Observable<BBCharacter[]>{
    const url = `${this.apiURL}/characters/${id}`;
    return this.request.get<BBCharacter[]>(url);
  }

  // Nos devuelve a un personaje aleatorio
  getRandomcharacter(): Observable<BBCharacter[]>{
    const url = `${this.apiURL}/character/random`;
    return this.request.get<BBCharacter[]>(url);
  }

  // Nos devuelve las frases del personaje que le pasemos por parámetro
  getRandomQuote(autor: string): Observable<characterQuote[]>{
    const str = autor.split(' ');
    autor = `${str[0]}%20${str[1]}`;
    const url = `${this.apiURL}/quote?author=${autor}`;
    return this.request.get<characterQuote[]>(url);
  }

}
