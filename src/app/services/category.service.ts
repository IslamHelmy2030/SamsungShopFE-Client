import { ICategory } from '../dtos/models';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private connectionService: ConnectionService) {}

  // private Category: ICategory[] = [
  //   {
  //     Id: 1,
  //     Name: 'TV',
  //     Description: 'Description of Category',
  //     ImageFile:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqKbrDrFmipnXufcx2TJZwGfZK7fWJgmtYotJMenGs5m4kN46UVperw2hTpXe9wvEwE8&usqp=CAU?',
  //     IsVisible: true,
  //   },
  //   {
  //     Id: 2,
  //     Name: 'Mobiles',
  //     Description: 'Description of Category',
  //     ImageFile:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiqKbrDrFmipnXufcx2TJZwGfZK7fWJgmtYotJMenGs5m4kN46UVperw2hTpXe9wvEwE8&usqp=CAU?',
  //     IsVisible: true,
  //   },
  //   {
  //     Id: 3,
  //     Name: 'Kitchens',
  //     Description: 'Description of Category',

  //     ImageFile:
  //       'https://rukminim1.flixcart.com/image/800/600/television/k/z/d/samsung-65ku6470-original-imaezvg2h42ftwep.jpeg?',

  //     IsVisible: true,
  //   },
  //   {
  //     Id: 3,
  //     Name: 'Accessories',
  //     Description: 'Description of Category',

  //     ImageFile:
  //       'https://rukminim1.flixcart.com/image/800/600/television/k/z/d/samsung-65ku6470-original-imaezvg2h42ftwep.jpeg?',

  //     IsVisible: true,
  //   },
  // ];

  GetVisibleCategories(): Observable<ICategory[]> {
    const url = 'Category';
    return this.connectionService.get(url);
  }

  // GetAllCategories(): Observable<ICategory[]> {
  //   const url = 'Category/All';
  //   return this.connectionService.get(url);
  // }

  // AddCategory(data) {
  //   const url = 'Category/Add';
  //   return this.connectionService.post(url, data);
  // }

  // UpdateCategory(data) {
  //   const url = 'Category/Update';
  //   return this.connectionService.put(url, data);
  // }

  // DeleteCategory(categoryId) {
  //   const url = `Category/Delete/${categoryId}`;
  //   return this.connectionService.delete(url);
  // }
}
