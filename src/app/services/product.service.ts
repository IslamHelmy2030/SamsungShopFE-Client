import { IProduct, IProductDetails, IProductRequestDto } from '../dtos/models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root',
})
export class productService {
  constructor(private connectionService: ConnectionService) {}

  GetVisibleProducts(data: IProductRequestDto) {
    const url = 'Product';
    return this.connectionService.post(url, data);
  }

  GetAllProducts(productId): Observable<IProduct[]> {
    const url = `Product/All/${productId}`;
    return this.connectionService.get(url);
  }

  AddProduct(data) {
    const url = 'Product/Add';
    return this.connectionService.post(url, data);
  }

  UpdateProduct(data) {
    const url = 'Product/Update';
    return this.connectionService.put(url, data);
  }

  DeleteProduct(productId) {
    const url = `Product/Delete/${productId}`;
    return this.connectionService.delete(url);
  }

  GetProductDetails(productId): Observable<IProductDetails> {
    const url = `Product/Details/${productId}`;
    return this.connectionService.get(url);
  }

  // private handleError(error: HttpErrorResponse) {
  //   // Generic Error handler
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `,
  //       error.error
  //     );
  //   }
  //   // Write error details in Generic error log

  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Error occured, please try again'));
  // }
}
