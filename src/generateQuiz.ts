/**
 * @param  {string} input
 * @return {number} length of string
 */
export function* generateQuiz(input: string) {
  for (let index = 1; index <= input.length; index++) {
    yield input.substring(0, index);
  }

  return input.length;
}
