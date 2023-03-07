import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { MustMatch } from 'src/app/dtos/common/Validators/CustomValidators';
import { IRegisterUser } from 'src/app/dtos/models';
import { AuthService } from 'src/app/services/auth.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  locale: string;

  signUpForm: FormGroup;
  constructor(
    private authServ: AuthService,
    private spinner: NgxSpinnerService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private translateService: TranslateService,
    public sharedService: SharedService
  ) {
    const formOptions: AbstractControlOptions = {
      validators:[ MustMatch('password', 'confirmPassword'),MustMatch('email', 'confirmEmail')],
    };

    this.signUpForm = fb.group(
      {
        firstName: ['', [, Validators.minLength(3), Validators.required]],
        lastName: ['', [, Validators.minLength(3), Validators.required]],
        address: ['', [, Validators.required]],

        password: ['', [, Validators.required]],
        confirmPassword: ['', [, Validators.required]], //TODO here custome to comfirm password

        email: ['', [, Validators.required, Validators.email]],
        confirmEmail: [
          '',
          [
            Validators.required,
            Validators.email, //TODO here custome to confirme email
          ],
        ],
        phoneNumber: [''],
        birthdate: [''],
      },
      formOptions,
    );
  }

  returnUrl: string;

  ngOnInit(): void {
    this.locale = this.translateService.currentLang;
    localStorage.setItem('appLang', this.locale);

    this.changeDirection();

    this.langChanged();

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/auth/login';
  }

  private changeDirection() {
    if (this.locale != 'en') {
      document.getElementsByTagName('body')[0].className = 'ar rtl';
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    } else {
      document.getElementsByTagName('body')[0].className = 'en';
    }
  }

  private langChanged() {
    this.onLangChange.subscribe((langObject) => {
      this.locale = langObject.lang;

      this.changeDirection();
    });
  }

  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  get f() {
    return this.signUpForm.controls;
  }

  get firstName() {
    return this.signUpForm.get('firstName')!;
  }
  get lastName() {
    return this.signUpForm.get('lastName')!;
  }
  get address() {
    return this.signUpForm.get('address')!;
  }
  get password() {
    return this.signUpForm.get('password')!;
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword')!;
  }

  get email() {
    return this.signUpForm.get('email')!;
  }
  get confirmEmail() {
    return this.signUpForm.get('confirmEmail')!;
  }
  get phoneNumber() {
    return this.signUpForm.get('phoneNumber')!;
  }
  get birthdate() {
    return this.signUpForm.get('birthdate')!;
  }

  registerUser() {
    this.signUpForm.markAllAsTouched();

    if (this.signUpForm.valid) {
      this.spinner.show();

      this.authServ.registerUser(this.signUpForm.value).subscribe(
        (res: any) => {
          this.spinner.hide();
          if (res.isSuccess) {
            this.toasterService.success('Registeration Sucessuflly');
            this.router.navigate([this.returnUrl]);
          } else {
            this.toasterService.error('Data is invalid');
          }
        },
        (err) => {
          this.toasterService.error('Error', err);
        }
      );
    }

    this.spinner.hide();
  }
}
