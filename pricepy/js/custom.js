const checkPhoneMod = document.querySelector(".check-phoneMod")
const checkPhoneModInp = document.querySelector(".check-phoneMod__code input")
const checkPhoneModBtn = document.querySelector(".check-phoneMod .request__btn")
let valTimeout
function openCheckPhoneMod() {
    if (checkPhoneMod) {   
        $(checkPhoneMod).fadeIn(500);
        let val = 30
        document.querySelector(".check-phoneMod__codeResent").innerHTML = `Повторный запрос кода доступен через <span>${val}</span> сек.`
        function changeTimeVal() {
            clearTimeout(valTimeout)
            document.querySelector(".check-phoneMod__codeResent span").textContent = val
            val--
            if ( val > 0) {
                valTimeout = setTimeout(changeTimeVal, 1000);
            } else {
                document.querySelector(".check-phoneMod__codeResent").innerHTML = `<button type="button" class="check-phoneMod__resent">Отправить  новый код</button>`
            }
        }
        changeTimeVal()
    }
}
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
