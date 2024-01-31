import { FaCheck, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


export const Header = ({ completedCount, correctCount, questionNumber, total }) => {
    const progressPercent = Math.round(questionNumber * 100 / total);
    const correctPercent = completedCount === 0 ?
        '-' : Math.round(correctCount * 100 / completedCount);

    return (
        <Wrapper>
            <div className="header">
                <Link to="/" className="home"><FaHome /></Link>
                <div className="stats">
                    <div className="progress">
                        <div className="progress--bar">
                            <div className="progress--bar__inner" style={{ width: progressPercent + "%" }}></div>
                        </div>
                        <div>{questionNumber}/{total}</div>
                    </div>
                    <div className="correct"><FaCheck />{correctPercent}% </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.main`
.header{
    display:flex;
    justify-content: space-between;
    padding:0.5rem;
    font-size:1.2rem;
}

.home{
    color:white;
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
    background-color:var(--grey-300);
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
`;