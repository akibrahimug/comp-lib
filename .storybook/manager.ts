import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'Component Library',
  brandUrl: '#',
  brandTarget: '_self',

  colorPrimary: '#005BBB',
  colorSecondary: '#FFB703',

  // UI
  appBg: '#F9FAFB',
  appContentBg: '#FFFFFF',
  appBorderColor: '#D0D5DD',
  appBorderRadius: 8,

  // Typography
  fontBase: '"Inter", system-ui, sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#101828',
  textInverseColor: '#FFFFFF',

  // Toolbar default and active colors
  barTextColor: '#667085',
  barSelectedColor: '#005BBB',
  barBg: '#FFFFFF',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: '#D0D5DD',
  inputTextColor: '#101828',
  inputBorderRadius: 6,
});

addons.setConfig({
  theme,
});
