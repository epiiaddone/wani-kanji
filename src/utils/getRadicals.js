import { radicalData } from "../data/radical-data";

export const getRadicals = (beginningLevel, lastLevel) => {

    const lessonRadicals = [];
    for (const [id, radical] of Object.entries(radicalData)) {
        if (radical.level >= beginningLevel && radical.level <= lastLevel) lessonRadicals.push(radical);
    }

    for (let i = lessonRadicals.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = lessonRadicals[i];
        lessonRadicals[i] = lessonRadicals[j];
        lessonRadicals[j] = temp;
    }

    return lessonRadicals;

}