import { themeConfig } from './mock';

/**
 * Provides a default theme config as a fallback.
 * @type {Object}
 */
const defaultConfig = {
  font: {},
  colors: {},
  variables: {},
};

/**
 * Builds the theme config.
 * @param {Object} appConfig The app config.
 * @returns {Object}
 */
export function getThemeConfig(appConfig) {
  if (process.env.NODE_ENV === 'test') {
    return themeConfig;
  }

  const { colors = {}, theme = {} } = appConfig;

  const oldTheme = process.env.THEME_CONFIG || defaultConfig;

  return {
    ...theme,
    font: theme.typography,
    colors: {
      ...theme.colors,
      ...colors,
      /**
       * The SDK creates some colors dynamically and populates them via the THEME_CONFIG.
       * To avoid breaking changes, those colors also needs to be added for now.
       */
      ...oldTheme.colors,
    },
    variables: {
      ...(oldTheme.variables || {}),
      materialShadow: theme.variables.baseShadow,
    },
  };
}
