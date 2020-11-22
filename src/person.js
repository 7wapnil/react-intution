export const isAdult = (age) => age >= 18;
export const canDrink = (age) => isAdult(age);

export default (age) => age >= 65;