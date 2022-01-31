// Styles
import { Wrapper } from "./Button.styles"
const Button = ({ callback, text }) => {
    return (
        <Wrapper type="button" onClick={callback}>
            {text}
        </Wrapper>
    )
}
export default Button