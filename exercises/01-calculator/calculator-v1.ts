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
  if (operator === "+") {
    return numberA + numberB;
  } else if (operator === "-") {
    return numberA - numberB;
  } else if (operator === "*") {
    return numberA * numberB;
  } else {
    return numberA / numberB;
  }
}
