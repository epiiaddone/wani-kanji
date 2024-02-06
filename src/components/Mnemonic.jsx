import styled from 'styled-components';




export const Mnemonic = ({ mnemonicString }) => {
    //console.log("mnemonicString:", mnemonicString)

    const stringReplaced = mnemonicString
        .replaceAll('<kanji>', '**k[')
        .replaceAll('</kanji>', ']k**')
        .replaceAll('<radical>', '**r[')
        .replaceAll('</radical>', ']r**');

    //console.log(stringReplaced)
    const stringSplit = stringReplaced.split('**');
    //console.log(stringSplit);

    // const stringSplit = mnemonicString.split(/\s<|>\s|>\./)
    // 

    return (
        <Wrapper>
            {stringSplit.map((s, i) => {
                if (s.indexOf('k[') > -1) {
                    let start = "k[".length;
                    let end = s.length - "]k".length;
                    return <span className="mnemonic-item mnemonic-kanji" key={i}>{s.slice(start, end)}</span>
                } else if (s.indexOf('r[') > -1) {
                    let start = "[r".length;
                    let end = s.length - "]r".length;
                    return <span className="mnemonic-item mnemonic-radical" key={i}>{s.slice(start, end)}</span>
                }
                else return s;
            })}
        </Wrapper>
    )
}

const Wrapper = styled.main`

.mnemonic-item{
    color:black;
    padding: 0 0.5rem;
    border-radius:0.2rem;
}


.mnemonic-kanji{
    background-color: var(--kanji-light);
}

.mnemonic-radical{
    background-color: var(--radical-light);
}


`;