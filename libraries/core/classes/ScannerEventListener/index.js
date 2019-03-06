import { logger } from '../../helpers';
import AppScanner from '../Scanner';

/**
 * Allows anyone to listen for scan results based on scope, type or both.
 */
class ScannerEventListener {
  /**
   * @param {string|null} name A name for the listener object to refer to.
   * @param {string|null} scope The scanner scope to listen for.
   * @param {string|null} type THe type of scanner events to listen for.
   */
  constructor(name = null, scope = null, type = null) {
    this.name = name || 'unnamed';
    this.scope = scope || null;
    this.type = type || null;
    this.resetOnError = false;
    this.handler = null;
  }

  /**
   * @param {Function} handler An asynchronous function which is called when a scan is done.
   * @returns {ScannerEventListener}
   */
  setHandler = (handler) => {
    if (typeof handler !== 'function') {
      logger.error(new Error('The ScannerEventListener handler must be a function!'));
    }

    this.handler = handler;
    return this;
  }

  /**
   * @param {boolean} resetOnError Set to true to reset the scanner, when the handler fails.
   * @returns {ScannerEventListener}
   */
  setResetOnError = (resetOnError) => {
    this.resetOnError = !!resetOnError;
    return this;
  }

  /**
   * @returns {boolean} Returns true to if the scanner should be reset, when the handler fails.
   */
  getResetOnError = () => this.resetOnError;

  /**
   * Attach the current event listener to the app scanner.
   */
  attach = () => {
    AppScanner.addListener(this);
  }

  /**
   * Checks the event to see, if the listener is interested in it and call it's handler.
   * @param {ScannerEvent} event The scanner event which was emitted.
   */
  notify = async (event) => {
    if (!this.handler) {
      logger.warn(`No event handler defined for eventListener "${this.name}"`);
      return;
    }

    // Skip handling if the events scope or type don't fit to the handler
    if (this.type && this.type !== event.type) {
      return;
    }
    if (this.scope && this.scope !== event.scope) {
      return;
    }

    // Call the listener which was previously registered
    await this.handler(event);
  }
}

export default ScannerEventListener;
