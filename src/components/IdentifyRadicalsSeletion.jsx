import styled from 'styled-components';
import { kanji_level_1 } from "../data/kanji_level_1_data";
import { kanji_level_2 } from "../data/kanji_level_2_data";
import { kanji_level_3 } from "../data/kanji_level_3_data";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleKanjiLevelChange } from "../features/identifyRadicals/identifyRadicalsSlice";


export const IdentifyRadicalsSelection = () => {
    const { kanjiLevel } = useSelector(store => store.identifyRadicals)
    const dispatch = useDispatch();

    const optionsArray = [];
    for (let i = 1; i <= 3; i++) optionsArray.push(i);

    let kanjiData = {};
    switch (kanjiLevel) {
        case "1": kanjiData = kanji_level_1; break;
        case "2": kanjiData = kanji_level_2; break;
        case "3": kanjiData = kanji_level_3; break;
    }

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

                <div class="footer">
                    <div >
                        <span className="radical-amount">{Object.keys(kanjiData).length}</span> kanji to practise
                    </div>

                    <Link
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

.kanji-btn{
    background-color: var(--kanji-dark);
}
`;