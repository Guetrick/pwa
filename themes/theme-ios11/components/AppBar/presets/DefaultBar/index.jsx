import React, { Fragment, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Portal } from '@shopgate/pwa-common/components';
import {
  APP_BAR_DEFAULT_BEFORE,
  APP_BAR_DEFAULT,
  APP_BAR_DEFAULT_AFTER,
} from '@shopgate/pwa-common/constants/Portals';
import { AppBar } from '@shopgate/pwa-ui-ios';
import { withRoute, withWidgetSettings, withApp } from '@shopgate/engage/core';
import AppBarIcon from './components/Icon';
import ProgressBar from './components/ProgressBar';
import connect from './connector';

/**
 * The AppBarDefault component.
 */
class AppBarDefault extends PureComponent {
  static propTypes = {
    app: PropTypes.shape().isRequired,
    resetStatusBar: PropTypes.func.isRequired,
    route: PropTypes.shape().isRequired,
    setFocus: PropTypes.bool.isRequired,
    updateStatusBar: PropTypes.func.isRequired,
    widgetSettings: PropTypes.shape().isRequired,
    below: PropTypes.node,
    title: PropTypes.string,
  };

  static defaultProps = {
    below: null,
    title: null,
  };

  static contextTypes = {
    i18n: PropTypes.func,
  };

  state = {
    target: document.getElementById('AppHeader'),
  }

  /**
   * Sets the target if it hasn't been set before.
   */
  componentDidMount() {
    let { target } = this.state;

    if (!target) {
      target = document.getElementById('AppHeader');
      this.setState({ target: target || null }); // eslint-disable-line react/no-did-mount-set-state
    }

    if (this.props.setFocus) {
      // Set the focus to the first focusable element for screen readers.
      const focusable = target.querySelector('button:not([aria-hidden="true"]), [tabindex]:not([tabindex="-1"])');

      if (focusable) {
        focusable.focus();
      }
    }

    if (this.props.route.visible) {
      this.props.updateStatusBar(this.props.widgetSettings);
    }
  }

  /**
   * Syncs the colors of the device status bar with the colors of the AppBar when it came visible.
   * @param {Object} prevProps The previous component props.
   */
  componentDidUpdate(prevProps) {
    if (!this.props.route.visible) {
      // Only visible app bars trigger color syncing.
      return;
    }

    const routeDidEnter =
      prevProps.route.visible === false && this.props.route.visible === true;
    const engageDidEnter =
      prevProps.app.isVisible === false && this.props.app.isVisible === true;
    const engageWillLeave =
      prevProps.app.isVisible === true && this.props.app.isVisible === false;

    if (routeDidEnter || engageDidEnter) {
      // Sync the colors of the app bar when the route with the bar came visible.
      this.props.updateStatusBar(this.props.widgetSettings);
    }

    if (engageWillLeave) {
      // Reset the status bar when Engage goes into the background.
      this.props.resetStatusBar();
    }
  }

  /**
   * @returns {JSX}
   */
  render() {
    if (!this.props.route.visible || !this.state.target) {
      return null;
    }

    const { background, color } = this.props.widgetSettings;
    const { __ } = this.context.i18n();
    const center = <AppBar.Title title={__(this.props.title || '')} />;
    const below = (
      <Fragment key="below">
        {this.props.below}
        <ProgressBar />
      </Fragment>
    );

    return ReactDOM.createPortal(
      <Fragment>
        <Portal name={APP_BAR_DEFAULT_BEFORE} />
        <Portal name={APP_BAR_DEFAULT}>
          <AppBar
            backgroundColor={background}
            textColor={color}
            center={center}
            {...this.props}
            below={below}
          />
        </Portal>
        <Portal name={APP_BAR_DEFAULT_AFTER} />
      </Fragment>,
      this.state.target
    );
  }
}

const WrappedComponent = withApp(withWidgetSettings(
  withRoute(connect(AppBarDefault), { prop: 'route' }),
  '@shopgate/engage/components/AppBar'
));

WrappedComponent.Icon = AppBarIcon;

export default WrappedComponent;
