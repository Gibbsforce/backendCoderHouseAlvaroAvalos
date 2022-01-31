import styled from "styled-components"
export const Wrapper = styled.div`
    padding: 40px 20px;
    text-align: center;
`
export const Content = styled.div`
    margin: 0 auto;
    display: flex;
    justify-content: center;
    @media screen and (max-width: 768px) {
        flex-direction: column;
    }
`
export const Profile = styled.div`
    width: 100%;
    text-align: center;
    img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
    }
`
export const Carts = styled.div`
    width: 100%;
    text-align: center;
    .cart-container {
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
    }
    .cart-products {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 20px;
        grid-auto-flow: dense;
        font-family: 'AvenirLTW01-95BlackObli', sans-serif;
    }
    .cart-product {
        display: flex;
        justify-content: left;
        border-radius: 10px;
        margin: auto;
        box-shadow: 5px 5px 5px 0 rgb(186 204 201);
        width: 100%;
    }
    .column:nth-child(1) {
        width: 30%;
    }
    .column {
        width: 70%;
        background: linear-gradient(#fff,#baccc9cc);
        padding: 20px;
        display: flex;
        justify-content: space-between;
    }
    .thumbnail-cart {
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 50px;
            height: 50px;
        }
    }
    .dsc-cart {
        display: flex;
        flex-direction: column;
        text-align: left;   
    }
    .btns {
        display: flex;
        justify-content: space-between;
        align-items: center;

    }
`