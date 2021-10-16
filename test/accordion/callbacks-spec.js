describe('callbacks', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="accordion">
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

  let message;
  beforeEach(() => {
    let element = $('[data-controller="accordion"]');
    element.addEventListener('accordion:opened', e => {
      message = "opened: " + e.detail.content.getAttribute('data-accordion-id');
    });
    element.addEventListener('accordion:closed', e => {
      message = "closed: " + e.detail.content.getAttribute('data-accordion-id');
    });
  });

  it('runs callbacks', () => {
    $('a[href="#content1"]').click();
    expect(message).toEqual('opened: content1');

    $('a[href="#content1"]').click();
    expect(message).toEqual('closed: content1');
  });
});
