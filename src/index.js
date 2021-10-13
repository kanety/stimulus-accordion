import { Controller } from '@hotwired/stimulus';
import Store from './store';
import './index.scss';

export default class extends Controller {
  static values = {
    storeKey: String
  };

  get togglers() {
    return this.context.bindingObserver.bindings
               .filter(binding => binding.action.methodName == 'toggle')
               .map(binding => binding.action.element);
  }

  get openedTogglers() {
    return this.togglers.filter(toggler => this.isOpened(toggler));
  }

  get contents() {
    return this.scope.findAllElements('[data-accordion-id]')
  }

  connect() {
    this.enableTrans(false);

    this.init();
    this.store = new Store(this);
    this.store.load();

    setTimeout(() => this.enableTrans(true), 200);
  }

  enableTrans(enabled) {
    this.contents.forEach(content => {
      if (enabled) {
        content.classList.remove('st-accordion--disable-trans');
      } else {
        content.classList.add('st-accordion--disable-trans');
      }
    });
  }

  init() {
    this.togglers.forEach(toggler => {
      let content = this.findContent(toggler);
      if (this.isOpened(toggler)) {
        this.show(toggler, content);
      } else {
        this.hide(toggler, content);
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
    this.show(toggler, content);
    this.store.save();
    this.dispatch('opened', { detail: { toggler: toggler, content: content } });
  }

  close(toggler) {
    let content = this.findContent(toggler);
    this.hide(toggler, content);
    this.store.save();
    this.dispatch('closed', { detail: { toggler: toggler, content: content } });
  }

  show(toggler, content) {
    this.toggleClass(toggler, content, true);
  }

  hide(toggler, content) {
    this.toggleClass(toggler, content, false);
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

  findContent(toggler) {
    let id = this.getID(toggler);
    return this.scope.findElement(`[data-accordion-id="${id}"]`);
  }

  getID(toggler) {
    return  toggler.getAttribute('href').replace(/^#/, '');
  }
}
