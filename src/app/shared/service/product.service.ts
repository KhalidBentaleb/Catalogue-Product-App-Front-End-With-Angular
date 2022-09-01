import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.host}/product/list`);
  }

  public addProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.host}/product/add`, formData);
  }

  public updateProduct(formData: FormData): Observable<Product> {
    return this.http.post<Product>(`${this.host}/product/update`, formData);
  }

  public deleteProduct(name: string): Observable<CustomHttpRespone> {
    return this.http.delete<CustomHttpRespone>(`${this.host}/product/delete/${name}`);
  }

  public createProductFormDate(currentName: string, product: Product, productImage: File): FormData {
    const formData = new FormData();
    formData.append('currentName', currentName);
    formData.append('name', product.name);
    formData.append('price', product.price);
    formData.append('currency', product.currency);
    formData.append('productImage', productImage);
    return formData;
  }

}
