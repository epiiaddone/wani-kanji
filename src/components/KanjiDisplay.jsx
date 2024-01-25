import { FaCheck, FaHome } from 'react-icons/fa';
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { kanji_level_2 } from '../data/kanji_level_2_data';
import { GrLinkNext } from 'react-icons/gr';
import { useState } from 'react';
import { isAnswerCorrect } from '../utils/isAnswerCorrect';
import { radicalData } from '../data/radical-data';

export const KanjiDisplay = () => {
    const [meaningInput, setMeaningInput] = useState("");
    const [questionActive, setQuestionActive] = useState(true);
    const [correctCount, setCorrectCount] = useState(0);
    const [meaningCorrect, setMeaningCorrect] = useState(false);

    let checkClasses = "";
    if (questionActive) checkClasses = "check";
    else if (meaningCorrect) checkClasses = "check check--correct";
    else checkClasses = "check check--false";

    const questionNumber = 1;
    const correctPercent = 30;
    const progressPercent = 40;

    const currentQuestion = kanji_level_2[468];

    const checkRadicals = (e) => {
        let radicalNames = [];
        currentQuestion.component_subject_ids.forEach(
            id => radicalNames.push(radicalData[id].slug));
        console.log(radicalNames);

        for (let i = 0; i < currentQuestion.component_subject_ids.length; i++) {
            radicalNames.forEach(name => {
                if (isAnswerCorrect(e.target[i].value, name)) {
                    radicalNames.splice(radicalNames.indexOf(name), 1);
                }
            })
        }
        console.log(radicalNames);
    }

    const checkMeaning = () => {
        if (isAnswerCorrect(meaningInput, currentQuestion.meaning)) {
            setCorrectCount(() => correctCount + 1);
            setMeaningCorrect(true);
        }
    }

    const setNextQuestion = () => {
        setQuestionActive(true);
    }


    return (
        <Wrapper>
            <div className="header">
                <Link to="/" className="home"><FaHome /></Link>
                <div className="stats">
                    <div className="progress">
                        <div className="progress--bar">
                            <div className="progress--bar__inner" style={{ width: progressPercent + "%" }}></div>
                        </div>
                        <div>{questionNumber}/25</div>
                    </div>
                    <div className="correct"><FaCheck />{correctPercent}% </div>
                </div>
            </div>
            <div className="content">
                <div className="question-character">{currentQuestion.slug}</div>
                <form className="kanji-form"
                    onSubmit={e => {
                        e.preventDefault()
                        console.log(e.target[0].value);
                        if (meaningInput === "") return;
                        if (questionActive) {
                            setQuestionActive(false);
                            checkMeaning();
                            checkRadicals(e);
                        } else { setNextQuestion() }
                    }}>
                    {currentQuestion.component_subject_ids.map((radical, index) => {
                        return (
                            <div
                                key={radical}
                            >
                                <span className={checkClasses}>
                                    {meaningCorrect ? <FaCheck /> : <ImCross />}
                                </span>
                                <input
                                    type="text"
                                    placeholder="Radical Name"
                                    className="radical-input"
                                    name={index}
                                >
                                </input>
                            </div>
                        )
                    })}
                    <div>
                        <span className={checkClasses}>
                            {meaningCorrect ? <FaCheck /> : <ImCross />}
                        </span>
                        <input
                            type="text"
                            placeholder='Kanji Meaning'
                            value={meaningInput}
                            onChange={(e) => setMeaningInput(e.target.value)}
                            className="kanji-input"
                        ></input>
                        <button><GrLinkNext /></button>
                    </div>
                </form>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
background-color: var(--kanji);
color:white;
padding:0.5rem;
min-height: 100dvh;
font-size:1.2rem;

.header{
    display:flex;
    justify-content: space-between;
    padding:0.5rem;
}

.stats{
    display:flex;
    gap:1rem;
    align-items: baseline;
}

.progress{
    display:flex;
    width:12rem;
    align-items: center;
    gap:0.5rem;
}

.progress--bar{
    position:relative;
    height:1rem;
    width:10rem;
    background-color:var(--kanji-dark);
    border-top-right-radius:1rem;
    border-bottom-right-radius:1rem;
}

.progress--bar__inner{
    background-color: white;
    height:1rem;
    position:absolute;
    border-top-right-radius:1rem;
    border-bottom-right-radius:1rem;
}

.correct{
    display: flex;
    align-items: center;
    gap: 0.2rem;
}

.content{
    display:flex;
    justify-content: space-evenly;
    margin-top:2rem;
    align-items: center;;
}

.question-character{
    font-size:4rem;
}

.kanji-input{
    background-color: var(--kanji-light);
    font-size:1.2rem;
}

.radical-input{
    background-color: var(--radical-light);
    font-size:1.2rem;
}

.kanji-form{
    display:flex;
    flex-direction: column;
    gap:1rem;
}

.check{
 margin-right:1rem;
 transition:color 0.5s linear;
 color:var(--kanji);    
}

.check--correct{
    color:var(--correct-answer)
}

.check--false{
    color:var(--false-answer)
}

`;