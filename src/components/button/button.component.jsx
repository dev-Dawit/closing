//we have 3 types of buttons. default, inverted and google sign-in buttons
// we create a general button and render different form of it using className

import './button.styles.scss';

const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',   //styles for google-sign-in and for inverted are defined in button.scss file
    inverted: 'inverted'
}
const Button = ({ children, buttonType, ...otherProps }) => {  //otherProps like type='submit'
    return(
       <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>{children}</button>   //obj[key] = value of that property  
    )
}

export default Button;