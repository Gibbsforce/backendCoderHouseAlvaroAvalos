import styled from "styled-components"
export const Wrapper = styled.div`
    padding: 40px 20px;
`
export const Content = styled.div`
    margin: 0 auto;
    max-width: 500px;
    input {
        background-color: rgba(186,204,201,.8);;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }
    input[type=number] {
    -moz-appearance: textfield;
    }
    p {
        margin: 10%;
        font-size: 32px;
    }
`