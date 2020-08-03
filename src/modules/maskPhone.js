const maskPhone = (
  selector,
  defaultBorderColor,
  masked = '+7 (___) ___-__-__',
  clearLength = 5
) => {
  const elem = document.querySelector(selector);

  const addStyle = () => {
    const style = document.createElement('style');
    style.textContent = `
      .mask__error-input {
        border: 2px solid red !important;
      }   
      .mask__default-input {
        border: 1px solid ${defaultBorderColor} !important;
      }   
      .mask__success-input {
        border: 2px solid green !important;
      }   
    `;

    document.head.appendChild(style);
  };

  const error = () => {
    event.target.classList.add('mask__error-input');
    event.target.classList.remove('mask__default-input');
    event.target.classList.remove('mask__success-input');
  };

  const defaultStyle = () => {
    event.target.classList.remove('mask__error-input');
    event.target.classList.add('mask__default-input');
  };

  const success = () => {
    event.target.classList.remove('mask__error-input');
    event.target.classList.add('mask__success-input');
  };

  const focus = () => {
    const indexOfUnderscores = masked.indexOf('_');
    if (elem.value < 1) {
      elem.value = masked.slice(0, indexOfUnderscores);
    }
  };

  const input = () => {
    const lastSimbol = event.target.value.slice(-1),
      firstDash = masked.indexOf('-'),
      lastDash = masked.lastIndexOf('-');

    if (event.data === null && (elem.value.length === firstDash || elem.value.length === lastDash)) {
      elem.value = elem.value.slice(0, -1);
    }
    if (event.data === null && elem.value.length === 8) {
      elem.value = elem.value.slice(0, -2);
    }

    const getActualValue = () => {
      let indexOfUnderscores = 0,
        template = masked,
        countryCode = template.replace(/\D/g, ''),
        numberValue = elem.value.replace(/\D/g, '');

      let actualValue = template.replace(/[_\d]/g, function (e) {
        return indexOfUnderscores < numberValue.length ? numberValue[indexOfUnderscores++] || countryCode[indexOfUnderscores] : e;
      });

      indexOfUnderscores = actualValue.indexOf('_');

      indexOfUnderscores !== -1 ? actualValue = actualValue.slice(0, indexOfUnderscores) : success();

      return actualValue;
    };

    elem.value = getActualValue();

    elem.value.length !== masked.length ?
      /\D/g.test(lastSimbol) ? error() : defaultStyle() :
      success();
  };

  const blur = () => {
    if (elem.value.length !== masked.length) {
      error();
      if (elem.value.length < clearLength) {
        elem.value = '';
      }
    }
  };

  const eventListeners = () => {
    elem.addEventListener('focus', focus);
    elem.addEventListener('input', input);
    elem.addEventListener('blur', blur);
  };

  addStyle();
  eventListeners();
};

export default maskPhone;