export class MenuProduct {

    id?: number;
    premium?: number;
    menuId: number;
    productId: number;
    categoryId: number;

    constructor( menuId: number, productId: number, categoryId: number, premium?: number) {
        this.menuId = menuId;
        this.productId = productId;
        this.categoryId = categoryId;
        this.premium = premium;
    }

}