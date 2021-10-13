import { Controller } from '@hotwired/stimulus';
import './index.scss';

export default class extends Controller {
  get togglers() {
    return this.context.bindingObserver.bindings
               .filter(binding => binding.action.methodName == 'toggle')
               .map(binding => binding.action.element);
  }

  connect() {
    this.enableTrans(false);
    this.init();
    setTimeout(() => this.enableTrans(true), 200);
  }

  enableTrans(enabled) {
    if (enabled) {
      this.element.classList.add('st-accordion--disable-trans');
    } else {
      this.element.classList.remove('st-accordion--disable-trans');
    }
  }

  init() {
    this.togglers.forEach(toggler => {
      let content = this.findContent(toggler);
      if (this.isOpened(toggler)) {
        this.toggleClass(toggler, content, true);
      } else {
        this.toggleClass(toggler, content, false);
      }
    })
  }

  toggle(e) {
    this.togglers.forEach(toggler => {
      if (toggler == e.target) {
        if (this.isOpened(toggler)) {
          this.close(toggler);
        } else {
          this.open(toggler);
        }
      } else if (this.isOpened(toggler)) {
        this.close(toggler);
      }
    });

    e.preventDefault();
  }

  open(toggler) {
    let content = this.findContent(toggler);
    this.toggleClass(toggler, content, true);
    this.dispatch('opened', { detail: { toggler: toggler, content: content } });
  }

  close(toggler) {
    let content = this.findContent(toggler);
    this.toggleClass(toggler, content, false);
    this.dispatch('closed', { detail: { toggler: toggler, content: content } });
  }

  isOpened(toggler) {
    return toggler.matches('.st-accordion__icon--opened');
  }

  toggleClass(toggler, content, opened) {
    if (opened) {
      toggler.classList.add('st-accordion__icon--opened');
      content.classList.add('st-accordion__content--visible');
      content.style.height = content.scrollHeight + 'px';
    } else {
      toggler.classList.remove('st-accordion__icon--opened');
      content.classList.remove('st-accordion__content--visible');
      content.style.height = '0px';
    }

    if (opened) {
      let openedText = toggler.getAttribute('data-accordion-opened-text-param');
      if (openedText) toggler.innerHTML = openedText;
    } else {
      let closedText = toggler.getAttribute('data-accordion-closed-text-param');
      if (closedText) toggler.innerHTML = closedText;
    }
  }

  findContent(target) {
    let id = target.getAttribute('href').replace(/^#/, '');
    return this.scope.findElement(`[data-accordion-id="${id}"]`);
  }
}
