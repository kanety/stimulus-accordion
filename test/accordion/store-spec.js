import { Application } from '@hotwired/stimulus';
import AccordionController from 'index';

const application = Application.start();
application.register('accordion', AccordionController);

describe('store', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div data-controller="accordion"
           data-accordion-store-key-value="accordion">
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
    $('a[href="#content1"]').click();
    expect($('[data-accordion-id="content1"]').matches('.st-accordion__content--visible')).toEqual(true);
  });

  it('loads states', () => {
    expect($('[data-accordion-id="content1"]').matches('.st-accordion__content--visible')).toEqual(true);
  });
});
