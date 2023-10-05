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

import { html, background, input, rows, zeroDiv } from './elements';

export const isColor = value => colors.values.map(el => el.id).includes(value);

const colorValues = {
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
      // ? added after commenting rand and dark buttons
      colorButton?.setAttribute('value', 'false');
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

  if (active?.html) {
    html.setAttribute('data-bs-theme', active.html);
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
        // ? added after commenting rand and dark buttons
        btn?.setAttribute(
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

export const handleColorButton = clickedBtn => {
  clickedBtn.id === 'lilac' && toggleColorTheme(clickedBtn, lilac);

  clickedBtn.id === '' && toggleColorTheme(clickedBtn, apple);

  clickedBtn.id === 'dark' && toggleColorTheme(clickedBtn, dark);
};
