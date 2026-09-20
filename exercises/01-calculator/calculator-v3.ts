export abstract class Operation {
  private numberAValue = 0;
  private numberBValue = 0;

  get numberA(): number {
    return this.numberAValue;
  }

  set numberA(value: number) {
    this.numberAValue = value;
  }

  get numberB(): number {
    return this.numberBValue;
  }

  set numberB(value: number) {
    this.numberBValue = value;
  }

  abstract getResult(): number;
}

export class OperationAdd extends Operation {
  override getResult(): number {
    return this.numberA + this.numberB;
  }
}

export class OperationSubtract extends Operation {
  override getResult(): number {
    return this.numberA - this.numberB;
  }
}

export class OperationMultiply extends Operation {
  override getResult(): number {
    return this.numberA * this.numberB;
  }
}

export class OperationDivide extends Operation {
  override getResult(): number {
    return this.numberA / this.numberB;
  }
}
