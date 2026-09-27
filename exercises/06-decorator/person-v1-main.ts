import { Person } from "./person-v1.js";

const person = new Person("小菜");

console.log("第一種裝扮：");
person.wearTShirt();
person.wearBaggyPants();
person.wearSneakers();
person.show();

console.log("第二種裝扮：");
person.wearSuit();
person.wearTie();
person.wearLeatherShoes();
person.show();

console.log("第三種裝扮：");
person.wearTShirt();
person.wearLeatherShoes();
person.wearTie();
person.show();
