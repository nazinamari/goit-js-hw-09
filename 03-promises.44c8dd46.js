var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},t={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in n)return n[e].exports;if(e in t){var o=t[e];delete t[e];var i={id:e,exports:{}};return n[e]=i,o.call(i.exports,i,i.exports),i.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,n){t[e]=n},e.parcelRequired7c6=o);var i=o("iQIUW");function r(e,n){const t=Math.random()>.3;return new Promise(((o,i)=>{setTimeout((()=>{t?o({position:e,delay:n}):i({position:e,delay:n})}),n)}))}const l=document.querySelector(".form");l.addEventListener("submit",(function(e){e.preventDefault();const n=parseInt(l.elements.delay.value),t=parseInt(l.elements.step.value),o=parseInt(l.elements.amount.value);(function(e,n,t){for(let o=0;o<t;o++)r(o+1,e+n*o).then((({position:e,delay:n})=>{i.Notify.success(`✅ Fulfilled promise ${e} in ${n}ms`)})).catch((({position:e,delay:n})=>{i.Notify.failure(`❌ Rejected promise ${e} in ${n}ms`)}))})(n,t,o),l.reset()}));
//# sourceMappingURL=03-promises.44c8dd46.js.map
