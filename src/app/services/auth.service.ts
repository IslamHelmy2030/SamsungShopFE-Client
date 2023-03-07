import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUserData } from '../dtos/common/models';
import { ILogin, IRegisterUser } from '../dtos/models';
import { ConnectionService } from './connection.service';
import { LocalService } from './local.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<IUserData>;
  public user: Observable<IUserData>;

  constructor(
    private connectionService: ConnectionService,
    private localSrv: LocalService
  ) {
    let userData = this.getUserStoredData();
    this.userSubject = new BehaviorSubject<IUserData>(userData);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): IUserData {
    return this.userSubject.value;
  }

  loginUser(data: ILogin) {
    const url = 'auth/Login';
    return this.connectionService.post(url, data).pipe(
      map((user : IUserData) => {        
        this.localSrv.saveData('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      })
    );
  }

  getUserStoredData(): IUserData {
    let userString: string = this.localSrv.getData('user');
    if (userString) return JSON.parse(userString);
    return null;
  }

  registerUser(data: IRegisterUser) {
    const url = 'Auth/Register';
    return this.connectionService.post(url, data);
  }

  logout() {
    // remove user from local storage and set current user to null
    this.localSrv.removeData('user');
    this.userSubject.next(null);
  }
}
