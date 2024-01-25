import styled from 'styled-components';
import { Link } from "react-router-dom";
import { FaCheck, FaHome } from "react-icons/fa";
import { GrLinkNext } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { getRadicals } from '../utils/getRadicals';
import { useMemo, useState } from 'react';
import { isAnswerCorrect } from '../utils/isAnswerCorrect';


export const RadicalDisplay = () => {
    const { beginningLevel, lastLevel } = useSelector((store) => store.radicalReview);
    const radicals = useMemo(() => getRadicals(beginningLevel, lastLevel), [beginningLevel, lastLevel]);

    const [questionNumber, setQuestionNumber] = useState(1);
    const [answerInput, setAnswerInput] = useState("");
    const [correctCount, setCorrectCount] = useState(0);
    const [questionStatus, setQuestionStatus] = useState("active");
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [gameOver, setGameOver] = useState(false);

    let inputStyleClasses = "input-styles ";
    if (questionStatus === "correct") inputStyleClasses = "input-styles correct-answer";
    else if (questionStatus === "false") inputStyleClasses = "input-styles false-answer";

    const currentQuestion = radicals[questionNumber - 1];

    const progressPercent = Math.round(questionNumber * 100 / radicals.length);


    const correctPercent = useMemo(() => {
        let percent = 0;
        if (questionNumber > 1) {
            percent = Math.round((correctCount / (questionNumber - 1)) * 100)
        }
        return percent;
    }, [questionNumber])

    const checkAnswer = () => {
        if (isAnswerCorrect(answerInput, currentQuestion.slug)) {
            setCorrectCount(() => correctCount + 1)
            setQuestionStatus("correct");
        } else {
            setQuestionStatus("false")
            setIncorrectAnswers(incorrectAnswers => [...incorrectAnswers, {
                'characters': currentQuestion.characters,
                'image': currentQuestion.image,
                'slug': currentQuestion.slug,
                'answer': answerInput
            }])
        }
    }


    const setNextQuestion = () => {
        setQuestionStatus("active");
        setAnswerInput("");
        if (questionNumber <= radicals.length - 1) {
            setQuestionNumber(() => questionNumber + 1)
        } else {
            setGameOver(true);
            console.log(incorrectAnswers)
        }
    }

    return (
        <Wrapper>
            <div className="question-area">
                <div className="header">
                    <Link to="/" className="home"><FaHome /></Link>
                    <div className="stats">
                        <div className="progress">
                            <div className="progress--bar">
                                <div className="progress--bar__inner" style={{ width: progressPercent + "%" }}></div>
                            </div>
                            <div>{questionNumber}/{radicals.length}</div>
                        </div>
                        <div className="correct"><FaCheck />{correctPercent}% </div>
                    </div>
                </div>
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
            {gameOver &&
                <div>
                    <div className="incorrect-title">Incorrect Answers</div>
                    <div className="review-header">
                        <div>Radical</div>
                        <div>Name</div>
                        <div>Your Answer</div>
                    </div>
                    {incorrectAnswers.map(e => {
                        return (
                            <div className="review-row" key={e.slug}>
                                <div className="incorrect-character">
                                    {e.characters != 'null' ? e.characters
                                        : <img className="incorrect-image" src={e.image} />}
                                </div>
                                <div>{e.slug}</div>
                                <div>{e.answer}</div>
                            </div>
                        )
                    })}
                    <Link to="/"><button className="btn back-home">Back Home</button></Link>
                </div>

            }
        </Wrapper>);
}

const Wrapper = styled.main`


.question-area{
background-color: var(--radical);
color:white;
}

.home{
    fill:white;
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
    background-color:#1e40af;
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


.review-header{
    display:flex;
    gap:1rem;
    font-size:1.2rem;
    font-weight:bold;
    justify-content: space-evenly;
}

.review-header div:first-child{
    width:20%;
}

.review-header div{
    width:35%;
}

.review-row{
    display:flex;
    gap:1rem;
    justify-content: space-evenly;
    font-size:1.1rem;
}

.review-row div:first-child{
    width:20%;
}

.review-row div{
    width:35%;
}

.incorrect-title{
    font-size: 1.5rem;
    font-weight:bold;
    margin-left: 0.5rem;
}

.incorrect-character{
    font-size:1.5rem;
    color:white;
}

.incorrect-image{
    height:2.5rem;
}

.back-home{
    margin-left:1rem;
}

`;