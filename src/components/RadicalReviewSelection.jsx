import { useState } from "react";
import { radicalData } from "../data/radical-data";


export const RadicalReviewSelection = () => {
    const [beginningLevel, setBeginningLevel] = useState(1);
    const [lastLevel, setLastLevel] = useState(1);

    if (lastLevel < beginningLevel) setLastLevel(beginningLevel);

    let radicalAmount = 0;
    for (const [id, radical] of Object.entries(radicalData)) {
        if (radical.level >= beginningLevel && radical.level <= lastLevel) radicalAmount++;
    }

    return (
        <section>
            <div>
                <div>Radical Review</div>
                <span>Practise between levels</span>
                <select
                    value={beginningLevel}
                    onChange={e => setBeginningLevel(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <span>and</span>
                <select
                    value={lastLevel}
                    onChange={e => setLastLevel(e.target.value)}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
            </div>

            <div>
                {radicalAmount} radicals to practise
            </div>

            <button>Start</button>
        </section>
    )
}