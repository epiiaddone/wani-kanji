import styled from 'styled-components';
import { GrLinkNext } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { isAnswerCorrect } from '../utils/isAnswerCorrect';
import {
    addWrongAnswer,
    incrementCompletedCount,
    incrementCorrectCount,
    incrementQuestionNumber,
    setGameOver
} from '../features/radicalReview/radicalReviewSlice';
import { RadicalSvg } from './RadicalSvg';


export const RadicalDisplay = ({ radicals }) => {
    const { gameOver, questionNumber } = useSelector((store) => store.radicalReview);
    const dispatch = useDispatch();

    const [answerInput, setAnswerInput] = useState("");
    const [questionStatus, setQuestionStatus] = useState("active");

    let inputStyleClasses = "input-styles ";
    if (questionStatus === "correct") inputStyleClasses = "input-styles correct-answer";
    else if (questionStatus === "false") inputStyleClasses = "input-styles false-answer";

    const currentQuestion = radicals[questionNumber - 1];

    const checkAnswer = () => {
        if (isAnswerCorrect(answerInput, currentQuestion.slug)) {
            dispatch(incrementCorrectCount())
            setQuestionStatus("correct");
            removeFromLocalStorage();
        } else {
            setQuestionStatus("false")
            dispatch(addWrongAnswer({
                "characters": currentQuestion.characters,
                "correctAnswer": currentQuestion.slug,
                "providedAnswer": answerInput,
                "image": currentQuestion.image
            }));
            addTolocalStorage();
        }
        dispatch(incrementCompletedCount())
    }


    const removeFromLocalStorage = () => {
        let currentMistakes = localStorage.getItem('radical-mistakes') ?
            JSON.parse(localStorage.getItem('radical-mistakes')) : [];
        if (currentMistakes.includes(currentQuestion.radicalID)) currentMistakes = currentMistakes.filter((id) => id !== currentQuestion.radicalID);
        localStorage.setItem('radical-mistakes', JSON.stringify(currentMistakes));
    }

    const addTolocalStorage = () => {
        let currentMistakes = localStorage.getItem('radical-mistakes') ?
            JSON.parse(localStorage.getItem('radical-mistakes')) : [];
        if (!currentMistakes.includes(currentQuestion.radicalID)) currentMistakes.push(currentQuestion.radicalID);
        localStorage.setItem('radical-mistakes', JSON.stringify(currentMistakes));
    }


    const setNextQuestion = () => {
        setQuestionStatus("active");
        setAnswerInput("");
        if (questionNumber <= radicals.length - 1) {
            dispatch(incrementQuestionNumber())
        } else {
            dispatch(setGameOver(true));
        }
    }

    return (
        <Wrapper>
            <div className="question-area">
                {gameOver && <div className="game-over">Game Over</div>}
                {!gameOver &&
                    <div>
                        <div className="question">
                            <div className="question--character">{currentQuestion.characters === 'null' ?
                                <RadicalSvg radicalSlug={currentQuestion.slug} />
                                : currentQuestion.characters}
                            </div>
                            <div className="question--slug">{questionStatus === "false" && currentQuestion.slug}</div>
                        </div>
                        <div className="answer-input">
                            <form className="answer-input--form" onSubmit={e => {
                                e.preventDefault()
                                if (answerInput === "") return;
                                if (questionStatus === "active") { checkAnswer(); }
                                else { setNextQuestion() }
                            }}
                            >
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder='Radical Name'
                                    value={answerInput}
                                    onChange={(e) => setAnswerInput(e.target.value)}
                                    className={inputStyleClasses}
                                ></input>
                                <button className="form-button"><GrLinkNext /></button>
                            </form>
                        </div>
                    </div>
                }
                {questionStatus != "active" && <a
                    className="radical-link"
                    target="_blank"
                    href={"https://www.wanikani.com/radicals/" + currentQuestion.slug}
                >Wani Kani</a>}
            </div>
        </Wrapper>);
}

const Wrapper = styled.main`

.question-area{
background-color: var(--radical);
color:white;
position:relative;
}

.false-answer{
    background-color: var(--false-answer);
}

.correct-answer{
    background-color: var(--correct-answer);
}

.game-over{
    text-align: center;
    font-size:3rem;
    text-transform:uppercase;
    font-weight:bold;
}

.question{
    height:10rem;
    text-align: center;
    margin-bottom:  1rem;
}

.question--character{
    font-size: 3rem;
}

.question--slug{
    font-size:1.5rem;
}

.answer-input{
    display: flex;
    justify-content: center;
    height: 2.5rem;
    font-size: 1.5rem;
}

.answer-input--form{
    display:flex;
    position:relative;
}

.form-button{
    position: absolute;
    right: 0;
    height: 100%;
}

.input-styles{
    font-size: 1.5rem;
    text-align: center;
    width:20rem;
}

@media only screen and (min-width: 1000px) {
    .input-styles{
        width:30rem;
    }
}

.radical-link{
    all: unset;
    text-decoration: underline;
    font-size: 1.5rem;
    cursor: pointer;
    position: absolute;
    bottom: 3rem;
    right: 2rem;
}

.radical--image{
    height:6rem;
    color:white;
}

`;