import styled from 'styled-components';
import { radicalData } from "../data/radical-data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleBeginningLevelChange, handleLastLevelChange, resetRadicalReviewGame } from "../features/radicalReview/radicalReviewSlice";
import { useState } from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


export const RadicalReviewSelection = () => {
    const { beginningLevel, lastLevel } = useSelector((store) => store.radicalReview)
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(false);

    const optionsArray = [];
    for (let i = 1; i <= 60; i++) optionsArray.push(i);

    let radicalAmount = 0;
    for (const [id, radical] of Object.entries(radicalData)) {
        if (radical.level >= beginningLevel && radical.level <= lastLevel) radicalAmount++;
    }

    return (
        <Wrapper>
            <div className="section-title">Radical Review</div>
            <div className="radical-content">
                <div className="section-select">
                    <span>Practise between levels </span>
                    <select
                        value={beginningLevel}
                        onChange={(e) => dispatch(handleBeginningLevelChange(e.target.value))}
                    >
                        {optionsArray.map((level) => <option value={level} key={level}> {level} </option>)}
                    </select>
                    <span> and </span>
                    <select
                        value={lastLevel}
                        onChange={(e) => dispatch(handleLastLevelChange(e.target.value))}
                    >
                        {optionsArray.map((level) => <option value={level} key={level}> {level} </option>)}
                    </select>
                </div>

                <div className="radical-info">
                    <div>
                        <span className="radical-amount">{radicalAmount}</span> radicals to practise
                    </div>
                    <Link
                        onClick={() => dispatch(resetRadicalReviewGame())}
                        to="/radicalreview"
                        className="btn"
                    >Start</Link>
                </div>
            </div>
            <div className="mistakes">
                <div className="mistakes--header">
                    <div className="mistakes--title">Outstanding Mistakes</div>
                    {!expanded && <div className="mistakes--icon" onClick={() => setExpanded(true)}><MdOutlineKeyboardArrowDown /></div>}
                    {expanded && <div className="mistakes--icon" onClick={() => setExpanded(false)}><MdOutlineKeyboardArrowUp /></div>}
                </div>
                <div className={expanded ? "mistakes--container mistakes--container__open" : "mistakes--container"}>{
                    JSON.parse(localStorage.getItem('radical-mistakes')).map((radicalID) => {
                        return (
                            <div className="mistakes--radical" key={radicalID}>
                                <div className="mistakes--radical__character">
                                    {radicalData[radicalID].characters === 'null' ?
                                        <img className="mistakes--image" src={radicalData[radicalID].image} />
                                        : radicalData[radicalID].characters}
                                </div>
                                <div>{radicalData[radicalID].slug}</div>
                                <div>Level:{radicalData[radicalID].level}</div>
                            </div>
                        )
                    })
                }</div>
            </div>
        </Wrapper >
    )
}

const Wrapper = styled.main`
background-color: var(--radical);
color:white;
font-size:1.2rem;
width: 80%;
margin-left: auto;
margin-right: auto;
margin-bottom:3rem;

@media only screen and (min-width: 1000px) {
    font-size:1.5rem;
}


.section-title{
    text-align: center;
    font-weight:bold;
    font-size:1.5rem;
}

@media only screen and (min-width: 1000px) {
    .section-title{
    font-size:2rem;
    }
}

select{
    font-size:1.2rem;
}

@media only screen and (min-width: 1000px) {
    select{
    font-size:1.5rem;
    }
}


.radical-content{
    display:flex;
    flex-wrap:wrap;
    gap:2rem;
    justify-content: center;
    align-items:center;
    margin: 2rem 0rem;
}

.radical-info{
    display: flex;
    gap:1rem;
    align-items: baseline;
    justify-content: center;
}

.radical-amount{
    font-weight:bold;
}

.mistakes--header{
    position:relative;
    display:flex;
    justify-content:center;
    gap:1rem;
}

.mistakes--icon{
    font-size:2rem;
    cursor:pointer;
}

.mistakes--container{
    display:flex;
    flex-wrap:wrap;
    justify-content: center;
    gap:1.5rem;
    height:0;
    transition: height 1s ease;
    overflow:hidden;
}

.mistakes--container__open{
    height:auto;
}

.mistakes--radical{
    display:flex;
    gap:0.5rem;
    align-items: center;
    font-size:1rem;
}

.mistakes--radical__character{
    font-size:1.5rem;
}


.mistakes--image{
    height: 1.5rem;
}

`;