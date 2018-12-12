import { createSelector } from 'reselect';
import { getCurrentRoute } from '@shopgate/pwa-common/helpers/router';

/**
 * @param {Object} state The global state.
 * @return {Object}
 */
export const getRouterState = state => state.router;

/**
 * @param {Object} state The global state.
 * @return {Object}
 */
export const getRouterStack = createSelector(
  getRouterState,
  state => state.stack
);

/**
 * @param {Object} state The global state.
 * @returns {Object|null}
 */
export const getCurrentParams = () => {
  const route = getCurrentRoute();

  if (!route || !route.params) {
    return null;
  }

  return route.params;
};

/**
 * @param {Object} state The global state.
 * @returns {string|null} The current history pathname.
 */
export const getCurrentPathname = () => {
  const route = getCurrentRoute();

  if (!route || !route.pathname) {
    return null;
  }

  return route.pathname;
};

/**
 * @param {Object} state The global state.
 * @returns {Object|null} The current history query.
 */
export const getCurrentQuery = () => {
  const route = getCurrentRoute();

  if (!route || !route.query) {
    return null;
  }

  return route.query;
};

/**
 * @param {Object} state The global state.
 * @returns {string|null} The current history search query.
 */
export const getCurrentSearchQuery = createSelector(
  getCurrentQuery,
  (query) => {
    if (!query || !query.s) {
      return null;
    }

    return query.s;
  }
);

/**
 * @param {Object} state The global state.
 * @returns {string|null} The current history entry state.
 */
export const getCurrentState = () => {
  const route = getCurrentRoute();

  if (!route || !route.state) {
    return null;
  }

  return route.state;
};
