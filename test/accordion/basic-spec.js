jest.useFakeTimers();

describe('basic', () => {
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

  beforeEach(() => {
    jest.runAllTimers();
  });

  it('toggles display', () => {
    $('a[href="#content1"]').click();
    expect($('a[href="#content1"]').matches('.st-accordion__icon--opened')).toEqual(true);
    expect($('[data-accordion-id="content1"]').matches('.st-accordion__content--visible')).toEqual(true);
    expect($('a[href="#content2"]').matches('.st-accordion__icon--opened')).toEqual(false);
    expect($('[data-accordion-id="content2"]').matches('.st-accordion__content--visible')).toEqual(false);

    $('a[href="#content2"]').click();
    expect($('a[href="#content1"]').matches('.st-accordion__icon--opened')).toEqual(false);
    expect($('[data-accordion-id="content1"]').matches('.st-accordion__content--visible')).toEqual(false);
    expect($('a[href="#content2"]').matches('.st-accordion__icon--opened')).toEqual(true);
    expect($('[data-accordion-id="content2"]').matches('.st-accordion__content--visible')).toEqual(true);
  });
});
