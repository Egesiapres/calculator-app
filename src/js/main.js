import '../scss/styles.scss';

const background = document.getElementById('background');

const input = document.querySelector('input');

const rows = document.querySelectorAll('div#calculator > div');

const zeroDiv = document.getElementById('zero-div');

const keypad = [
  {
    name: 'numbers',
    values: [
      { id: 'zero', value: '0', role: 'number' },
      { id: 'comma', value: '.', role: 'number' },
      { id: 'one', value: '1', role: 'number' },
      { id: 'two', value: '2', role: 'number' },
      { id: 'three', value: '3', role: 'number' },
      { id: 'four', value: '4', role: 'number' },
      { id: 'five', value: '5', role: 'number' },
      { id: 'six', value: '6', role: 'number' },
      { id: 'seven', value: '7', role: 'number' },
      { id: 'eight', value: '8', role: 'number' },
      { id: 'nine', value: '9', role: 'number' },
    ],
    class: 'btn btn-light col m-1',
  },
  {
    name: 'primary-operators',
    values: [
      { id: 'plus', value: '+', role: 'primary' },
      { id: 'minus', value: '-', role: 'primary' },
      { id: 'mul', value: 'x', role: 'primary' },
      { id: 'div', value: '/', role: 'primary' },
      { id: 'equal', value: '=', role: 'primary' },
    ],
    class: 'btn btn-primary col m-1',
  },
  {
    name: 'secondary-operators',
    values: [
      { id: 'cancel', value: 'C', role: 'secondary' },
      { id: 'percent', value: '%', role: 'secondary' },
      { id: 'negate', value: '+/-', role: 'secondary' },
    ],
    class: 'blue-secondary col m-1',
  },
  {
    name: 'color-themes',
    values: [
      {
        id: 'blue',
        active: {
          text: 'Lilac',
          button: 'col m-1',
          background: 'col-6 rounded p-1 bg-secondary-subtle',
          input: 'form-control form-control-lg text-end',
        },
        role: 'color',
      },
      {
        id: 'lilac',
        active: {
          text: 'Blue',
          button: 'btn btn-primary col m-1',
          primary: 'lilac-primary',
          secondary: 'lilac-secondary',
          number: 'btn btn-light col',
          background: 'col-6 rounded p-1 bg-secondary-subtle',
          input: 'form-control form-control-lg text-end',
        },
        role: 'color',
      },
      {
        id: '',
        active: {
          button: 'apple-button',
          primary: 'apple-primary',
          secondary: 'apple-secondary',
          number: 'apple-number',
          background: 'col-6 rounded apple-background',
          input:
            'form-control form-control-lg text-end text-white border-0 apple-background',
        },
        role: 'color',
      },
      { id: 'random', value: 'false', role: 'color' },
      { id: 'dark', value: 'false', role: 'color' },
    ],
  },
];

const numbers = keypad[0];
const primaryOperators = keypad[1];
const secondaryOperators = keypad[2];
const colors = keypad[3];

let inputValues = {
  firstNumber: null,
  operator: null,
  secondNumber: null,
};

const handleNumbers = ({ id, value }) => {
  const buttonId = id;
  const buttonValue = value;

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

      decimalNumber = handleComma();

      setInputValues(inputValues, input.value, decimalNumber);
    }
  } else if (['+', '-', 'x', '/'].includes(buttonValue)) {
    // +, -, x, / buttons behaviour
    if (input.value === '0') {
      setInputValues(inputValues, input.value);
    } else if (canCalculate(inputValues)) {
      handleCalculate(inputValues);
    }

    inputValues.operator = buttonValue;
  } else if (buttonValue === '=') {
    // = button behaviour
    canCalculate(inputValues) && handleCalculate(inputValues);
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

const isNumber = value =>
  numbers.values.map(el => el.value !== '.' && el.value).includes(value);

const isFirstNumber = ({ firstNumber }) => firstNumber;

const isNotSecondNumber = ({ operator, secondNumber }) =>
  operator && !secondNumber;

const canCalculate = ({ operator, secondNumber }) =>
  isFirstNumber && operator && secondNumber;

const setInputValues = (inputValues, entireValue, decimalValue) => {
  const number = decimalValue
    ? parseInt(entireValue) + decimalValue
    : parseInt(entireValue);

  inputValues.operator === null
    ? (inputValues.firstNumber = number)
    : (inputValues.secondNumber = number);
};

const resetInputValues = () => {
  inputValues = {
    firstNumber: null,
    operator: null,
    secondNumber: null,
  };
};

const handleCalculate = ({ firstNumber, operator, secondNumber }) => {
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

const handleComma = () => {
  const commaIndex = input.value.indexOf('.');
  const decimal = input.value.slice(commaIndex + 1);
  const decimalLength = decimal.length;

  const decimalNumber = decimal / 10 ** decimalLength;

  return decimalNumber;
};

const blue = colors.values[0];
const lilac = colors.values[1];
const apple = colors.values[2];

const handleColors = clickedBtn => {
  clickedBtn.id === 'lilac' && toggleColorTheme(clickedBtn, lilac);

  clickedBtn.id === '' && toggleColorTheme(clickedBtn, apple);
};

let colorValues = {
  lilac: 'false',
  '': 'false',
  random: 'false',
  dark: 'false',
};

// blue active = others inactive
const { active: inactive } = blue;

const toggleColorTheme = (button, { active }) => {
  // update all the color button values to false
  Object.keys(colorValues)
    .filter(el => el !== button.id)
    .forEach(el => {
      const colorButton = document.getElementById(el);
      colorButton.setAttribute('value', 'false');
    });

  // 'resets' the lilac button text
  if (button.id !== 'lilac') {
    const lilacBtn = document.getElementById('lilac');
    lilacBtn.textContent = inactive.text;
  }

  const isActive = button.getAttribute('value') === 'true';

  button.setAttribute('value', isActive ? 'false' : 'true');

  const isApple = button.id === '';

  if (active.background) {
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
            ? `${active.number} container ${!isApple && 'm-1'} ${active.number}`
            : `${active.number} col ${!isApple && 'm-1'}`
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
            : `${active.primary} col ${!isApple && 'm-1'}`
        );

      el.role === 'secondary' &&
        btn.setAttribute(
          'class',
          isActive
            ? secondaryOperators.class
            : `${active.secondary} col ${!isApple && 'm-1'}`
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

const initializeKeypad = () => {
  keypad.forEach(({ values }) => {
    values.forEach(({ id, value }) => {
      if (id !== 'blue') {
        const btn = document.getElementById(id);

        btn.addEventListener(
          'click',
          !isColor(id)
            ? () => handleNumbers({ id, value })
            : () => handleColors(btn)
        );
      }
    });
  });
};

const isColor = value => colors.values.map(el => el.id).includes(value);

initializeKeypad();
