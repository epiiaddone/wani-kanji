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

    let inputStyleClasses = "";
    if (questionStatus === "correct") inputStyleClasses = "correct-answer";
    else if (questionStatus === "false") inputStyleClasses = "false-answer";

    const currentQuestion = radicals[questionNumber - 1];


    const correctPercent = useMemo(() => {
        let percent = 0;
        if (questionNumber > 1) {
            percent = Math.round((correctCount / (questionNumber - 1)) * 100)
        }
        return percent;
    }, [questionNumber])

    const checkAnswer = () => {
        if (isAnswerCorrect(answerInput, currentQuestion.slug)) {
            console.log("answer correct")
            setCorrectCount(() => correctCount + 1)
            setQuestionStatus("correct");
        } else {
            setQuestionStatus("false")
        }
    }

    const setNextQuestion = () => {
        setQuestionNumber(() => questionNumber + 1)
        setQuestionStatus("active");
        setAnswerInput("");
    }

    return (
        <Wrapper>
            <Link to="/"><FaHome /></Link>
            <div>
                <div>{questionNumber}/{radicals.length}</div>
                <div>{correctPercent}% <FaCheck /></div>
            </div>
            <div>{currentQuestion.characters === 'null' ?
                <img className="character-img" src={currentQuestion.image} />
                : currentQuestion.characters}
            </div>
            <div>{questionStatus === "false" && currentQuestion.slug}</div>
            <div>
                <form onSubmit={e => {
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
        </Wrapper>);
}

const Wrapper = styled.main`
background-color: #2563eb;

.character-img{
    height:1rem;
}

.false-answer{
    background-color: red;
}

.correct-answer{
    background-color: green;
}
`;