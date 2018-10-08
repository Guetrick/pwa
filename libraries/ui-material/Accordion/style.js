import { css } from 'glamor';

export const toggle = css({
  padding: '12px 56px 12px 16px',
  position: 'relative',
});

export const chevronContainer = css({
  position: 'absolute',
  fontSize: '1.5rem',
  top: '.6875rem',
  right: '1rem',
});

export const chevron = css({
  transformOrigin: 'center center',
  transition: 'transform 250ms cubic-bezier(0.25, 0.1, 0.25, 1)',
  willChange: 'transform',
});

export const chevronClosed = css(chevron, {
  transform: 'rotateZ(-90deg)',
}).toString();

export const chevronOpen = css(chevron, {
  transform: 'rotateZ(90deg)',
}).toString();