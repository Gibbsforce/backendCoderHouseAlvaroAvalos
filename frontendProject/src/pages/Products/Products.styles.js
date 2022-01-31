import styled from "styled-components"
export const Wrapper = styled.div`
    padding: 40px 20px;
`
export const Content = styled.div`
    p {
        font-size: 2rem;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    margin: 0 auto;
    .products-container {
        margin-left: 10%;
        margin-right: 10%;
        margin-top: 5%;
    }
    .cart-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: repeat(1, 1fr);
        grid-gap: 20px;
        grid-auto-flow: dense;
    }
    .id-card {
        background: linear-gradient(#fff,#baccc9cc);
        border-radius: 10px;
        width: 100%;
        height: 100%;
        box-shadow: 5px 5px 5px 0 rgb(186 204 201);
    }
    .title-card {
        font-size: 20px;
        background-color: #03424659;
        border-radius: 10px 10px 0 0;
        color: #000;
        height: 10%;
        font-size: 24px;
    }
    .thumbnail-card {
        margin: 2%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .url-img {
        width: 100px;
        height: 100px;
    }
    .description-card {
        text-align: center;
        font-size: 24px;
    }
    .price-card {
        margin: 5%;
        text-align: center;
        font-size: 24px;
        input {
            width: 100px;
        }
    }
    .stock-card {
        font-size: 18px;
        text-align: center;
        input {
            width: 50px;
        }
    }
    .title-card, .thumbnail-card, .description-card, .price-card, .stock-card, .btn-card {
        display: flex;
        justify-content: center;
        font-family: 'AvenirLTW01-95BlackObli', sans-serif;
    }
    // remove input style
    input {
        border: none;
        background: none;
        font-size: 24px;
        font-family: 'AvenirLTW01-95BlackObli', sans-serif;
        text-align: center;
    }
    input:focus {
        outline: 2px solid #03424659;
        background: white;
        border-radius: 10px;
    }
    .delete-btn {
        margin-left: 10%;
        margin-top: 5px;
        span {
        pointer-events: none;
        transition: all 0.3s ease;
        }
        button {
            cursor: pointer;
            padding: 0;
            margin: 0;
            appearance: none;
            outline: none;
            border: none;
            background: none;
        }
        :hover {
            color: red;
        }
    }
    @media screen and (max-width: 768px) {
        .cart-container {
            grid-template-columns: repeat(1, 1fr);
        }
    }
`