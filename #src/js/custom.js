const allModals = document.querySelectorAll(".js-modal")
const checkPhoneMod = document.querySelector(".check-phoneMod")
const checkPhoneModInp = document.querySelector(".check-phoneMod__code")
const checkPhoneModBtn = document.querySelector(".check-phoneMod .request__btn")
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
let codeResTimeout
function openCheckPhoneMod() {
    clearTimeout(codeResTimeout)
    openModal(checkPhoneMod)
    let val = 30  
    document.querySelector(".check-phoneMod__codeResent").innerHTML = `Повторный запрос кода доступен через <span>${val}</span> сек.`
    setTimeout(() => {
        function changeTimeVal() {
            document.querySelector(".check-phoneMod__codeResent span").textContent = val
            val--
            if ( val > 0) {
                codeResTimeout = setTimeout(changeTimeVal, 1000);
            } else {
                document.querySelector(".check-phoneMod__codeResent").innerHTML = `<button type="button" class="check-phoneMod__resent">Отправить  новый код</button>`
            }
        }
        changeTimeVal()
    }, 500);
}
if (checkPhoneModInp) {
    function checkVal() {
        checkPhoneModInp.value.length == 0 ? checkPhoneModBtn.setAttribute("disabled", true) : checkPhoneModBtn.removeAttribute("disabled")
    }
    checkVal()
    checkPhoneModInp.addEventListener("input",checkVal)
}
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