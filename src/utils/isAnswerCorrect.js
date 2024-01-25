import { distance } from 'fastest-levenshtein'


export const isAnswerCorrect = (string1, string2) => {
    return distance(string1, string2) <= 2;
}