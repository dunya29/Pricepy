const allModals = document.querySelectorAll(".js-modal")
const successModal = document.querySelector(".success-mod")
const errorModal = document.querySelector(".error-mod")
//open modal
function openModal(modal) {
    $(modal).fadeIn(500);
}
//close modal
function closeModal(modal) {
    $('.js-modal').fadeOut(100);
}
//setSuccessTxt
function setSuccessTxt(title = false, txt = false) {
    successModal.querySelector(".modal__title span").textContent = title ? title : "Заявка отправлена" 
    if (txt) {
      successModal.querySelector(".modal__title p").textContent = txt
    }
}
//setErrorTxt
function setErrorTxt(title = false, txt = false) {
    errorModal.querySelector(".modal__title span").textContent = title ? title : "Что-то пошло не так" 
    if (txt) {
        errorModal.querySelector(".modal__title p").textContent = txt
    }
}
// openSuccessMod
function openSuccessMod(title = false, txt = false) {
    setSuccessTxt(title,txt)
    openModal(successModal)
}
// openErrorMod
function openErrorMod(title = false, txt = false) {
    setErrorTxt(title,txt)
    openModal(errorModal)
}
// formSuccess
function formSuccess(form, title = false, txt = false) {
    form.querySelectorAll("input").forEach(inp => {
        inp.classList.remove("has-error")
        if (!["hidden", "checkbox", "radio"].includes(inp.type)) {
            inp.value = ""
        }
    })
    openSuccessMod(title, txt)
}
//headermobBtn
const headermobBtn = document.querySelector(".header__mobBtn")
if (headermobBtn) {
    headermobBtn.addEventListener('click', () => document.querySelector(".header__phones").classList.add("open"))
    document.querySelector(".header__phones-close").addEventListener('click', () => {
        document.querySelector(".header__phones").classList.remove("open")
    })
}
//fixed-menu
const fixedMenu = document.querySelector(".fixed-menu")
function showFixedMenu() {
  if (window.innerWidth <= 991 && window.innerHeight - document.querySelector(".footer").getBoundingClientRect().bottom <= 0) {
    fixedMenu.classList.remove("unshow")
  } else {
    fixedMenu.classList.add("unshow")
  }
}
if (fixedMenu) {
  showFixedMenu()
  window.addEventListener("resize", showFixedMenu)
  window.addEventListener("scroll", showFixedMenu)
}
window.addEventListener("resize", () => {
    if(window.innerWidth > 991.98 && document.querySelector('.burger').classList.contains("open")) {
        document.querySelector('.burger').click()
    }
})
//check-phone
const checkPhoneMod = document.querySelector(".check-phone")
let codeResTimeout
function checkVal() {
    checkPhoneMod.querySelector(".check-phone__code").value.length == 0 ? 
    document.querySelector(".check-phone .request__btn").setAttribute("disabled", true) : 
    document.querySelector(".check-phone .request__btn").removeAttribute("disabled")
    checkPhoneMod.querySelector(".check-phone__code").addEventListener("input",checkVal)
} 
function openCheckPhoneMod(tel) {
    clearTimeout(codeResTimeout)
    openModal(checkPhoneMod)
    let val = 30  
    checkPhoneMod.querySelector(".modal__title span").textContent = `Получите код подтверждения на номер ${tel}`
    checkPhoneMod.querySelector(".check-phone__content").innerHTML = `<button data-send-code="send" class="request__btn check-phone__send" type="button">Получить код</button>`
    checkPhoneMod.addEventListener("click", e => {
        if (checkPhoneMod.querySelector(".check-phone__send").contains(e.target)) {
            val = 30
            clearTimeout(codeResTimeout)
            checkPhoneMod.querySelector(".check-phone__content").innerHTML = `
            <div class="modal__lbl">Код подтверждения</div>
			<form action="" novalidate class="send-code">
                <div class="item-form">
                	<input type="text" pattern="\d*" maxlength="4" name="code" placeholder="0000" class="check-phone__code">
                    <span data-error></span>
                </div>
				<div class="modal__lbl check-phone__resend">Повторный запрос кода доступен через <span>${val}</span> сек.</div>	
				<button class="request__btn send-code__submit" type="submit">подтвердить</button>
			</form>
            `
            checkPhoneMod.querySelector(".modal__title span").textContent = `Выслали проверочный код на телефон`
            checkVal()
            function changeTimeVal() {
                document.querySelector(".check-phone__resend span").textContent = val
                val--
                if ( val > 0) {
                    codeResTimeout = setTimeout(changeTimeVal, 1000);
                } else {
                    document.querySelector(".check-phone__resend").innerHTML = `<button type="button" data-send-code="resend" class="check-phone__resend check-phone__send">Отправить новый код</button>`
                }
            }
            changeTimeVal()
        }
    })
}