/** @type {import('tailwindcss').Config} */
export const mode = 'jit';
export const content = [
  './src/**/*.{js,ts,jsx,tsx}',
  './public/**/*.html',
];
export const theme = {
  extend: {
    colors: {
      'primary': '#3B82F6',
    },
  },
};
export const plugins = [];