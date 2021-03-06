import { css } from 'glamor';
import { themeConfig } from '@shopgate/pwa-common/helpers/config';

const input = css({
  display: 'none',
}).toString();

const container = css({
  display: 'flex',
  marginLeft: -1, // Removes margin of svg.
}).toString();

const icon = css({
  width: 24,
  height: 24,
}).toString();

const label = css({
  flex: 1,
  fontSize: '1rem',
  lineHeight: 1.5,
  marginLeft: themeConfig.variables.gap.small,
  marginBottom: themeConfig.variables.gap.small,
}).toString();

const active = css({
  color: themeConfig.colors.primary,
}).toString();

export default {
  input,
  icon,
  container,
  label,
  active,
};
