describe('Not found page', () => {
  it('shows error page when url is not found', () => {
    const wrongURL = '/not-working-url';

    cy.visit(wrongURL);

    cy.url().should('eq', `http://localhost:3000${wrongURL}`);
    cy.findByText(/Error: No route matches URL/i).should('be.visible');
  });

  it('redirects to home page', () => {
    const wrongURL = '/not-working-url';
    cy.visit(wrongURL);
    const expectedUrl = '/give-consent';

    cy.get('[data-cy="back"]').click();

    cy.url().should('eq', `http://localhost:3000${expectedUrl}`);
  });
});