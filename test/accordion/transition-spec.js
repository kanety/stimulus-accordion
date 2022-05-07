jest.useFakeTimers();

describe('transition', () => {
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

  it('toggles transition', () => {
    $('a[href="#content1"]').click();
    jest.runAllTimers();
    $('[data-accordion-id="content1"]').dispatchEvent(new Event('transitionend'));
    expect($('[data-accordion-id="content1"]').matches('.st-accordion__content--visible')).toEqual(true);

    $('a[href="#content2"]').click();
    jest.runAllTimers();
    $('[data-accordion-id="content2"]').dispatchEvent(new Event('transitionend'));
    expect($('[data-accordion-id="content2"]').matches('.st-accordion__content--visible')).toEqual(true);
  });
});
