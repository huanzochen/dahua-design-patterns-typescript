export type Write = (text: string) => void;

export class Person {
  constructor(
    private readonly name: string,
    private readonly write: Write = (text) => process.stdout.write(text),
  ) {}

  wearTShirt(): void {
    this.write("大T恤 ");
  }

  wearBaggyPants(): void {
    this.write("垮褲 ");
  }

  wearSneakers(): void {
    this.write("破球鞋 ");
  }

  wearSuit(): void {
    this.write("西裝 ");
  }

  wearTie(): void {
    this.write("領帶 ");
  }

  wearLeatherShoes(): void {
    this.write("皮鞋 ");
  }

  show(): void {
    this.write(`裝扮的${this.name}\n`);
  }
}
