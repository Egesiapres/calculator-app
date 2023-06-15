import '../scss/styles.scss';

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
    class: 'btn blue-secondary col m-1',
  },
  {
    name: 'color-themes',
    values: [
      {
        id: 'lilac',
        inactive: {
          text: 'Lilac',
          button_class: 'lilac-primary',
        },
        active: {
          text: 'Blue',
          button_class: 'btn btn-primary col m-1',
          primary_class: 'lilac-primary',
          secondary_class: ' lilac-secondary',
          number_class: 'btn btn-light col m-1',
        },
      },
      {
        id: '',
        active: {
          primary_class: ' apple-primary',
          secondary_class: ' apple-secondary',
          number_class: ' apple-number',
        },
      },
      { id: 'random', value: 'false' },
      { id: 'dark', value: 'false' },
    ],
  },
];

const numbers = keypad[0];
const primaryOperators = keypad[1];
const secondaryOperators = keypad[2];
const colors = keypad[3];

const input = document.querySelector('input');

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

const lilac = colors.values[0];
const apple = colors.values[1];

const handleColors = clickedBtn => {
  clickedBtn.id === 'lilac' && toggleColorTheme(clickedBtn, lilac);

  clickedBtn.id === '' && toggleColorTheme(clickedBtn, apple);
};

const toggleColorTheme = (button, { inactive, active }) => {
  const isActive = button.getAttribute('value') === 'true';

  button.setAttribute('value', isActive ? 'false' : 'true');

  if (active.text) {
    button.textContent = isActive ? inactive.text : active.text;
    button.setAttribute(
      'class',
      isActive
        ? primaryOperators.class + ` ${inactive.button_class}`
        : active.button_class
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
              ? 'btn container btn-light m-1'
              : numbers.class
            : isZero
            ? `btn container m-1 ${active.number_class}`
            : numbers.class + ` ${active.number_class}`
        );

      el.role === 'primary' &&
        btn.setAttribute(
          'class',
          isActive
            ? primaryOperators.class
            : `col m-1 ${active.primary_class}`
        );

      el.role === 'secondary' &&
        btn.setAttribute(
          'class',
          isActive
            ? secondaryOperators.class
            : secondaryOperators.class + ` ${active.secondary_class}`
        );
    });
  });
};

const initializeKeypad = () => {
  keypad.forEach(({ values }) => {
    values.forEach(({ id, value }) => {
      const btn = document.getElementById(id);

      btn.addEventListener(
        'click',
        !isColor(id)
          ? () => handleNumbers({ id, value })
          : () => handleColors(btn)
      );
    });
  });
};

const isColor = value => colors.values.map(el => el.id).includes(value);

initializeKeypad();
