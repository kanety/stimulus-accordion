var t=require("@hotwired/stimulus");module.exports=class extends t.Controller{get togglers(){return this.context.bindingObserver.bindings.filter(t=>"toggle"==t.action.methodName).map(t=>t.action.element)}connect(){this.enableTrans(!1),this.init(),setTimeout(()=>this.enableTrans(!0),200)}enableTrans(t){this.element.classList.toggle("st-accordion--disable-trans",!t)}init(){this.togglers.forEach(t=>{var e=this.findContent(t);this.isOpened(t)?this.toggleClass(t,e,!0):this.toggleClass(t,e,!1)})}toggle(t){this.togglers.forEach(e=>{e==t.target?this.isOpened(e)?this.close(e):this.open(e):this.isOpened(e)&&this.close(e)}),t.preventDefault()}open(t){var e=this.findContent(t);this.toggleClass(t,e,!0),this.dispatch("opened",{detail:{toggler:t,content:e}})}close(t){var e=this.findContent(t);this.toggleClass(t,e,!1),this.dispatch("closed",{detail:{toggler:t,content:e}})}isOpened(t){return t.matches(".st-accordion__icon--opened")}toggleClass(t,e,s){if(t.classList.toggle("st-accordion__icon--opened",s),e.classList.toggle("st-accordion__content--visible",s),e.style.height=(s?e.scrollHeight:0)+"px",s){var i=t.getAttribute("data-accordion-opened-text-param");i&&(t.innerHTML=i)}else{var n=t.getAttribute("data-accordion-closed-text-param");n&&(t.innerHTML=n)}}findContent(t){var e=t.getAttribute("href").replace(/^#/,"");return this.scope.findElement('[data-accordion-id="'+e+'"]')}};
//# sourceMappingURL=index.js.map
