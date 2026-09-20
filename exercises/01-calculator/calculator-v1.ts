/**
 * Calculator v1
 *
 * Requirements:
 * - Read two numbers and one operator from the user.
 * - Support addition, subtraction, multiplication, and division.
 * - Print the calculation result.
 */

export type Operator = "+" | "-" | "*" | "/";

export function calculate(
  numberA: number,
  numberB: number,
  operator: Operator,
): number {
  switch (operator) {
    case "+":
      return numberA + numberB;
    case "-":
      return numberA - numberB;
    case "*":
      return numberA * numberB;
    case "/":
      return numberA / numberB;
  }
}
