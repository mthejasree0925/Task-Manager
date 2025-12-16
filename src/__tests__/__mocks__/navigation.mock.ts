export const mockNavigation = {
  navigate: (jest.fn() as any) as (name: string, params?: any) => void,
  goBack: (jest.fn() as any) as () => void,
  push: (jest.fn() as any) as (name: string, params?: any) => void,
  replace: (jest.fn() as any) as (name: string, params?: any) => void,
  canGoBack: (jest.fn(() => true) as any) as () => boolean,
  setOptions: (jest.fn() as any) as (options: any) => void,
  addListener: (jest.fn() as any) as () => void,
  removeListener: (jest.fn() as any) as () => void,
  reset: (jest.fn() as any) as () => void,
  dispatch: (jest.fn() as any) as () => void,
  isFocused: (jest.fn(() => true) as any) as () => boolean,
};

export const mockRoute = {
  params: {},
  key: 'test-route-key',
  name: 'TestRoute',
};

