import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UIEvents } from '@shopgate/pwa-core';
import I18n from '@shopgate/pwa-common/components/I18n';
import styles from './style';

/**
 * The NavDrawerItem component.
 */
class NavDrawerItem extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    badge: PropTypes.func,
    icon: PropTypes.func,
    onClick: PropTypes.func,
    style: PropTypes.shape(),
    testId: PropTypes.string,
  };

  static defaultProps = {
    badge: null,
    icon: null,
    onClick: () => {},
    style: {},
    testId: null,
  };

  /**
   * Handles an Item click by executing it's href.
   * @param {Object} props The component props.
   */
  handleClick = () => {
    this.props.onClick();
    UIEvents.emit('navdrawer_close');
  };

  /**
   * Renders the component.
   * @returns {JSX}
   */
  render() {
    const {
      badge: Badge,
      icon: Icon,
      label,
      style,
      testId,
    } = this.props;

    return (
      <button
        className={styles.button}
        data-test-id={testId}
        onClick={this.handleClick}
        role="link"
        style={style}
      >
        <div className={styles.iconWrapper}>
          {Icon && <Icon className={styles.icon} size={24} />}
        </div>
        <I18n.Text className={styles.label} string={label} />
        {Badge && <Badge />}
      </button>
    );
  }
}

export default NavDrawerItem;
