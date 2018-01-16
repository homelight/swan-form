import hasErrors from './hasErrors';
import runValidations from './runValidations';

describe('Shared helper functions tests', () => {
  it('hasErrors should filter all `[false, false, false]` to be false', () => {
    expect(hasErrors([false, false, false])).toBe(false);
  });

  it("hasErrors should filter all `['test', false, false]` to be true", () => {
    expect(hasErrors(['test', false, false])).toBe(true);
  });

  it('hasErrors should have an empty array be false', () => {
    expect(hasErrors([])).toBe(false);
  });

  it('runValidations should pass', () => {
    const validate = value => (value === true ? false : 'should be true');
    expect(runValidations(validate, true)).toEqual(expect.arrayContaining([false]));
  });

  it('runValidations should fail', () => {
    const validate = value => (value === true ? false : 'should be true');
    expect(runValidations(validate, false)).toEqual(expect.arrayContaining(['should be true']));
  });
});
