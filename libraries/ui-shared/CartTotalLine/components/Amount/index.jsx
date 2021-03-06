import React from 'react';
import PropTypes from 'prop-types';
import I18n from '@shopgate/pwa-common/components/I18n';
import styles from './style';

/**
 * The Amount component.
 * @param {Object} props The component props.
 * @return {JSX}
 */
const Amount = ({ amount, currency }) => {
  if (amount === null) {
    return null;
  }

  return (
    <div className={styles.amount}>
      {typeof amount === 'string' && <I18n.Text string={amount} />}
      {typeof amount === 'number' && <I18n.Price price={amount} currency={currency} />}
    </div>
  );
};

Amount.propTypes = {
  amount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  currency: PropTypes.string,
};

Amount.defaultProps = {
  amount: null,
  currency: null,
};

export default Amount;
