const checkPhoneMod = document.querySelector(".check-phoneMod")
const checkPhoneModInp = document.querySelector(".check-phoneMod__code input")
const checkPhoneModBtn = document.querySelector(".check-phoneMod .request__btn")
if (checkPhoneMod) {
    checkPhoneMod.addEventListener("click", e => {
        if (!checkPhoneMod.querySelector(".modal__content").contains(e.target)) {
            checkPhoneMod.querySelector(".js-modal-close").click()
        }
    })
    function checkVal() {
        checkPhoneModInp.value.length == 0 ? checkPhoneModBtn.setAttribute("disabled", true) : checkPhoneModBtn.removeAttribute("disabled")
    }
    checkVal()
    checkPhoneModInp.addEventListener("input",checkVal)
}
