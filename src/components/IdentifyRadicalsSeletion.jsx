import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleKanjiLevelChange, resetIdentifyRadicalsGame } from "../features/identifyRadicals/identifyRadicalsSlice";
import { getKanjiStage } from '../utils/getKanjiState';
import { useState } from 'react';
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { ButtonOrder } from '../utils/ButtonOrder';
import { getScoreColorClassName } from '../utils/getScoreColors';


export const IdentifyRadicalsSelection = () => {
    const { kanjiLevel } = useSelector(store => store.identifyRadicals)
    const dispatch = useDispatch();

    const [expanded, setExpanded] = useState(false);
    const [buttonOrder, setButtonOrder] = useState(ButtonOrder.NUMERICAL_ORDER);

    const buttonOrderOptions = [
        ButtonOrder.NUMERICAL_ORDER,
        ButtonOrder.LOWEST_SCORE,
        ButtonOrder.OLDEST_REVIEW
    ];

    const optionsArray = [];
    for (let i = 1; i <= 60; i++) optionsArray.push(i);

    const localScores = JSON.parse(localStorage.getItem('scores'));
    if (buttonOrder === ButtonOrder.NUMERICAL_ORDER) {
        localScores?.sort((a, b) => { return parseInt(a["level"]) - parseInt(b["level"]) });
    } else if (buttonOrder === ButtonOrder.LOWEST_SCORE) {
        localScores?.sort((a, b) => {
            return parseInt(a["percent"]) - parseInt(b["percent"])
        });
    } else {
        localScores?.sort((a, b) => {
            let dateA = new Date(a["date"]);
            let dateB = new Date(b["date"]);
            return dateA.getTime() - dateB.getTime();
        })
    }

    return (
        <Wrapper>
            <div className="section-title">Identify Radicals</div>
            <div className="content">
                <div className="section-select">
                    <span>Practise level </span>
                    <select
                        value={kanjiLevel}
                        onChange={e => dispatch(handleKanjiLevelChange(e.target.value))}
                    >
                        {optionsArray.map((level) => <option value={level} key={level}> {level} </option>)}
                    </select>
                </div>

                <div className="footer">
                    <div >
                        <span className="radical-stage">{getKanjiStage(kanjiLevel)}</span> level selected
                    </div>
                    <Link
                        onClick={() => dispatch(resetIdentifyRadicalsGame())}
                        to="/identifyradicals"
                        className="btn kanji-btn"
                    >Start</Link>
                </div>
            </div>
            <div className="scores">
                <div className="scores--header">
                    <div className="scores--title">Scores</div>
                    {!expanded && <div className="scores--icon" onClick={() => setExpanded(true)}><MdOutlineKeyboardArrowDown /></div>}
                    {expanded && <div className="scores--icon" onClick={() => setExpanded(false)}><MdOutlineKeyboardArrowUp /></div>}
                </div>
                <div className={expanded ? "scores--container scores--container__open" : "scores--container"}>
                    <div className="scores--buttons">{
                        buttonOrderOptions.map(option => {
                            return (
                                <button
                                    onClick={() => setButtonOrder(option)}
                                    key={option.toString()}
                                    className={option === buttonOrder ? "button--selcted" : ""}
                                >
                                    {option.toString()}
                                </button>
                            )
                        })
                    }
                    </div>
                    <div className="scores--list">
                        {localScores?.map(score => {
                            return (
                                <div
                                    key={score["level"]}
                                    className={getScoreColorClassName(score["percent"], "bg")}
                                >
                                    {score["level"] + ": " + score["percent"] + "%"}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
background-color: var(--kanji);
color: white;
font-size: 1.2rem;
width: 80%;
margin-left: auto;
margin-right: auto;
margin-bottom:3rem;

@media only screen and (min-width: 1000px) {
    font-size:1.5rem;
}


select{
    font-size:1.2rem;
}

@media only screen and (min-width: 1000px) {
    select{
        font-size:1.5rem;
    }
}

.content{
    position:relative;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
    align-items: center;
    margin: 2rem
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

.section-select{

}


.footer{
    display: flex;
    gap:1rem;
    font-size:1.1rem;
    align-items:center;
}

@media only screen and (min-width: 1000px) {
    .footer{
    font-size:1.5rem;
    }
}

.radical-stage{
    font-weight:bold;
}

.kanji-btn{
    background-color: var(--kanji-dark);
}

.scores--header{
    position:relative;
    display:flex;
    justify-content:center;
    gap:1rem;
}

.scores--icon{
    font-size:2rem;
    cursor:pointer;
}

.scores--container{
    height:0;
    transition: height 1s ease;
    overflow:hidden;
}

.scores--container__open{
    height:auto;
}

.scores--buttons{
display:flex;
gap:2rem;
justify-content: center;
}

.scores--buttons button{
border-radius:1rem;
cursor:pointer;
font-size:1.2rem;
padding:0.5rem;
border-color:transparent;
}

.button--selcted{
color:white;
background-color: var(--kanji-dark);
box-shadow: var(--shadow-2);
}

.scores--list{
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    margin-bottom:2rem;
}

.scores--list div{
    padding:0.5px;
    border-radius:0.5rem;
    width:7rem;
    text-align:center;
}
`;