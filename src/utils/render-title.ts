import gradient from 'gradient-string';
import { APP_TITLE_TEXT } from '../constants';

const titleColors = {
  blue: '#add7ff',
  cyan: '#89ddff',
  green: '#5de4c7',
  magenta: '#fae4fc',
  red: '#d0679d',
  yellow: '#fffac2',
};

export const renderTitle = () => {
  const titleGradient = gradient(Object.values(titleColors));

  console.log(titleGradient.multiline(APP_TITLE_TEXT));
};
