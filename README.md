# stimulus-accordion

A stimulus controller for simple accordion menu.

## Dependencies

* @hotwired/stimulus 3.0+

## Installation

Install from npm:

    $ npm install @kanety/stimulus-accordion --save

## Usage

Register controller:

```javascript
import { Application } from '@hotwired/stimulus';
import AccordionController from '@kanety/stimulus-accordion';

const application = Application.start();
application.register('accordion', AccordionController);
```

Import css:

```css
@import '@kanety/stimulus-accordion';
```

Build html as follows:

```html
<div class="st-accordion" data-controller="accordion">
  <div><a href="#content1" class="st-accordion__icon" data-action="accordion#toggle">Content 1</a></div>
  <div class="st-accordion__content" data-accordion-id="content1">
    <p>content 1</p>
  </div>
  <div><a href="#content2" class="st-accordion__icon" data-action="accordion#toggle">Content 2</a></div>
  <div class="st-accordion__content" data-accordion-id="content2">
    <p>content 2</p>
  </div>
</div>
```

### Options

#### store-key

Save opened state to `sessionStorage`:

```html
<div data-controller="accordion"
     data-accordion-store-key-value="YOUR_KEY">
</div>
```

#### opened-text, closed-text

You can change header text of accordion when opened or closed:

```html
<div data-controller="accordion">
  <div><a href="#content1"
          data-action="accordion#toggle"
          data-accordion-opened-text-param="Opened Content 1"
          data-accordion-closed-text-param="Closed Content 1">Content 1</a></div>
</div>
```

### Callbacks

Run callbacks when a content is opened or closed:

```javascript
let element = document.querySelector('[data-controller="accordion"]');
element.addEventListener('accordion:opened', (e) => {
  // e.detail.toggler: clicked element
  // e.detail.content: opened content
  console.log('opened: ' + e.detail.content.getAttribute('data-accordion-id'));
});
element.addEventListener('accordion:closed', (e) => {
  // e.detail.toggler: clicked element
  // e.detail.content: closed content
  console.log('closed: ' + e.detail.content.getAttribute('data-accordion-id'));
});
```

## License

The library is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
