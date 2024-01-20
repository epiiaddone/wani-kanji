import { useState } from "react";
import { kanji_level_1 } from "../data/kanji_level_1_data";
import { kanji_level_2 } from "../data/kanji_level_2_data";
import { kanji_level_3 } from "../data/kanji_level_3_data";


export const IdentifyRadicalsSelection = () => {
    const [selectedLevel, setSelectedLevel] = useState("1");

    let kanjiData = {};
    switch (selectedLevel) {
        case "1": kanjiData = kanji_level_1; break;
        case "2": kanjiData = kanji_level_2; break;
        case "3": kanjiData = kanji_level_3; break;
    }

    return (
        <section>
            <div>
                <div>Identify Radicals</div>
                <span>Practise level</span>
                <select
                    value={selectedLevel}
                    onChange={e => setSelectedLevel(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            <div>
                {Object.keys(kanjiData).length} kanji to practise
            </div>

            <button>Start</button>
        </section>
    )
}