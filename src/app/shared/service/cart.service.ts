import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomHttpRespone } from '../model/custom-http-response';
import { Invoice } from '../model/invoice';
import { ProductInvoice } from '../model/productInvoice';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.host}/invoice/list`);
  }

  public getProductInvoices(): Observable<ProductInvoice[]> {
    return this.http.get<ProductInvoice[]>(`${this.host}/invoice/productinvoices/list`);
  }

  public addInvoice(formData: FormData): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.host}/invoice/add`, formData);
  }

  public addProductInvoice(formData: FormData): Observable<ProductInvoice> {
    return this.http.post<ProductInvoice>(`${this.host}/invoice/productinvoices/add`, formData);
  }

  public deleteInvoice(id: number): Observable<CustomHttpRespone> {
    return this.http.delete<CustomHttpRespone>(`${this.host}/invoice/delete/${id}`);
  }

  public deleteProductInvoice(id: number): Observable<CustomHttpRespone> {
    return this.http.delete<CustomHttpRespone>(`${this.host}/invoice/productinvoices/delete/${id}`);
  }

}
