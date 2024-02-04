import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Error = () => {
    return (
        <Wrapper>
            <div>There was an error</div>
            <Link to="/" >
                <button className="btn back-home">Back Home</button>
            </Link>
        </Wrapper>
    )
}


const Wrapper = styled.main`
.back-home{
    font-size:1.2rem;
}
`;