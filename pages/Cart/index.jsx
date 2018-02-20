/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Portal from '@shopgate/pwa-common/components/Portal';
import * as portals from '@shopgate/pwa-common-commerce/cart/constants/Portals';
import View from 'Components/View';
import CardList from 'Components/CardList';
import MessageBar from 'Components/MessageBar';
import TaxDisclaimer from 'Components/TaxDisclaimer';
import Item from './components/Item';
import CouponField from './components/CouponField';
import Empty from './components/Empty';
import PaymentBar from './components/PaymentBar';
import connect from './connector';
import styles from './style';

/**
 * The cart view component.
 * @returns {JSX}
 */
class Cart extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    cartItems: PropTypes.arrayOf(PropTypes.shape()),
    messages: PropTypes.arrayOf(PropTypes.shape()),
  };

  static defaultProps = {
    cartItems: [],
    messages: [],
  };

  static contextTypes = {
    i18n: PropTypes.func,
  };

  /**
   * Constructor.
   * @param {Object} props The component props.
   */
  constructor(props) {
    super(props);

    this.state = {
      isPaymentBarHidden: false,
      containerPaddingStyle: styles.getContainerPaddingStyle(),
    };
  }

  /**
   * Callback for the onSize event of the PaymentBar.
   * @param {Object} size An object which contains data about the current componenent dimensions.
   */
  onSize = ({ height }) => {
    this.setState({
      containerPaddingStyle: styles.getContainerPaddingStyle(height),
    });
  }

  /**
   * Returns the translated view title.
   * @return {string}
   */
  get title() {
    const { __ } = this.context.i18n();
    return __('titles.cart');
  }

  /**
   * Toggles the visibility of the payment bar.
   * It's called when the QuantityPicker or CouponField is focused or blurred.
   * @param {boolean} isHidden Tells if the payment bar is hidden or not.
   */
  togglePaymentBar = (isHidden) => {
    this.setState({
      isPaymentBarHidden: isHidden,
    });
  };

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const { cartItems, isLoading, messages } = this.props;

    return (
      <View title={this.title}>
        <section className={styles.container} style={this.state.containerPaddingStyle}>
          {messages.length > 0 && <MessageBar messages={messages} />}
          {cartItems.length > 0 && (
            <Fragment>
              <Portal name={portals.CART_ITEM_LIST_BEFORE} />
              <Portal name={portals.CART_ITEM_LIST}>
                <CardList>
                  {cartItems.map(cartItem => (
                    <Fragment key={cartItem.id}>
                      <Portal name={portals.CART_ITEM_BEFORE} props={{ id: cartItem.id }} />
                      <Portal name={portals.CART_ITEM} props={{ id: cartItem.id }}>
                        <Item
                          item={cartItem}
                          togglePaymentBar={this.togglePaymentBar}
                        />
                      </Portal>
                      <Portal name={portals.CART_ITEM_AFTER} props={{ id: cartItem.id }} />
                    </Fragment>
                  ))}
                  <Portal name={portals.CART_COUPON_FIELD_BEFORE} />
                  <Portal name={portals.CART_COUPON_FIELD} >
                    <CouponField onToggleFocus={this.togglePaymentBar} />
                  </Portal>
                  <Portal name={portals.CART_COUPON_FIELD_AFTER} />
                </CardList>
              </Portal>
              <Portal name={portals.CART_ITEM_LIST_AFTER} />
              <Portal name={portals.CART_PAYMENT_BAR} >
                <PaymentBar isVisible={!this.state.isPaymentBarHidden} onSize={this.onSize} />
              </Portal>
            </Fragment>
          )}
          {(!isLoading && cartItems.length !== 0) && <TaxDisclaimer />}
        </section>
        {(!isLoading && cartItems.length === 0) && <Empty />}
      </View>
    );
  }
}

export default connect(Cart);
