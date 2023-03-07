import { Component, EventEmitter, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IPaginationDto } from 'src/app/dtos/common/models';
import { IHotDeals } from 'src/app/dtos/models';
import { AuthService } from 'src/app/services/auth.service';
import { HotDealsService } from 'src/app/services/hot-deals.service';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-hot-deals',
  templateUrl: './hot-deals.component.html',
  styleUrls: ['./hot-deals.component.css'],
})
export class HotDealsComponent implements OnInit {
  hotDeals: IHotDeals[];

  paginationDto: IPaginationDto = {
    boundaryLinks: true,
    rotate: true,
    currentPage: 1,
    maxSizePagesLinks: 5,
    ellipses: false,
    pageSize: 12,
    totalRowsCount: 0,
  };

  locale: string;
  constructor(
    private hotDealsService: HotDealsService,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private translateService: TranslateService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {


    this.getHotDeals();
  }





  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  getHotDeals() {
    this.spinner.show();
    this.hotDealsService
      .GetVisibleHotDeals(this.paginationDto.currentPage)
      .subscribe(
        (res: any) => {
          if (res.isSuccess) {
            this.hotDeals = res.data;
            this.paginationDto.totalRowsCount = res.totalRowsCount;

            this.hotDeals.forEach((hotDeal) => {
              hotDeal.priceAfterDiscount = hotDeal.price - hotDeal.discount;
            });
          } else {
            this.toasterService.error('Something Went Worng');
          }
          this.spinner.hide();
        },
        (err) => {
          this.spinner.hide();
          if (err.status == 401) {
            this.authService.logout();
            this.toasterService.error(err.statusText);
          }
        }
      );
  }

  loadPage(page: number) {
    window.scrollTo(0, 0);
    this.paginationDto.currentPage = page;
    this.getHotDeals();
  }
}
