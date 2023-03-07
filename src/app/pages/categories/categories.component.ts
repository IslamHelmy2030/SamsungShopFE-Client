import { Component, EventEmitter, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ICategory } from 'src/app/dtos/models';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  locale: string;
  constructor(
    private toasterService: ToastrService,
    private categoryService: CategoryService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private translateService: TranslateService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {
 
    this.getCategories();
  }



  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  getCategories() {
    this.spinner.show();
    this.categoryService.GetVisibleCategories().subscribe(
      (res: any) => {
        if (res.isSuccess) {
          this.categories = res.data;
        } else {
          if (res.message) this.toasterService.error(res.message);
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        if (err.status == 401) {
          this.toasterService.error(err.statusText);
          this.authService.logout();
        }
      }
    );
  }
}
