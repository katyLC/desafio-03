// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import {PurchaseProduct} from "./pages/purchaseProduct";
import {values} from "pg/lib/native/query";

Cypress.Commands.add('login', (usuario, password) => {

   cy.session('loginSession',() =>{
       cy.request({
           method: "POST",
           url: 'https://pushing-it.onrender.com/api/login',
           body: {
               username: usuario,
               password: password
           },
       }).then(respuesta => {
           window.localStorage.setItem('token', respuesta.body.token);
           window.localStorage.setItem('user', respuesta.body.user.username);
           window.localStorage.setItem('userId', respuesta.body.user._id);
           Cypress.env().token = respuesta.body.token;

       });

   })



})

Cypress.Commands.add('createProduct', (body) => {
    cy.request({
        method: "POST",
        url: 'https://pushing-it.onrender.com/api/create-product',
        body: body
    })
})

Cypress.Commands.add('deleteProduct', (id) => {
    cy.request({
        method: "GET",
        url: `https://pushing-it.onrender.com/api/products?id=${id}`,
        failOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    }).its('body.products.docs').each((product) => {

        cy.request({

            method: "DELETE",
            url: `https://pushing-it.onrender.com/api/product/${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`
            }
        })

    })
})

Cypress.Commands.add('validacionBD', () => {

    const purchaseProduct = new PurchaseProduct()
    purchaseProduct.sellIDLabel.invoke('text').then(sellid => {
        cy.log(sellid)
        const query = `Select p.sell_id, p.product, p.quantity, p.total_price, p.price
                       from public."purchaseProducts" p inner join public."sells" s on p.sell_id = s.id
                       where p.sell_id = ${sellid}`
        cy.task("connectDB", query).then(result => {
           // expect(result).to.have.length(2)
            expect(result).to.be.deep.equal(
                [{sell_id: Number(sellid), product: "Zapatillas Azules", quantity: 1, total_price: "30.33", price: "30.33"},
                        {sell_id:Number(sellid),product:"Remera Negra",quantity:1,total_price:"7.12",price:"7.12"} ])
        })

    })
})