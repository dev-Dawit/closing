import {signInWithGooglePopup} from '../../utils/firebase/firebase.utils';

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    };

    return(
        <div>
            <h2>This is the sign-in page</h2>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </div>
    )
 }

export default SignIn