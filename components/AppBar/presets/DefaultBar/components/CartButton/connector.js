import { connect } from 'react-redux';
import { historyPush } from '@shopgate/pwa-common/actions/router';
import { getCartProductDisplayCount } from '@shopgate/pwa-common-commerce/cart/selectors';

/**
 * Maps the contents of the state to the component props.
 * @param {Object} state The current application state.
 * @return {Object} The extended component props.
 */
const mapStateToProps = state => ({
  count: getCartProductDisplayCount(state),
});

/**
 * @param {Function} dispatch The store dispatch method.
 * @return {Object}
 */
const mapDispatchToProps = dispatch => ({
  navigate: () => dispatch(historyPush({ pathname: '/cart' })),
});

export default connect(mapStateToProps, mapDispatchToProps);
