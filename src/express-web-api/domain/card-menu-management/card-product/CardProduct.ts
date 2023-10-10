export class CardProduct {

    id?: number;
    cardId: number;
    productId: number;
    categoryId: number;

    constructor( cardId: number, productId: number, categoryId: number) {
        this.cardId = cardId;
        this.productId = productId;
        this.categoryId = categoryId;
    }
}