import { describe, test, expect, beforeAll, beforeEach } from '@jest/globals';
import { algorandFixture } from '@algorandfoundation/algokit-utils/testing';
import { Config } from '@algorandfoundation/algokit-utils';
import { CalculatorClient, CalculatorFactory } from '../contracts/clients/CalculatorClient';

const fixture = algorandFixture();
Config.configure({ populateAppCallResources: true });

let appClient: CalculatorClient;

describe('Calculator', () => {
  beforeEach(fixture.beforeEach);

  beforeAll(async () => {
    await fixture.beforeEach();
    const { testAccount } = fixture.context;
    const { algorand } = fixture;

    const factory = new CalculatorFactory({
      algorand,
      defaultSender: testAccount.addr,
    });

    const createResult = await factory.send.create.createApplication();
    appClient = createResult.appClient;
  });

  test('sum', async () => {
    const a = 13;
    const b = 37;
    const sum = await appClient.send.doMath({ args: { a, b, operation: 'sum' } });
    expect(sum.return).toBe(BigInt(a + b));
  });

  test('difference', async () => {
    const a = 13;
    const b = 37;
    const diff = await appClient.send.doMath({ args: { a, b, operation: 'difference' } });
    expect(diff.return).toBe(BigInt(a >= b ? a - b : b - a));
  });

  test('hello', async () => {
    const hello = await appClient.send.hello({ args: { name: 'world!' } });
    expect(hello.return).toBe('Hello, world!');
  });
});
