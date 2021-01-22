import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Product } from '../model/product.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList: Product[];
  private productListSubject = new BehaviorSubject<Product[]>([]);
  productList$ = this.productListSubject.asObservable();

  constructor(private http : HttpClient) { }

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      map((products) => {
        this.productListSubject.next(products);
        this.productList = products;
        return products;
      })
    );
  }

  filterProductListByCategory(category: string) {
    let filteredData = [...this.productList.filter(product => product.category === category)];
    this.productListSubject.next(filteredData);
  }

  clearProductListFilter() {
    this.productListSubject.next(this.productList.slice());
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`https://fakestoreapi.com/products/${id}`);
  }

  deleteProduct(id: number): void {
    this.productList.splice(id, 1);
    this.productListSubject.next(this.productList.slice());
  }

  updateProduct(newProduct: Product): Observable<boolean> {
    this.productList[newProduct.id - 1] = newProduct;
    this.productListSubject.next(this.productList.slice());
    return of(true);
  }
}
