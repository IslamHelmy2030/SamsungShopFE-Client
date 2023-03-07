import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { productService } from '../../services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IProduct, IProductRequestDto } from 'src/app/dtos/models';
import { IPaginationDto } from 'src/app/dtos/common/models';
import { AuthService } from 'src/app/services/auth.service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  paginationDto: IPaginationDto = {
    boundaryLinks: true,
    rotate: true,
    currentPage: 1,
    maxSizePagesLinks: 5,
    ellipses: false,
    pageSize: 12,
    totalRowsCount: 0,
  };
  products: IProduct[] = [];
  categoryId: number;
  routeSub: any;
  locale: string;

  constructor(
    private ProductServer: productService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private translateService: TranslateService,
    public sharedService: SharedService
  ) {}

  ngOnInit(): void {


   // this.langChanged();
    this.routeSub = this.route.params.subscribe((params) => {
      this.categoryId = params['id'];
      this.getProducts();
    });
  }

  // private changeDirection() {
  //   if (this.locale != 'en') {
  //     document.getElementsByTagName('body')[0].className = 'ar rtl';
  //     document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
  //   } else {
  //     document.getElementsByTagName('body')[0].className = 'en';
  //   }
  // }

  // private langChanged() {
  //   this.onLangChange.subscribe((langObject) => {
  //     this.locale = langObject.lang;

  //     this.changeDirection();
  //     this.getProducts();
  //   });
  // }

  get onLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange;
  }

  getProducts() {
    this.spinner.show();
    let productRequestDto: IProductRequestDto = {
      categoryId: this.categoryId,
      pageNumber: this.paginationDto.currentPage,
    };
    this.ProductServer.GetVisibleProducts(productRequestDto).subscribe(
      (res: any) => {
        if (res.isSuccess) {
          this.products = res.data;
          this.paginationDto.totalRowsCount = res.totalRowsCount;

          this.products.forEach((product) => {
            product.priceAfterDiscount = product.price - product.discountAmount;
          });
        } else {
          this.toasterService.error('Something Went Worng');
        }
        this.spinner.hide();
      },
      (err) => {
        //this.toasterService.error('Error', err);
        this.spinner.hide();
        if (err.status == 401) {
          this.toasterService.error(err.statusText);
          this.authService.logout();
        }
      }
    );
  }

  loadPage(page: number) {
    window.scrollTo(0, 0);
    this.paginationDto.currentPage = page;
    this.getProducts();
  }
}
