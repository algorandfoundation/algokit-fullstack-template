import { Contract } from '@algorandfoundation/tealscript';

export class Calculator extends Contract {
  /**
   * Calculates the sum of two numbers
   *
   * @param a
   * @param b
   * @returns The sum of a and b
   */
  private getSum(a: uint64, b: uint64): uint64 {
    return a + b;
  }

  /**
   * Calculates the difference between two numbers
   *
   * @param a
   * @param b
   * @returns The difference between a and b.
   */
  private getDifference(a: uint64, b: uint64): uint64 {
    return a >= b ? a - b : b - a;
  }

  /**
   * A method that takes two numbers and does either addition or subtraction
   *
   * @param a The first uint64
   * @param b The second uint64
   * @param operation The operation to perform. Can be either 'sum' or 'difference'
   *
   * @returns The result of the operation
   */
  doMath(a: uint64, b: uint64, operation: string): uint64 {
    let result: uint64;

    if (operation === 'sum') {
      result = this.getSum(a, b);
    } else if (operation === 'difference') {
      result = this.getDifference(a, b);
    } else throw Error('Invalid operation');

    return result;
  }

  /**
   * A demonstration method used in the AlgoKit fullstack template.
   * Greets the user by name.
   *
   * @param name The name of the user to greet.
   * @returns A greeting message to the user.
   */
  hello(name: string): string {
    return 'Hello, ' + name;
  }
}
