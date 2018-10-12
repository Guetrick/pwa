// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />
import els from '../../elements/de';

describe('functional test start page', () => {
  it('check for live shopping widget', () => {
    cy.visit('');

    cy.get(els.liveShoppingWidgetWithExpectedProduct)
      .should('be.visible')
      .click();
    cy.get(els.productWithBasePrice1ProductPageName)
      .should('be.visible');
    cy.go('back');
  });

  it('check for image widget', () => {
    cy.get(els.imageWidgetWithLink1)
      .should('be.visible')
      .click();
    cy.get(els.basicProductsCategoryTitle)
      .should('be.visible');
    cy.go('back');
  });

  it('check for product slider', () => {
    cy.get(els.productSliderProduct1)
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.get(els.productWithLongDesciption4ProductPageName)
      .should('be.visible');
    cy.go('back');
  });

  it('check for category list', () => {
    cy.wait(1000);
    cy.get(els.allProductCategory).first()
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.get(els.allProductsCategoryTitle)
      .should('be.visible');
    cy.go('back');
  });

  it('should check for product grid grid', () => {
    cy.get(els.productGridWidgetSecondProduct)
      .scrollIntoView()
      .should('be.visible')
      .click();
    cy.get(els.productWithManyProps4ProductPagName)
      .should('be.visible');
    cy.go('back');
  });
});