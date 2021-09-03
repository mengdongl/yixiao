import styled from "@emotion/styled";

export const Row = styled.div<{
    marginRight?: boolean | number;
    marginBottom?: boolean | number;
}>`
display: flex;
align-items: center;
margin-bottom: ${props => typeof props.marginBottom === 'number' ? props.marginBottom + 'rem': props.marginBottom? '2rem': '0'};
& > * {
    margin-right: ${ props => typeof props.marginRight === 'number' ? props.marginRight + 'rem' : props.marginRight ? '3rem' : '0rem'  };
    margin-top: 0 !important;
    margin-bottom: 0 !important;
}
`