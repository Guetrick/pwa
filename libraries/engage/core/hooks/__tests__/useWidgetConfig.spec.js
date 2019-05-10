import { useWidgetConfig } from '../useWidgetConfig';
import { usePageSettings } from '../usePageSettings';
import { useSettings } from '../useSettings';
import { useRoute } from '../useRoute';

const WIDGET_ID = '@shopgate/test/TestWidget';

jest.mock('react', () => ({
  createContext: jest.fn(),
}));

jest.mock('@shopgate/pwa-common/helpers/config', () => ({
  themeConfig: {
    pages: [
      {
        pattern: '/test1',
        widgets: [{ id: '@shopgate/test/TestWidget' }],
      },
      {
        pattern: '/test2',
        widgets: [{ id: '@shopgate/test/TestWidget' }],
      },
      {
        pattern: '/test3',
        widgets: [{ id: '@shopgate/test/TestWidget' }],
      },
      {
        pattern: '/test4',
        widgets: [{
          id: '@shopgate/test/TestWidget',
          settings: {
            test: 'fuzz',
          },
        }],
      },
    ],
  },
}));

jest.mock('../useRoute', () => ({
  useRoute: jest.fn(() => ({ pattern: '/test' })),
}));

jest.mock('../usePageSettings', () => ({
  usePageSettings: jest.fn(),
}));

jest.mock('../useSettings', () => ({
  useSettings: jest.fn(),
}));

describe('engage > core > hooks', () => {
  describe('useWidgetConfig()', () => {
    it('should return an empty object if no settings', () => {
      useRoute.mockReturnValueOnce({ pattern: '/test1' });
      usePageSettings.mockReturnValueOnce({});
      useSettings.mockReturnValueOnce({});
      const config = useWidgetConfig('@shopgate/test/TestWidget');
      expect(config).toEqual({ settings: {} });
    });

    it('should return an object having global settings only', () => {
      useRoute.mockReturnValueOnce({ pattern: '/test2' });
      usePageSettings.mockReturnValueOnce({});
      useSettings.mockReturnValueOnce({
        [WIDGET_ID]: {
          test: 'foo',
        },
      });
      const config = useWidgetConfig('@shopgate/test/TestWidget');
      expect(config).toEqual({ settings: { test: 'foo' } });
    });

    it('should override global settings by page settings', () => {
      useRoute.mockReturnValueOnce({ pattern: '/test3' });
      usePageSettings.mockReturnValueOnce({
        '@shopgate/test/TestWidget': {
          test: 'bar',
        },
      });
      useSettings.mockReturnValueOnce({
        '@shopgate/test/TestWidget': {
          test: 'foo',
        },
      });
      const config = useWidgetConfig('@shopgate/test/TestWidget');
      expect(config).toEqual({ settings: { test: 'bar' } });
    });

    it('should override page and global by widget settings', () => {
      useRoute.mockReturnValueOnce({ pattern: '/test4' });
      usePageSettings.mockReturnValueOnce({
        [WIDGET_ID]: {
          test: 'bar',
        },
      });
      useSettings.mockReturnValueOnce({
        [WIDGET_ID]: {
          test: 'foo',
        },
      });
      const config = useWidgetConfig(WIDGET_ID);
      expect(config).toEqual({ settings: { test: 'fuzz' } });
    });
  });
});
