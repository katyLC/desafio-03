export class PurchaseProduct {

    constructor() {
        this.sellId = '[data-cy="sellId"]';
        this.totalPrice = '[data-cy="totalPrice"]';
        this.closeModal ='[data-cy="closeModal"]';
        this.goShoppingCart = '[data-cy="goShoppingCart"]';
        this.goBillingSummary = '[data-cy="goBillingSummary"]';
        this.goCheckout = '[data-cy="goCheckout"]';
        this.firstName = '[data-cy="firstName"]';
        this.lastName ='[data-cy="firstName"]';
        this.cardNumber ='[data-cy="cardNumber"]';
        this.purchase = '[data-cy="purchase"]'
    }


    get sellIDLabel(){
        return cy.get(this.sellId)
    }

    get priceLabel(){

        return cy.get(this.totalPrice)
    }
    get closeModalClick(){
        return cy.get(this.closeModal)
    }

    get goShoppingCartButton(){
        return cy.get(this.goShoppingCart)
    }

    get goBillingSummaryClick(){

        return cy.get(this.goBillingSummary)
    }

    get goCheckoutClick()
    {
        return cy.get(this.goCheckout)
    }


    get firstNameLabel()
    {
        return cy.get(this.firstName)
    }

    get lastNameLabel(){
        return cy.get(this.lastName)
    }

    get cardNumberLabel(){
        return cy.get(this.cardNumber)
    }

    get purchaseButton(){
        return cy.get(this.purchase)
    }
}