describe('opened-text', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="accordion">
        <div><a href="#content1"
                data-action="accordion#toggle"
                data-accordion-opened-text-param="Opened"
                data-accordion-closed-text-param="Closed">Content 1</a></div>
        <div data-accordion-id="content1">
          <p>content 1</p>
          <p>content 1</p>
        </div>
      </div>
    `;
  });

  it('toggles display', () => {
    $('a[href="#content1"]').click();
    expect($('a[href="#content1"]').innerHTML).toEqual('Opened');

    $('a[href="#content1"]').click();
    expect($('a[href="#content1"]').innerHTML).toEqual('Closed');
  });
});
