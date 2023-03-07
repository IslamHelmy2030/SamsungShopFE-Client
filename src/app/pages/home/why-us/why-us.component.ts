import { Component, EventEmitter, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-why-us',
  templateUrl: './why-us.component.html',
  styleUrls: ['./why-us.component.css'],
})
export class WhyUsComponent implements OnInit {
  locale: string;

  constructor(
    private translateService: TranslateService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {


  }

 

  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }
}
