import { Component, EventEmitter, OnInit } from '@angular/core';
import { ILogin } from 'src/app/dtos/models';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserData } from 'src/app/dtos/common/models';
import { NgxSpinnerService } from 'ngx-spinner';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';
import { TranslationService } from 'src/app/services/translation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  locale: string;

  constructor(
    private authServ: AuthService,
    private spinner: NgxSpinnerService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
    public sharedService: SharedService,
    private translationService: TranslationService
  ) {}

  loginData: ILogin = {
    email: '',
    password: '',
  };
  returnUrl: string;
  selectedLanguage: string = 'en';
  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  loginUser() {
    this.spinner.show();
    this.authServ.loginUser(this.loginData).subscribe(
      (user: IUserData) => {
        this.spinner.hide();
        if (user.isSuccess) {
          localStorage.setItem('language', this.selectedLanguage);
          window.location.reload();
          let text = this.translateService.instant('Welcome');

          this.toasterService.success(text + user.name);

          this.router.navigateByUrl(this.returnUrl);
        } else {
          let text = this.translateService.instant(
            'please enter a valid username or password'
          );
          this.toasterService.error(text);
        }
      },
      (err) => {
        let text = this.translateService.instant(
          'please enter a valid username or password'
        );
        this.toasterService.error(text);
      }
    );
    this.spinner.hide();
  }
}
