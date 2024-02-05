import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleKanjiLevelChange, resetIdentifyRadicalsGame } from "../features/identifyRadicals/identifyRadicalsSlice";
import { getKanjiStage } from '../utils/getKanjiState';


export const IdentifyRadicalsSelection = () => {
    const { kanjiLevel } = useSelector(store => store.identifyRadicals)
    const dispatch = useDispatch();

    const optionsArray = [];
    for (let i = 1; i <= 60; i++) optionsArray.push(i);

    return (
        <Wrapper>
            <section className="content">
                <div className="section-title">Identify Radicals</div>
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
            </section>
        </Wrapper>
    )
}

const Wrapper = styled.main`
background-color: var(--kanji);
color:white;
padding:0.5rem;
height: 40dvh;
font-size:1.2rem;

@media only screen and (min-width: 1000px) {
    display:inline-block;
    height:80dvh;
    width:50%;
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
`;