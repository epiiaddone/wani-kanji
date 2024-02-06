import styled from 'styled-components';
import { RadicalReviewSelection } from '../components/RadicalReviewSelection';
import { IdentifyRadicalsSelection } from '../components/IdentifyRadicalsSeletion';
import { LandingBanner } from '../components/LandingBanner';
import { fetchAllKanji } from '../getData';

const LandingPage = () => {
    //fetchAllKanji();


    return (
        <Wrapper className="">
            <LandingBanner />
            <RadicalReviewSelection />
            <IdentifyRadicalsSelection />
        </Wrapper>


    )
}

const Wrapper = styled.main`

`;

export default LandingPage;