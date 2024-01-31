import { kanji_level_1 } from "../data/kanji_level_1_data";
import { kanji_level_2 } from "../data/kanji_level_2_data";
import { kanji_level_3 } from "../data/kanji_level_3_data";
import { shuffleArray } from "../utils/shuffleArray";

export const getKanji = (level) => {


    let kanji_data;
    switch (level) {
        case "1": kanji_data = kanji_level_1; break;
        case "2": kanji_data = kanji_level_2; break;
        case "3": kanji_data = kanji_level_3; break;
        default: kanji_data = kanji_level_1;
    }

    const lessonKanji = [];
    for (const [id, kanji] of Object.entries(kanji_data)) {
        lessonKanji.push(kanji);
    }

    return shuffleArray(lessonKanji);

}