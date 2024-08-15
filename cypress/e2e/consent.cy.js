/// <reference types="cypress" />

describe('Give consent', () => {
  it('creates a new consent', () => {
    const name = 'new Consent';
    const email = 'mail@mail.com';
    cy.visit('/give-consent');

    cy.findByLabelText(/name/i).type(name);
    cy.findByLabelText(/email/i).type(email);
    cy.findByText(/I agree to/i);
    cy.findByText(/receive newsletter/i).click();
    cy.findByText(/be shown targeted ads/i);
    cy.findByText(/contribute to anonymous visit statistics/i);
    cy.get('[data-cy="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/consents');
    cy.findByText(name).should('be.visible');
    cy.findByText(email).should('be.visible');
    cy.findByText('Receive newsletter').should('be.visible');

  });
});
