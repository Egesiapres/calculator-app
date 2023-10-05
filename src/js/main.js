import '../scss/styles.scss';
import { keypad } from './keypad';
import { handleNumberButton } from './numbers';
import { handleColorButton, isColor } from './colors';

const initializeKeypad = () => {
  keypad.forEach(({ values }) => {
    values.forEach(({ id, value }) => {
      if (id !== 'blue') {
        const btn = document.getElementById(id);

        btn?.addEventListener(
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
