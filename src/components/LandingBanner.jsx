import styled from 'styled-components';

export const LandingBanner = () => {
    return (
        <Wrapper>
            <div className="banner">
                Here are a couple of games to aid the memorisation of
                <span> <a href="https://wanikani.com" target="_">WaniKani</a> </span>
                radicals
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.main`
position:relative;
height:20dvh;
font-size:1.2rem;
text-align:center;
padding:1rem;

@media only screen and (min-width: 1000px) {
    font-size:1.5rem;
}

.banner{
    padding:0.5rem;
    width:90%;
    position:absolute;
    top:50%;
    left:50%;
  transform: translate(-50%, -50%);
}

`;