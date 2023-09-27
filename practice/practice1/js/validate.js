const form = document.querySelector('.form');
const submitButton = form.querySelector('.form__submit');

const showError = (errorElement, inputElement) => {
  if (inputElement.title) {
    errorElement.textContent = inputElement.title;
  } else {
    errorElement.textContent = inputElement.validationMessage; //присвоили стандратный текст ошибки 
  }
}

const hideError = (errorElement) => {
  errorElement.textContent = ''; //удалили стандратный текст ошибки
};

//функция проверки валидности поля ввода формы 
const checkInputValidity = (inputElement) => {
  const isInputNotValid = !inputElement.validity.valid; //переменная с невалидным полем 
  const errorElement = form.querySelector(`.${inputElement.id}-error`)//находим элемент с ошибкой в момент ввода в поле 
  //определяем показывать или скрывать ошибку в зависимости от валидности 
  if (isInputNotValid) {
    showError(errorElement, inputElement);
  } else {
    hideError(errorElement);
  }
}

//проверка валидности поля ввода 
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid; //возвращает true, если поле невалидно 
  });
};

//включение и отключение кнопки в зависимости от валидности формы 
const toggleButtonState = (inputList) => {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = 'disabled';
  } else {
    submitButton.disabled = false;
  }
};

//устанавливаем обработчик полям ввода формы
const setEventListener = () => {
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  toggleButtonState(inputList);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(inputElement);
      toggleButtonState(inputList);
    });
  });

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
};

setEventListener();