class Person {
  constructor(name = 'Anonymous', age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    return `Hi. I am ${this.name}.`;
  }

  getDescription() {
    return `${this.name} is ${this.age} year(s) old.`;
  }
}

class Student extends Person {
  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }

  hasMajor() {
    return !!this.major;
  }

  getDescription() {
    let description = super.getDescription();

    if(this.hasMajor()) {
      description += ` Their major is ${this.major}`;
    }

    return description;
  }
}

class Traveller extends Person {
  constructor(name, hometown = 'Nowhere') {
    super(name);
    this.hometown = hometown;
  }

  hasHometown() {
    return !!this.hometown;
  }

  getGreeting() {
    let greeting = super.getGreeting();

    if(this.hasHometown()) {
      greeting += ` I am visiting from ${this.hometown}.`;
    }

    return greeting;
  }
}

const me = new Traveller('Swapnil Sable', 'Pithampur');
console.log(me.getGreeting());

const other = new Traveller();
console.log(other.getGreeting());