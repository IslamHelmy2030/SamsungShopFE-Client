import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  siteTitle = 'samsung-shops';

  constructor(
    private translationService: TranslationService,
    public translate: TranslateService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.translate.setTranslation('en', 'ar');
    
    if (localStorage.getItem('language')) {
      let x = localStorage.getItem('language') === 'ar' ? 'rtl' : 'ltr';
      document.getElementsByTagName('body')[0].className = x;
      document.getElementsByTagName('html')[0].setAttribute("lang", localStorage.getItem('language'));
      document.getElementsByTagName('html')[0].setAttribute("dir", x);
      this.translationService.setLanguage(localStorage.getItem('language'));
    } else {
      localStorage.setItem('language', 'en')
      document.getElementsByTagName('html')[0].setAttribute("dir", 'ltr');
      this.translationService.setLanguage(localStorage.getItem('language'));
    }
    
    // translate.addLangs(['en', 'ar']);
    // translate.setDefaultLang('en');

    // const lang = localStorage.getItem('appLang');
    // if (lang != 'en') {
    //   document.getElementsByTagName('body')[0].className = 'ar rtl';
    //   document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    // } else {
    //   document.getElementsByTagName('body')[0].className = 'en';
    // }
    // this.translate.use(lang ? lang : 'ar');
  }

  scrollToTop(): void {
    // scroll to the top of the body
    return this.document.body.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }
}
