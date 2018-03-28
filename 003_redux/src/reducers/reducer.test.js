import reducer from './reducer';
import { INCREMENT, DECREMENT } from '../store/actions/actionTypes';

describe('reducer', () => {
  it('increments the counter by 1', () => {
    const expected = 1;
    const actual = reducer(undefined, { type: INCREMENT }).counter;
    expect(actual).toEqual(expected);
  });

  it('decrements the counter by 1', () => {
    const expected = -1;
    const actual = reducer(undefined, { type: DECREMENT }).counter;
    expect(actual).toEqual(expected);
  });

  it('returns the default counter value if no action is specified', () => {
    const expected = 0;
    const actual = reducer(undefined, {}).counter;
    expect(actual).toEqual(expected);
  });
});
