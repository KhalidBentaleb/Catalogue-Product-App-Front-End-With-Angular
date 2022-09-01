import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category';
import { CustomHttpRespone } from '../model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.host}/category/list`);
  }

  public addCategory(formData: FormData): Observable<Category> {
    return this.http.post<Category>(`${this.host}/category/add`, formData);
  }

  public updateCategory(formData: FormData): Observable<Category> {
    return this.http.post<Category>(`${this.host}/category/update`, formData);
  }

  public deleteCategory(name: string): Observable<CustomHttpRespone> {
    return this.http.delete<CustomHttpRespone>(`${this.host}/category/delete/${name}`);
  }

  public createCategoryFormDate(currentName: string, category: Category, categoryImage: File): FormData {
    const formData = new FormData();
    formData.append('currentName', currentName);
    formData.append('name', category.name);
    formData.append('categoryImage', categoryImage);
    return formData;
  }

}
