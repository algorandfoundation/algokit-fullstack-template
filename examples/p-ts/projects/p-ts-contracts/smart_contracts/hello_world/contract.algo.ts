import { Contract } from '@algorandfoundation/algorand-typescript'

export class HelloWorld extends Contract {
  public hello(name: string): string {
    return `Hello, ${name}`
  }
}
