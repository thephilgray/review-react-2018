describe('App intitialization', () => {
  it.only('Loads todos on page load', () => {
    cy.server();
    cy.route('GET', '/api/albums', 'fixture:albums');
    cy.visit('/');

    cy.get('[data-cy=Card]').should('have.length', 7);
  });
});
