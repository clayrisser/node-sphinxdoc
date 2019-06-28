import { createConfig } from '../../src/config';

describe('createConfig(action, options)', () => {
  const config = createConfig('hello', {});
  it('should create config with action', async () => {
    expect(config).toEqual(expect.objectContaining({ action: 'hello' }));
  });
});
