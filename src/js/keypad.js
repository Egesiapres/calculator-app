export const keypad = [
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
      {
        id: 'random',
        value: 'false',
        role: 'color',
      },
      {
        id: 'dark',
        active: {
          text: 'Light',
          html: 'blue',
        },
        role: 'color',
      },
    ],
  },
];

export const numbers = keypad[0];
export const primaryOperators = keypad[1];
export const secondaryOperators = keypad[2];
export const colors = keypad[3];

export const blue = colors.values[0];
export const lilac = colors.values[1];
export const apple = colors.values[2];
export const dark = colors.values[4];