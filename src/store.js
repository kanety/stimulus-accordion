export default class Store {
  constructor(controller) {
    this.controller = controller;
  }

  get togglers() {
    return this.controller.togglers;
  }

  get openedTogglers() {
    return this.controller.openedTogglers;
  }

  get key() {
    return this.controller.storeKeyValue;
  }

  get target() {
    if (this.controller.hasStoreTarget) {
      return this.controller.storeTarget;
    }
    return null;
  }

  load() {
    let ids = this.loadIDs();
    if (!ids) return;

    let idSet = new Set(ids);
    this.togglers.forEach(toggler => {
      let content = this.controller.findContent(toggler);
      if (idSet.has(this.controller.getID(toggler))) {
        this.controller.show(toggler, content)
      } else {
        this.controller.hide(toggler, content);
      }
    });
  }

  loadIDs() {
    if (this.key) {
      return this.constructor.load(this.key);
    } else if (this.target && this.target.value) {
      return this.target.value.split('\t');
    }
    return null;
  }

  save() {
    let ids = this.openedTogglers.map(toggler => this.controller.getID(toggler));
    this.saveIDs(ids)
  }

  saveIDs(ids) {
    if (this.key) {
      this.constructor.save(this.key, ids);
    } else if (this.target) {
      this.target.value = ids.join('\t');
    }
  }

  static load(key) {
    let json = sessionStorage.getItem(key);
    try {
      return JSON.parse(json)
    } catch(error) {
      console.error(error);
      return null;
    }
  }

  static save(key, value) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch(error) {
      console.error(error);
      return null;
    }
  }
}
