describe('App intitialization', () => {
  beforeEach(() => {
    cy.server();
    cy.route('GET', '/api/albums', 'fixture:albums');
    cy.visit('/');
  });

  it('Loads todos on page load', () => {
    cy.get('[data-cy=Card]').should('have.length.above', 0);
  });

  it('Loads no more than `maxItemsPerPage` on page load', () => {
    const maxItemsPerPage = 5;
    cy.get('[data-cy=Card]').should('have.lengthOf', maxItemsPerPage);
  });

  it('Renders a next button', () => {
    cy.get('button[data-cy=nextPage]');
  });

  it('should display the next page of results when the next page is button', () => {
    cy.get('button[data-cy=nextPage]').click();
    cy.get('[data-cy=Card]').should('have.lengthOf', 2);
  });

  it('should display only the search results when the user enters text into the search field', () => {
    const query = 'space';
    cy.get('button[data-cy="searchButton"]').click();
    cy.get('input[data-cy=searchAlbums]').type(query);
    cy.get('[data-cy=Card]').should('have.lengthOf', 1);
  });
});
