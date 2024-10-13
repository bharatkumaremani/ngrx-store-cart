import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private apiUrl = 'https://gist.githubusercontent.com/varmab/282214a56768a91e67ca28a433269762/raw/0ed78335874977e2fa7f1c7dd0c1db710ee8873e/products.json';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}