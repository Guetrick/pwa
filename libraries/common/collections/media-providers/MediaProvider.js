import { logger } from '@shopgate/pwa-core/helpers';
import styles from './style';

/**
 * The MediaProvider base class.
 */
class MediaProvider {
  /**
   * Constructor.
   */
  constructor() {
    this.containers = new Map();
  }

  /**
   * Optimizes video container to make it responsive.
   * @param {NodeList} container A DOM container.
   * @private
   * @returns {MediaProvider}
   */
  responsify(container) {
    // Remove fixed dimensions from the container.
    container.removeAttribute('height');
    container.removeAttribute('width');

    // Create the wrapper and apply styling.
    const wrapper = document.createElement('div');

    wrapper.className = styles;

    // Add the wrapper right before the container into the DOM.
    container.parentNode.insertBefore(wrapper, container);
    // Move the container into the wrapper.
    wrapper.appendChild(container);

    return this;
  }

  /**
   * Add a DOM container with embedded videos.
   * @param {NodeList} container A DOM container.
   * @returns {MediaProvider}
   */
  add() {
    logger.error('MediaProvider.add() needs to be implemented within an inheriting class');
    return this;
  }

  /**
   * Remove a DOM container.
   * @param {NodeList} container A DOM container.
   * @returns {MediaProvider}
   */
  remove(container) {
    this.containers.delete(container);
    return this;
  }

  /**
   * Stops all playing videos within the DOM containers.
   * @returns {MediaProvider}
   */
  stop() {
    logger.error('MediaProvider.stop() needs to be implemented within an inheriting class');
    return this;
  }
}

export default MediaProvider;
