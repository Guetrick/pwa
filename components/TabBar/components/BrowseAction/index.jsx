/**
 * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *
 * This source code is licensed under the Apache 2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ParsedLink from '@shopgate/pwa-common/components/Router/helpers/parsed-link';
import Portal from '@shopgate/pwa-common/components/Portal';
import { BROWSE_PATH } from 'Pages/Browse/constants';
import BrowseIcon from 'Components/icons/BrowseIcon';
import * as portals from '../../constants';
import TabBarAction from '../TabBarAction';
import styles from './style';

/**
 * The tab bar browse action.
 */
class TabBarBrowseAction extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    ...TabBarAction.propTypes,
  };

  static defaultProps = TabBarAction.defaultProps;

  /**
   * Handles the click action.
   */
  handleClick = () => {
    if (this.props.path === BROWSE_PATH) {
      return;
    }

    const link = new ParsedLink(BROWSE_PATH);
    link.open();
  }

  /**
   * Renders the component.
   * @return {JSX}
   */
  render() {
    return (
      <Fragment>
        <Portal name={portals.TAB_BAR_BROWSE_BEFORE} props={this.props} />
        <Portal
          name={portals.TAB_BAR_BROWSE}
          props={{
            ...this.props,
            TabBarAction,
          }}
        >
          <TabBarAction
            {...this.props}
            icon={(
              <Portal name={portals.TAB_BAR_BROWSE_ICON}>
                <BrowseIcon className={styles} />
              </Portal>
            )}
            onClick={this.handleClick}
          />
        </Portal>
        <Portal name={portals.TAB_BAR_BROWSE_AFTER} props={this.props} />
      </Fragment>
    );
  }
}

export default TabBarBrowseAction;
