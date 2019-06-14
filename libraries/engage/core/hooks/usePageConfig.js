import defaultsDeep from 'lodash/defaultsDeep';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';
import { useRoute } from './useRoute';
import { getThemeSettings } from '../config/getThemeSettings';

/**
 * Retrieves the configuration for the current page.
 * @returns {Object}
 */
export function usePageConfig() {
  const route = useRoute();
  const { pages } = themeConfig;
  const globalSettings = getThemeSettings();
  const page = pages.find(element => element.pattern === route.pattern);

  if (!page) {
    return {};
  }

  const {
    name, id, pattern, ...config
  } = page;

  const settings = defaultsDeep(config.settings, globalSettings);

  return {
    ...config,
    settings,
  };
}
