/**
 * Defines the right word form suitable for number provided
 * @param {Number} number
 * @param {[String]} declensions
 * @param {[Number]} cases
 * @returns {String}
 * @example
 * const result = declension(10, ['монета', 'монеты', 'монет'])
 * console.log(result) // 'монет'
 */
export function declension(number: number, declensions: string[], cases = [2, 0, 1, 1, 1, 2]) {
  return declensions[
    number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]
  ];
}
