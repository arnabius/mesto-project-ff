(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"b8b29966-7d93-4632-8883-010a6bd8e2e6","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка запроса по API: ".concat(e.status))}var n=document.querySelector("#card-template").content;function o(e,t,o,r,a){var i=n.querySelector(".card").cloneNode(!0),u=i.querySelector(".card__image"),s=i.querySelector(".card__title");u.src=e.link,u.alt=e.name,s.textContent=e.name,i._id=e._id,i.owner_id=e.owner._id;var l=i.querySelector(".card__delete-button"),d=i.querySelector(".card__like-button");return a._id===i.owner_id?(l.addEventListener("click",(function(){t(l)})),l.classList.remove("card__button-hidden")):l.classList.add("card__button-hidden"),d.addEventListener("click",r),e.likes.some((function(e){return e._id===a._id}))&&function(e){e.querySelector(".card__like-button").classList.add("card__like-button_is-active")}(i),c(i,e.likes.length),u.addEventListener("click",(function(){o(e.link,e.name)})),i}function r(n){var o,r=n.closest(".card");(o=r._id,fetch("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers})).then((function(e){return t(e)})).then((function(e){r.remove()})).catch((function(e){console.log(e)}))}function c(e,t){var n=e.querySelector(".card__like-quantity"),o=e.querySelector(".card__description");t>0?(o.classList.add("card__description-liked"),n.textContent=t):(o.classList.remove("card__description-liked"),n.textContent="")}function a(n){var o=n.target.closest(".card"),r=!n.target.classList.contains("card__like-button_is-active");(function(t,n){var o=!0===n?"PUT":"DELETE";return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:o,headers:e.headers})})(o._id,r).then((function(e){return t(e)})).then((function(e){!function(e){e.querySelector(".card__like-button").classList.toggle("card__like-button_is-active")}(o),c(o,e.likes.length)})).catch((function(e){console.log(e)}))}function i(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s)}function u(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}var l={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_submit_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input-error_active"},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))},p=function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)};function _(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){p(e,n,t)})),d(n,o,t)}function f(e,t){e?(t.oldTextContent=t.textContent,t.textContent="Сохранение..."):t.textContent=t.oldTextContent}var y=document.querySelector(".places__list"),m=function(e){return console.log(e)},v={},h=function(e){Array.from(e).forEach((function(e){var t=o(e,r,I,a,v);y.append(t)}))},S=fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return t(e)})),b=fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return t(e)}));Promise.all([S,b]).then((function(){S.then((function(e){j(e),b.then(h,m)}),m)}),m),Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("click",(function(t){(t.target.classList.contains("popup__close")||t.target.classList.contains("popup"))&&u(e)}))}));var q=document.querySelector(".profile__add-button"),L=document.querySelector(".popup_type_new-card"),C=L.querySelector(".popup__form"),g=C.querySelector(".popup__input_type_card-name"),k=C.querySelector(".popup__input_type_url");q.addEventListener("click",(function(e){C.reset(),i(L),_(C,l)})),C.addEventListener("submit",(function(n){n.preventDefault();var c,i,s=n.target.querySelector(".popup__button");f(!0,s),(c=g.value,i=k.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:c,link:i})})).then((function(e){return t(e)})).then((function(e){var t=o(e,r,I,a,v);y.prepend(t)})).then((function(e){u(L)})).catch((function(e){console.log(e)})).finally((function(){f(!1,s)}))}));var E=document.querySelector(".profile__edit-button"),x=document.querySelector(".popup_type_edit"),A=document.querySelector(".profile__title"),T=document.querySelector(".profile__description"),U=x.querySelector(".popup__form"),w=U.querySelector(".popup__input_type_name"),P=U.querySelector(".popup__input_type_description"),B=document.querySelector(".profile__image"),D=document.querySelector(".popup_type_edit-avatar"),N=D.querySelector(".popup__form"),O=N.querySelector(".popup__input_type_url");function j(e){A.textContent=e.name,T.textContent=e.about,B.style.backgroundImage="url(".concat(e.avatar,")"),v._id=e._id,v.name=e.name,v.about=e.about,v.avatar=e.avatar}E.addEventListener("click",(function(){w.value=A.textContent,P.value=T.textContent,i(x),_(U,l)})),U.addEventListener("submit",(function(n){n.preventDefault();var o,r,c=n.target.querySelector(".popup__button");f(!0,c),(o=w.value,r=P.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:o,about:r})})).then((function(e){return t(e)})).then((function(e){j(e)})).then((function(e){u(x)})).catch((function(e){console.log(e)})).finally((function(){f(!1,c)}))})),B.addEventListener("click",(function(){i(D),_(N,l)})),N.addEventListener("submit",(function(n){n.preventDefault();var o,r=O.value,c=n.target.querySelector(".popup__button");f(!0,c),(o=r,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})})).then((function(e){return t(e)})).then((function(e){j(e)})).then((function(e){u(D)})).catch((function(e){console.log(e)})).finally((function(){f(!1,c)}))}));var J=document.querySelector(".popup_type_image"),M=J.querySelector(".popup__image"),H=J.querySelector(".popup__caption");function I(e,t){M.src=e,M.alt=t,H.textContent=t,i(J)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(r){d(n,o,t),r.addEventListener("input",(function(){d(n,o,t),p(e,r,t)}))}))}(t,e)}))}(l)})();