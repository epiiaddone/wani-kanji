import { distance } from 'fastest-levenshtein'


export const isAnswerCorrect = (string1, string2) => {
    // console.log("isAnswerCorrect", string1, string2);
    return distance(string1.toLowerCase().trim(), string2.toLowerCase().trim()) <= 2;
}