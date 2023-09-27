const popup = document.querySelector(".popup");
const popupOpened = document.querySelector(".popup_opened");
const popupOpenBtn = document.querySelector(".info__button");
const popupCloseBtn = document.querySelector(".form__cancel");

//объявление функции открытия попапа
function openPopup() {
    const form = document.querySelector('.form');
    const inputList = Array.from(form.querySelectorAll('.form__input'));
    const submitBtn = form.querySelector('.form__submit');
    inputList.forEach((input) => {
        input.value = '';
    })
    submitBtn.disabled = 'disabled';
    popup.classList.add("popup_opened");
    window.addEventListener("keydown", closePopupByEsc);
    popup.addEventListener("mousedown", closePopupByOverlayClick);
}

function closePopupByEsc(evt) {
    if (evt.key === "Escape") {
        closePopup(popupOpened);
    }
}

function closePopupByOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(popupOpened);
    }
}

//объявление функции закрытия попапа
function closePopup() {
    popup.classList.remove("popup_opened");
    window.removeEventListener("keydown", closePopupByEsc);
    popup.removeEventListener("mousedown", closePopupByOverlayClick);
}

popupOpenBtn.addEventListener("click", openPopup);
popupCloseBtn.addEventListener("click", closePopupByOverlayClick);