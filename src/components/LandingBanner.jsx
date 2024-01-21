import styled from 'styled-components';

export const LandingBanner = () => {
    return (
        <Wrapper>
            <div>
                Here are a couple of games to aid the memorisation of
                <span> <a href="https://wanikani.com" target="_">WaniKani</a> </span>
                radicals
            </div>
        </Wrapper>
    )
}


const Wrapper = styled.main``;