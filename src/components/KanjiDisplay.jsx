import { FaCheck } from 'react-icons/fa';
import { ImCross } from "react-icons/im";
import styled from 'styled-components';
import { GrLinkNext } from 'react-icons/gr';
import { useEffect, useState } from 'react';
import { isAnswerCorrect } from '../utils/isAnswerCorrect';
import { radicalData } from '../data/radical-data';
import { useDispatch, useSelector } from 'react-redux';
import {
    addWrongAnswer,
    incrementCompletedCount,
    incrementCorrectCount,
    incrementQuestionNumber,
    setKanjiGameOver
} from '../features/identifyRadicals/identifyRadicalsSlice';

export const KanjiDisplay = ({ kanji }) => {
    console.log("inside KanjiDisplay");
    console.log(kanji);
    const { gameOver, questionNumber } = useSelector(store => store.identifyRadicals);
    const dispatch = useDispatch();

    const [meaningInput, setMeaningInput] = useState("");
    const [questionActive, setQuestionActive] = useState(true);
    const [meaningCorrect, setMeaningCorrect] = useState(false);
    const [radicalsCorrect, setRadicalsCorrect] = useState([]);

    const currentQuestion = kanji[questionNumber - 1];
    console.log(currentQuestion)

    useEffect(() => {
        let tempArray = [];
        currentQuestion.component_subject_ids.forEach((id, index) => {
            tempArray[index] = false;
        })
        setRadicalsCorrect([...tempArray]);
    }, [questionNumber])


    const assignCheckClasses = (correct) => {
        if (questionActive) return "check";
        else if (correct) return "check check--correct";
        else return "check check--false";
    }

    const checkClasses = assignCheckClasses(meaningCorrect);
    let radicalClasses = [];
    currentQuestion.component_subject_ids.forEach((id, index) => {
        radicalClasses[index] = assignCheckClasses(radicalsCorrect[index])
    })


    const checkRadicals = (e) => {
        let radicalNames = [];
        currentQuestion.component_subject_ids.forEach(
            id => radicalNames.push(radicalData[id].slug));

        let newRadicalsCorrect = [];

        for (let i = 0; i < currentQuestion.component_subject_ids.length; i++) {
            radicalNames.forEach(name => {
                if (isAnswerCorrect(e.target[i].value, name)) {
                    //prevent repeated answers being marked as correct
                    radicalNames.splice(radicalNames.indexOf(name), 1);
                    newRadicalsCorrect[i] = true;
                }
            })
        }
        //only set once due to batched updates
        setRadicalsCorrect(newRadicalsCorrect);
    }

    const checkMeaning = () => {
        if (isAnswerCorrect(meaningInput, currentQuestion.meaning)) {
            dispatch(incrementCorrectCount())
            setMeaningCorrect(true);
        } else {
            dispatch(addWrongAnswer({
                "characters": currentQuestion.slug,
                "correctAnswer": currentQuestion.meaning,
                "providedAnswer": meaningInput,
                "image": null
            }))
        }
        dispatch(incrementCompletedCount())
    }

    const setNextQuestion = () => {
        setQuestionActive(true);
        setMeaningInput("");
        setMeaningCorrect(false);
        if (questionNumber <= kanji.length - 1) {
            dispatch(incrementQuestionNumber())
        } else {
            dispatch(setKanjiGameOver(true));
        }
    }


    return (
        <Wrapper>
            {!gameOver &&
                <div>
                    <div className="content">
                        <div className="question-character">{currentQuestion.slug}</div>
                        <form className="kanji-form"
                            onSubmit={e => {
                                e.preventDefault()
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
                                        /*sucessive kanji may have the same radical*/
                                        key={radical + currentQuestion.slug}
                                    >
                                        <span className={radicalClasses[index]}>
                                            {radicalsCorrect[index] ? <FaCheck /> : <ImCross />}
                                        </span>
                                        <input
                                            autoFocus={index === 0 ? true : false}
                                            type="text"
                                            placeholder="Radical Name"
                                            className="radical-input"
                                            name={index}
                                        >
                                        </input>
                                    </div>
                                )
                            })}
                            <div className="kanji-input-container">
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
                                <button className="kanji-button"><GrLinkNext /></button>
                            </div>
                        </form>
                    </div>
                    {!questionActive && <div className="info">
                        <div className="info--title">Radicals</div>
                        <div className="info--radicals">
                            {currentQuestion.component_subject_ids.map(radicalID => {
                                return (
                                    <div
                                        className="radical"
                                        key={radicalID}
                                    >
                                        <div className="radical--characters">
                                            {radicalData[radicalID].characters === 'null' ?
                                                <img className="radical--image" src={radicalData[radicalID].image} />
                                                : radicalData[radicalID].characters}
                                        </div>
                                        <div className="radical--slug">{radicalData[radicalID].slug}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="info--title">Meaning: <span className="info--meaning">{currentQuestion.meaning}</span></div>
                    </div>}
                </div>
            }
            {gameOver && <div className="game-over">Game Over</div>}
        </Wrapper>
    )
}

const Wrapper = styled.main`

.content{
    display:flex;
    justify-content: space-evenly;
    margin-top:2rem;
    align-items: center;
}

.question-character{
    font-size:4rem;
}

.kanji-input{
    background-color: var(--kanji-light);
    font-size:1.5rem;
    height:2rem;
    border:none;
}

.kanji-input-container{
    display:flex;
}

.kanji-button{
    height:2rem;
}

.radical-input{
    background-color: var(--radical-light);
    font-size:1.5rem;
    border:none;
}

.kanji-form{
    display:flex;
    flex-direction: column;
    gap:1rem;
}

.check{
 margin-right:1rem;
 /*transition:color 0.3s linear;*/
 color:var(--kanji);    
}

.check--correct{
    color:var(--correct-answer)
}

.check--false{
    color:var(--false-answer)
}

.info{
    margin-left:1rem;
    text-align: center;
}

.info--title{
    font-size:1.5rem;
    font-weight:bold;
    color:black;
    margin-top:3rem;
}

.info--meaning{
    color:#fff;
}

.info--radicals{
    display: flex;
    align-items: center;
    flex-direction: column;
}

.radical{
    display:flex;
    gap:1rem;
    flex-wrap: wrap;
    align-items: center;
}

.radical--characters{
    font-size:1.5rem;
}

.radical--image{
    height:1.5rem;
}

.game-over{
    text-align: center;
    font-size:3rem;
    text-transform:uppercase;
    font-weight:bold;
}

`;