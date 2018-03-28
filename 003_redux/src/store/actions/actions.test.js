import { INCREMENT, DECREMENT } from './actionTypes';
import { increment, decrement } from './actions';

it('creates an action to increment the counter', () => {
  const expected = { type: INCREMENT };
  expect(increment()).toEqual(expected);
});
it('creates an action to decrement the counter', () => {
  const expected = { type: DECREMENT };
  expect(decrement()).toEqual(expected);
});
