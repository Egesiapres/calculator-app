import '../scss/styles.scss';

const keypad = [
  {
    name: 'numbers',
    values: [
      { id: 'zero', value: '0' },
      { id: 'comma', value: '.' },
      { id: 'one', value: '1' },
      { id: 'two', value: '2' },
      { id: 'three', value: '3' },
      { id: 'four', value: '4' },
      { id: 'five', value: '5' },
      { id: 'six', value: '6' },
      { id: 'seven', value: '7' },
      { id: 'eight', value: '8' },
      { id: 'nine', value: '9' },
    ],
    class: 'btn btn-light col m-1',
  },
  {
    name: 'operators',
    values: [
      { id: 'plus', value: '+' },
      { id: 'minus', value: '-' },
      { id: 'mul', value: 'x' },
      { id: 'div', value: '/' },
      { id: 'equal', value: '=' },
    ],
    class: 'btn btn-primary col-3 m-1',
  },
  {
    name: 'misc',
    values: [
      { id: 'cancel', value: 'C' },
      { id: 'percent', value: '%' },
      { id: 'negate', value: '+/-' },
    ],
    class: 'btn btn-secondary col m-1',
  },
  {
    name: 'color-themes',
    values: [
      { id: 'lilac', value: 'false' },
      { id: 'random', value: 'false' },
      { id: 'dark', value: 'false' },
    ],
  },
];

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
  keypad[0].values.map(el => el.value !== '.' && el.value).includes(value);

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

const handleColors = ({ id, value }) => {
  const buttonValue = value;
  const buttonId = id;
  let btn = document.getElementById(id);

  const primaryButtons = keypad[1].values.map(el => el.id);
  const secondaryButtons = keypad[2].values.map(el => el.id);

  if (buttonId === 'lilac' && buttonValue === 'false') {
    console.log('lilac button clicked');

    primaryButtons.forEach(el => {
      btn = document.getElementById(el);
      btn.setAttribute('class', keypad[1].class + ' primary-purple');
    });

    secondaryButtons.forEach(el => {
      btn = document.getElementById(el);
      btn.setAttribute('class', keypad[2].class + ' secondary-purple');
    });
  }
};

const initializeKeypad = () => {
  keypad.forEach(({ values }) => {
    values.forEach(({ id, value }) => {
      const btn = document.getElementById(id);

      if (!isColor(id)) {
        btn.addEventListener('click', () => handleNumbers({ id, value }));
      } else {
        btn.addEventListener('click', () => handleColors({ id, value }));
      }
    });
  });
};

const isColor = value => keypad[3].values.map(el => el.id).includes(value);

initializeKeypad();
