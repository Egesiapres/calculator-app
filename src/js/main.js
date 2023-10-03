import '../scss/styles.scss';
import {
  keypad,
  numbers,
  primaryOperators,
  secondaryOperators,
  colors,
  blue,
  lilac,
  apple,
  dark,
} from './keypad';

const html = document.querySelector('html');

const background = document.getElementById('background');

const input = document.querySelector('input');

const rows = document.querySelectorAll('div#calculator > div');

const zeroDiv = document.getElementById('zero-div');

let inputValues = {
  firstNumber: null,
  operator: null,
  secondNumber: null,
};

const resetInputValues = () => {
  inputValues = {
    firstNumber: null,
    operator: null,
    secondNumber: null,
  };
};

const setInputValues = (inputValues, entireValue, decimalValue) => {
  const number = decimalValue
    ? parseInt(entireValue) + decimalValue
    : parseInt(entireValue);

  inputValues.operator === null
    ? (inputValues.firstNumber = number)
    : (inputValues.secondNumber = number);
};

const isNumber = value =>
  numbers.values.map(el => el.value !== '.' && el.value).includes(value);

const isFirstNumber = ({ firstNumber }) => firstNumber;

const isNotSecondNumber = ({ operator, secondNumber }) =>
  operator && !secondNumber;

const canCalculate = ({ operator, secondNumber }) =>
  isFirstNumber && operator && secondNumber;

const handleCommaButton = () => {
  const commaIndex = input.value.indexOf('.');
  const decimal = input.value.slice(commaIndex + 1);
  const decimalLength = decimal.length;

  const decimalNumber = decimal / 10 ** decimalLength;

  return decimalNumber;
};

const handleCalculateButton = ({ firstNumber, operator, secondNumber }) => {
  let calcResult;

  switch (operator) {
    case '+':
      calcResult = firstNumber + secondNumber;
      break;
    case '-':
      calcResult = firstNumber - secondNumber;
      break;
    case 'x':
      calcResult = firstNumber * secondNumber;
      break;
    case '/':
      calcResult = firstNumber / secondNumber;
      break;

    default:
      null;
      break;
  }

  inputValues = {
    firstNumber: calcResult,
    operator: null,
    secondNumber: null,
  };

  input.value = calcResult;
};

const handleNumberButton = ({ id: buttonId, value: buttonValue }) => {
  let decimalNumber;

  if (
    (input.value === '0' && isNumber(buttonValue)) ||
    (isNotSecondNumber(inputValues) && isNumber(buttonValue))
  ) {
    // values to change with the button values
    input.value = buttonValue;

    setInputValues(inputValues, input.value, decimalNumber);
  } else if (buttonValue === 'C') {
    // C button behaviour
    input.value = 0;

    resetInputValues();
  } else if (buttonValue === '+/-') {
    // +/- button behaviour
    if (isFirstNumber(inputValues)) {
      input.value = -input.value;
      setInputValues(inputValues, input.value);
    }
  } else if (buttonValue === '%') {
    // % button behaviour

    if (isFirstNumber(inputValues)) {
      input.value = input.value / 100;

      decimalNumber = handleCommaButton();

      setInputValues(inputValues, input.value, decimalNumber);
    }
  } else if (['+', '-', 'x', '/'].includes(buttonValue)) {
    // +, -, x, / buttons behaviour
    if (input.value === '0') {
      setInputValues(inputValues, input.value);
    } else if (canCalculate(inputValues)) {
      handleCalculateButton(inputValues);
    }

    inputValues.operator = buttonValue;
  } else if (buttonValue === '=') {
    // = button behaviour
    canCalculate(inputValues) && handleCalculateButton(inputValues);
  } else {
    // . button behaviour
    // numbers with more than one numeral
    if (input.value.includes('.')) {
      if (isNumber(buttonValue)) {
        input.value += buttonValue;

        decimalNumber = handleComma();

        setInputValues(inputValues, input.value, decimalNumber);
      }
    } else if (!isColor(buttonId)) {
      input.value += buttonValue;
      setInputValues(inputValues, input.value);
    }
  }

  console.log(inputValues);
};

