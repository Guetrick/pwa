import { connect } from 'react-redux';
import { navigate } from '@shopgate/pwa-common/action-creators/router';
import {
  getBackgroundColor,
  isFilterOpen,
  isEnabled,
  isNavSearchFieldActive,
  isSearchShowing,
  isTitleShowing,
  showLoadingBar,
  getTextColor,
} from './selectors';

/**
 * @param {Object} state The current application state.
 * @return {Object}
 */
const mapStateToProps = state => ({
  backgroundColor: getBackgroundColor(state),
  filterOpen: isFilterOpen(state),
  navigatorEnabled: isEnabled(state),
  searchActive: isNavSearchFieldActive(state),
  showSearch: isSearchShowing(state),
  showTitle: isTitleShowing(state),
  showLoadingBar: showLoadingBar(state),
  textColor: getTextColor(state),
});

/**
 * @param {Function} dispatch The store dispatcher.
 * @return {Object}
 */
const mapDispatchToProps = dispatch => ({
  navigate: (action, href) => dispatch(navigate(action, href)),
});

export default connect(mapStateToProps, mapDispatchToProps);
