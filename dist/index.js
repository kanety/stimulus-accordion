var t=require("@hotwired/stimulus");class e{constructor(t){this.controller=t}get togglers(){return this.controller.togglers}get openedTogglers(){return this.controller.openedTogglers}get key(){return this.controller.storeKeyValue}load(){if(this.key){var t=this.constructor.load(this.key);if(t){var e=new Set(t);this.togglers.forEach(t=>{var s=this.controller.findContent(t);e.has(this.controller.getID(t))?this.controller.show(t,s):this.controller.hide(t,s)})}}}save(){if(this.key){var t=this.openedTogglers.map(t=>this.controller.getID(t));this.constructor.save(this.key,t)}}static load(t){var e=sessionStorage.getItem(t);try{return JSON.parse(e)}catch(t){return console.error(t),null}}static save(t,e){try{sessionStorage.setItem(t,JSON.stringify(e))}catch(t){return console.error(t),null}}}class s extends t.Controller{get togglers(){return this.context.bindingObserver.bindings.filter(t=>"toggle"==t.action.methodName).map(t=>t.action.element)}get openedTogglers(){return this.togglers.filter(t=>this.isOpened(t))}get contents(){return this.scope.findAllElements("[data-accordion-id]")}connect(){this.init(),this.store=new e(this),this.store.load()}init(){this.togglers.forEach(t=>{var e=this.findContent(t);this.isOpened(t)?this.show(t,e,!1):this.hide(t,e,!1)})}toggle(t){this.togglers.forEach(e=>{e.contains(t.target)?this.isOpened(e)?this.close(e):this.open(e):this.isOpened(e)&&this.close(e)}),t.preventDefault()}open(t){var e=this.findContent(t);this.show(t,e),this.store.save(),this.dispatch("opened",{detail:{toggler:t,content:e}})}close(t){var e=this.findContent(t);this.hide(t,e),this.store.save(),this.dispatch("closed",{detail:{toggler:t,content:e}})}show(t,e,s){void 0===s&&(s=!0),s&&(e.style.height="0px",e.removeEventListener("transitionend",this.transitionEnd),e.addEventListener("transitionend",this.transitionEnd),setTimeout(()=>{e.style.height=e.scrollHeight+"px"})),this.toggleClass(t,e,!0),this.toggleText(t,!0)}hide(t,e,s){void 0===s&&(s=!0),s&&(e.style.height=e.scrollHeight+"px",e.removeEventListener("transitionend",this.transitionEnd),e.addEventListener("transitionend",this.transitionEnd),setTimeout(()=>{e.style.height="0px"})),this.toggleClass(t,e,!1),this.toggleText(t,!1)}transitionEnd(t){t.target.style.height=""}toggleClass(t,e,s){s?(t.classList.add("st-accordion__icon--opened"),e.classList.add("st-accordion__content--visible")):(t.classList.remove("st-accordion__icon--opened"),e.classList.remove("st-accordion__content--visible"))}toggleText(t,e){var s;(s=t.getAttribute(e?"data-accordion-opened-text-param":"data-accordion-closed-text-param"))&&(t.innerHTML=s)}isOpened(t){return t.matches(".st-accordion__icon--opened")}findContent(t){var e=this.getID(t);return this.scope.findElement('[data-accordion-id="'+e+'"]')}getID(t){return t.getAttribute("href").replace(/^#/,"")}}s.values={storeKey:String},module.exports=s;
//# sourceMappingURL=index.js.map
