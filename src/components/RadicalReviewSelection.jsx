import styled from 'styled-components';
import { radicalData } from "../data/radical-data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleBeginningLevelChange, handleLastLevelChange } from "../features/radicalReview/radicalReviewSlice";


export const RadicalReviewSelection = () => {
    const { beginningLevel, lastLevel } = useSelector((store) => store.radicalReview)
    const dispatch = useDispatch();

    const optionsArray = [];
    for (let i = 1; i <= 60; i++) optionsArray.push(i);

    let radicalAmount = 0;
    for (const [id, radical] of Object.entries(radicalData)) {
        if (radical.level >= beginningLevel && radical.level <= lastLevel) radicalAmount++;
    }

    return (
        <Wrapper>
            <section className="content">
                <div className="section-title">Radical Review</div>
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

                <div className="footer">
                    <div>
                        <span className="radical-amount">{radicalAmount}</span> radicals to practise
                    </div>
                    <Link
                        to="/radicalreview"
                        className="btn"
                    >Start</Link>
                </div>
            </section>
        </Wrapper >
    )
}

const Wrapper = styled.main`
background-color: var(--radical);
color:white;
padding:0.5rem;
height: 40dvh;
font-size:1.2rem;

@media only screen and (min-width: 1000px) {
    display:inline-block;
    height:80dvh;
    width:50%;
    font-size:2rem;
}

select{
    font-size:1.2rem;
}

@media only screen and (min-width: 1000px) {
    select{
        font-size:2rem;
    }
}


.content{
    position:relative;
    height:100%;
}

.section-title{
    text-align: center;
    font-weight:bold;
    font-size:1.5rem;
}

@media only screen and (min-width: 1000px) {
    .section-title{
    font-size:3rem;
    }
}

.section-select{
text-align: center;
position: relative;
    top: 2rem;
}


.footer{
    position:absolute;
    bottom:2rem;
    display: flex;
    width:100%;
    justify-content: space-evenly;
    font-size:1.1rem;
}

@media only screen and (min-width: 1000px) {
    .footer{
    font-size:2rem;
    }
}


.radical-amount{
    font-size:1.5rem;
    font-weight:bold;
}

@media only screen and (min-width: 1000px) {
    .radical-amount{
    font-size:2.5rem;
    }
}
`;