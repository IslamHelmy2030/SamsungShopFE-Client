import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { IProduct, IProductDetails } from 'src/app/dtos/models';
import { AuthService } from 'src/app/services/auth.service';
import { productService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  productId: number;
  productDetails: IProductDetails;
  imageSrc: string;
  images;
  imageButtons: any = [];

  constructor(
    private route: ActivatedRoute,
    private productService: productService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private toasterService: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['Id'];
      this.getProductDetails();
    });
  }

  getProductDetails() {
    this.spinner.show();

    this.productService.GetProductDetails(this.productId).subscribe(
      (res: any) => {
        this.productDetails = res.data;
        this.imageSrc = this.productDetails.imageFile;
        this.images = this.productDetails.productImagesResponsesDto;

        for (const item of this.images) {
          this.imageButtons.push(`${item.imageFile}`);
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

  //   $('#lightSlider').lightSlider({
  //     gallery: true,
  //     item: 1,
  //     loop: true,
  //     slideMargin: 0,
  //     thumbItem: 6
  // });

  onClick(imageNameObject) {
    this.imageSrc = imageNameObject;
    // this.messageText = imageNameObject.name;
  }
}
