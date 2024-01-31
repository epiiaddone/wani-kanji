import { radicalData } from "../data/radical-data";
import { shuffleArray } from "../utils/shuffleArray";

export const getRadicals = (beginningLevel, lastLevel) => {

    const lessonRadicals = [];
    for (const [id, radical] of Object.entries(radicalData)) {
        if (radical.level >= beginningLevel && radical.level <= lastLevel) lessonRadicals.push(radical);
    }

    return shuffleArray(lessonRadicals);

}