import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
/*
argument of form:
[{
    'correctAnswer': required
    'providedAnswer': required
    'characters': string or 'null'
    'image': required if characters is 'null'
},]
*/
export const IncorrectAnswers = ({ wrongAnswers }) => {
    const dispatch = useDispatch();

    return (
        <Wrapper>
            <div>
                <div className="incorrect-title">Incorrect Answers</div>
                <div className="incorrect-header">
                    <div>Question</div>
                    <div>Answer</div>
                    <div>Your Answer</div>
                </div>
                {wrongAnswers.map(e => {
                    return (
                        <div className="incorrect-row" key={e.correctAnswer}>
                            <div className="incorrect-character">
                                {e.characters != 'null' ? e.characters
                                    : <img className="incorrect-image" src={e.image} />}
                            </div>
                            <div>{e.correctAnswer}</div>
                            <div>{e.providedAnswer}</div>
                        </div>
                    )
                })}
                <div className="game-over__btn">
                    <Link to="/" >
                        <button className="btn back-home">Back Home</button>
                    </Link>
                </div>

            </div>
        </Wrapper>
    )
}


const Wrapper = styled.main`

.incorrect-header{
    display:flex;
    gap:1rem;
    font-size:1.2rem;
    font-weight:bold;
    justify-content: space-evenly;
}

@media only screen and (min-width: 500px) {
    .incorrect-header{
        font-size:1.5rem;
    }
}

.incorrect-header div:first-child{
    width:20%;
}

.incorrect-header div{
    width:35%;
}

.incorrect-row{
    display:flex;
    gap:1rem;
    justify-content: space-evenly;
    font-size:1.1rem;
}

@media only screen and (min-width: 500px) {
    .incorrect-row{
        font-size:1.5rem;
    }
}

.incorrect-row div:first-child{
    width:20%;
}

.incorrect-row div{
    width:35%;
}

.incorrect-title{
    font-size: 1.5rem;
    font-weight:bold;
    margin-left: 0.5rem;
}

@media only screen and (min-width: 500px) {
    .incorrect-title{
        font-size:2rem;
    }
}

.incorrect-character{
    font-size:1.5rem;
    color:white;
}
@media only screen and (min-width: 500px) {
    .incorrect-character{
        font-size:2rem;
    }
}

.incorrect-image{
    height:2.5rem;
}
@media only screen and (min-width: 500px) {
    .incorrect-image{
        height:3rem;
    }
}

.back-home{
    font-size:1.2rem;
}

.game-over__btn{
    margin-top: 2rem;
    text-align: center;
    margin-bottom:3rem;
}

`;