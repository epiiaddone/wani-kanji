import { useState } from "react";
import { radicalData } from "../data/radical-data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleBeginningLevelChange, handleLastLevelChange } from "../features/radicalReview/radicalReviewSlice";


export const RadicalReviewSelection = () => {
    const { beginningLevel, lastLevel } = useSelector((store) => store.radicalReview)
    const dispatch = useDispatch();

    const optionsArray = [];
    for (let i = 1; i <= 60; i++) optionsArray.push(i);

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
                    onChange={(e) => dispatch(handleBeginningLevelChange(e.target.value))}
                >
                    {optionsArray.map((level) => <option value={level} key={level}> {level} </option>)}
                </select>
                <span>and</span>
                <select
                    value={lastLevel}
                    onChange={(e) => dispatch(handleLastLevelChange(e.target.value))}
                >
                    {optionsArray.map((level) => <option value={level} key={level}> {level} </option>)}
                </select>
            </div>

            <div>
                {radicalAmount} radicals to practise
            </div>

            <Link
                to="/radicalreview"
                className="btn"
            >Start</Link>
        </section>
    )
}