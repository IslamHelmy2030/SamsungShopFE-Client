import { Component, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { IUserData } from 'src/app/dtos/common/models';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  selectedLanguage: string = 'en';

  constructor(
    private router: Router,
    public sharedService: SharedService,
    private authService: AuthService,
    private translateService: TranslateService,
    private translationService: TranslationService,
  ) {}
  user: IUserData;
  isLogin: boolean;
  flag = {
    en: 'assets/flags/us.svg',
    ar: 'assets/flags/eg.svg',
  };

  ngOnInit(): void {
    this.user = this.authService.userValue;
    this.isLogin = this.user != null;
   this.selectedLanguage =  this.translationService.getSelectedLanguage()
  }

  enSelected: boolean;

  switchLang(lang) {
    localStorage.setItem('language',lang)
    window.location.reload();
    // if (lang === 'ar') {

    //   this.enSelected = false;
    // } else {
     
    //   this.enSelected = true;
    // }
  }




  SignOut() {
    this.isLogin = false;
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
