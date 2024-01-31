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
        } else {
            setQuestionStatus("false")
            dispatch(addWrongAnswer({
                "characters": currentQuestion.characters,
                "correctAnswer": currentQuestion.slug,
                "providedAnswer": answerInput,
                "image": currentQuestion.image
            }));
        }
        dispatch(incrementCompletedCount())
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
                                <img className="character-img" src={currentQuestion.image} />
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
                                <button><GrLinkNext /></button>
                            </form>
                        </div>
                    </div>
                }
            </div>
        </Wrapper>);
}

const Wrapper = styled.main`

.question-area{
background-color: var(--radical);
color:white;
}

.character-img{
    height:6rem;
    color:white;
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

`;