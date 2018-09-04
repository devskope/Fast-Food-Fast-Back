import dotenv from 'dotenv';
import { expect } from 'chai';
import ok from '../src/server';

dotenv.config();
const { env } = process;

if (env.NODE_ENV !== 'test') env.NODE_ENV = 'test';

describe('I test okay', () => {
  const name = 'fast-food-fast-back';
  it('should test okay', () => {
    expect(ok(name)).to.equal(`${name}'s Okayy!`);
  });
});
