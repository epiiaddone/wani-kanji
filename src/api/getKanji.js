import { useDispatch, useSelector } from "react-redux";
import { kanji_level_1 } from "../data/kanji_level_1_data";
import { kanji_level_2 } from "../data/kanji_level_2_data";
import { kanji_level_3 } from "../data/kanji_level_3_data";
import { shuffleArray } from "../utils/shuffleArray";
import { fetchKanji } from "./fetchKanji";
import { getKanjiBegin, getKanjiError, getKanjiSuccess } from "../features/identifyRadicals/identifyRadicalsSlice";

//async functions always return a promise
//so function does not return, instead dispatches
export const getKanji = async () => {
    const { kanjiLevel } = useSelector(store => store.idenfifyRadicals);
    const dispatch = useDispatch();
    dispatch(getKanjiBegin());

    const { error, kanjiData } = await fetchKanji(kanjiLevel);

    if (error) {
        dispatch(getKanjiError());
    } else {
        dispatch(getKanjiSuccess(shuffleArray(kanjiData)))
    }

}

const getKanjiLocal = (level) => {

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
    return lessonKanji;
}