let colorValues = {
  lilac: 'false',
  '': 'false',
  random: 'false',
  dark: 'false',
};

// blue active = others inactive
// apart from dark button
const { active: inactive } = blue;

const toggleColorTheme = (button, { active }) => {
  // update all the color button values to false
  Object.keys(colorValues)
    .filter(el => el !== button.id)
    .forEach(el => {
      const colorButton = document.getElementById(el);
      colorButton.setAttribute('value', 'false');
    });

  const isActive = button.getAttribute('value') === 'true';
  const isLilac = button.id === 'lilac';
  const isApple = button.id === '';

  button.setAttribute('value', isActive ? 'false' : 'true');

  // 'resets' the lilac button text
  if (!isLilac) {
    const lilacBtn = document.getElementById('lilac');
    lilacBtn.textContent = inactive.text;
  }

  if (active?.background) {
    background.setAttribute(
      'class',
      isActive ? inactive.background : active.background
    );

    input.setAttribute('class', isActive ? inactive.input : active.input);

    rows.forEach(el =>
      el.setAttribute('class', isActive ? 'row ms-auto me-auto' : 'row m-0')
    );
  }

  if (active.text) {
    button.textContent = isActive ? inactive.text : active.text;
    button.setAttribute(
      'class',
      isActive ? primaryOperators.class + ` ${inactive.button}` : active.button
    );
  }

  keypad.forEach(el => {
    el.values.forEach(el => {
      const btn = document.getElementById(el.id);
      const isZero = el.id === 'zero';

      el.role === 'number' &&
        btn.setAttribute(
          'class',
          isActive
            ? isZero
              ? `btn btn-light container m-1`
              : numbers.class
            : isZero
            ? `${active?.number} container ${!isApple && 'm-1'} ${
                active?.number
              }`
            : `${active?.number} col ${!isApple && 'm-1'}`
        );

      el.role === 'number' &&
        zeroDiv.setAttribute(
          'class',
          isActive
            ? isApple
              ? 'col-6 ps-0 pe-2'
              : 'col-6 ps-0 pe-2'
            : isApple
            ? 'col-6 p-0'
            : 'col-6 ps-0 pe-2'
        );

      el.role === 'primary' &&
        btn.setAttribute(
          'class',
          isActive
            ? primaryOperators.class
            : `${active?.primary} col ${!isApple && 'm-1'}`
        );

      el.role === 'secondary' &&
        btn.setAttribute(
          'class',
          isActive
            ? secondaryOperators.class
            : `${active?.secondary} col ${!isApple && 'm-1'}`
        );

      el.role === 'color' &&
        el.id !== 'blue' &&
        btn.setAttribute(
          'class',
          isActive
            ? `${
                btn.id === 'lilac'
                  ? `${lilac.active.primary}`
                  : btn.id === 'dark'
                  ? `btn btn-dark`
                  : `btn btn-secondary`
              } ${inactive.button}`
            : `${
                btn.id === 'lilac'
                  ? `${!isApple ? lilac.active.button : 'apple-lilac'} ${
                      isApple && 'apple-color'
                    }`
                  : btn.id === 'dark'
                  ? `${!isApple ? 'btn btn-dark' : 'apple-dark'} ${
                      isApple && 'apple-color'
                    }`
                  : `btn btn-secondary ${isApple && 'apple-number'}`
              } col ${!isApple && 'm-1'}`
        ); 
    });
  });
};

const handleColorButton = clickedBtn => {
  clickedBtn.id === 'lilac' && toggleColorTheme(clickedBtn, lilac);

  clickedBtn.id === '' && toggleColorTheme(clickedBtn, apple);

  clickedBtn.id === 'dark' && toggleColorTheme(clickedBtn, dark);
};

const isColor = value => colors.values.map(el => el.id).includes(value);

const initializeKeypad = () => {
  keypad.forEach(({ values }) => {
    values.forEach(({ id, value }) => {
      if (id !== 'blue') {
        const btn = document.getElementById(id);

        btn.addEventListener(
          'click',
          !isColor(id)
            ? () => handleNumberButton({ id, value })
            : () => handleColorButton(btn)
        );
      }
    });
  });
};

initializeKeypad();
