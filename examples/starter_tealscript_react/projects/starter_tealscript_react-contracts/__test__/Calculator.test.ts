import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { CalculatorClient } from '../contracts/clients/CalculatorClient';
import * as algokit from '@algorandfoundation/algokit-utils';

const fixture = algorandFixture();
algokit.Config.configure({ populateAppCallResources: true });

let appClient: CalculatorClient;

describe('Calculator', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { algod, testAccount } = fixture.context;

    appClient = new CalculatorClient(
      {
        sender: testAccount,
        resolveBy: 'id',
        id: 0,
      },
      algod
    );

    await appClient.create.createApplication({});
  });

  test('sum', async () => {
    const a = 13;
    const b = 37;
    const sum = await appClient.doMath({ a, b, operation: 'sum' });
    expect(sum.return?.valueOf()).toBe(BigInt(a + b));
  });

  test('difference', async () => {
    const a = 13;
    const b = 37;
    const diff = await appClient.doMath({ a, b, operation: 'difference' });
    expect(diff.return?.valueOf()).toBe(BigInt(a >= b ? a - b : b - a));
  });

  test('hello', async () => {
    const diff = await appClient.hello({ name: 'world!' });
    expect(diff.return?.valueOf()).toBe('Hello, world!');
  });
});
