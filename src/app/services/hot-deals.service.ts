import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IHotDeals } from '../dtos/models';
import { ConnectionService } from './connection.service';

@Injectable({
  providedIn: 'root',
})
export class HotDealsService {
  constructor(private connectionService: ConnectionService) {}

  GetVisibleHotDeals(data): Observable<IHotDeals[]> {
    const url = `HotDeals/${data}`;
    return this.connectionService.get(url);
  }

  GetAllHotDeals(data): Observable<IHotDeals[]> {
    const url = `HotDeals/All/${data}`;
    return this.connectionService.get(url);
  }

  AddHotDeal(data) {
    const url = 'HotDeals/Add';
    return this.connectionService.post(url, data);
  }
}
