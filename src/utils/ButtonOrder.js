export class ButtonOrder {

  static NUMERICAL_ORDER = new ButtonOrder("Numerical Order")
  static LOWEST_SCORE = new ButtonOrder("Lowest Score")
  static OLDEST_REVIEW = new ButtonOrder("Oldest Review")

  constructor(name) {
    this.name = name
  }

  toString() {
    return this.name;
  }
}