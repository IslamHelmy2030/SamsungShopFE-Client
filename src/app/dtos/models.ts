export interface ILogin {
  email: string;
  password: string;
}

export interface IRegisterUser {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail:string;
  password: string;
  confirmPassword: string;
  address: string;
  phoneNumber: string;
  birthdate:Date;
}

export interface IProductRequestDto {
  categoryId: number;
  pageNumber: number;
}

export interface ICategory {
  id: number;
  name: string;
  description: string;
  imageFile: string;
  isVisible: boolean;
}

export interface IProduct {
  id: number;
  name?: string;
  description?: string;
  summary?: string;
  categoryName?: string;
  imageFile: string;
  price: number;
  priceAfterDiscount: number;
  categoryId: number;
  isVisible: boolean;
  discountAmount: number;
}

export interface IProductDetails {
  id: number;
  name?: string;
  description?: string;
  summary?: string;
  categoryName?: string;
  imageFile: string;
  price: number;
  categoryId: number;
  isVisible: boolean;
  productImagesResponsesDto: IProductImagesResponsesDto[];
}

export interface IHotDeals {
  id: number;
  productName?: string;
  imageFile?: string;
  price: number;
  discount: number;
  productId: number;
  summary?: string;
  priceAfterDiscount: number;
}

export interface IProductImagesResponsesDto {
  id: number;
  name?: string;
  description?: string;
  imageFile: string;
  productId: number;
  productName: string;
}
