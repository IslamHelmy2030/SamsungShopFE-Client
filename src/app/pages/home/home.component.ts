import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  locale: string;

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.locale = this.translateService.currentLang;
    this.onLangChange();
  }

  private onLangChange() {
    this.translateService.onLangChange.subscribe((langObj) => {
      this.locale = langObj.lang;
      // this.columns = this.Columns;
    });
  }
}
