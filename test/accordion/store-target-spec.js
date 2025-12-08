describe('store-target', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="accordion">
        <input type="hidden" value="content1" data-accordion-target="store">
        <div><a href="#content1" data-action="accordion#toggle">Content 1</a></div>
        <div data-accordion-id="content1">
          <p>content 1</p>
          <p>content 1</p>
        </div>
        <div><a href="#content2" data-action="accordion#toggle">Content 2</a></div>
        <div data-accordion-id="content2">
          <p>content 2</p>
          <p>content 2</p>
        </div>
      </div>
    `;
  });

  it('saves states', () => {
    $('a[href="#content2"]').click();
    expect($('input').value).toEqual('content2');
  });

  it('load states', () => {
    expect($('[data-accordion-id="content1"]').matches('.st-accordion__content--visible')).toEqual(true);
  });
});
