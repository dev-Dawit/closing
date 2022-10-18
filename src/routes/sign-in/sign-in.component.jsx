import {signInWithGooglePopup, createUserDocumetFromAuth} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component'

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();  //Poping up sign in with Google on our sign-in page.then destructuring 'user' property from the response obj we got from signInWithPopup b/c that is the only property we care abt
        console.log(user);
        const userDocRef = await createUserDocumetFromAuth(user);  //storing the Authenticated user in firestore db 
    };

    return(
        <div>
            <h2>This is the sign-in page</h2>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <SignUpForm />
        </div>
    )
 }

export default SignIn