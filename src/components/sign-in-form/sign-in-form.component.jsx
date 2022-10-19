import { useState, useContext} from 'react';

import {signInWithGooglePopup, createUserDocumetFromAuth, signInAuthWithEmailAndPassword} from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { UserContext } from '../../contexts/user.context';

import './sign-in-form.styles.scss';


const defaultFormFields = 
{
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields; 

    const {setCurrentUser} = useContext(UserContext);   //pulling current user setter function from the context provider value

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();  //Poping up sign in with Google on our sign-in page.then destructuring 'user' property from the response obj we got from signInWithPopup b/c that is the only property we care abt
        await createUserDocumetFromAuth(user);  //storing the Authenticated user in firestore db 
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        //retrieve user from firestore
        try{
            const { user } = await signInAuthWithEmailAndPassword(email, password);
            setCurrentUser(user);
            resetFormFields();
        }
        catch(error){
           switch(error.code){
                case 'auth/wrong-password':
                    alert('wrong password');
                    break;
                
                case 'auth/user-not-found':
                    alert('No user signed with this email')
                    break;
                
                default:
                    console.log(error);
           }
        }

    }

    //handles changes on the input fields
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})      //spreads-in all 'formFields' object properties(key-value pairs) with their state values, and set the value of the input that triggerd the event(the name that matches with the 'name' tag). 
    } 
    return(
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
                
                <FormInput label= 'Email' inputOptions= {{type:'text', required: true, onChange:handleChange, name:'email', value:email}}/>
                
                <FormInput label= 'Password' inputOptions= {{type:'password', required: true, onChange:handleChange, name:'password', value:password}}/>
                
                <div className='buttons-container'>
                    <Button type= 'submit' buttonType=''>SIGN IN</Button>
                    <Button type='button' buttonType= 'google' onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </div>
                
            </form>
        </div>
    )
}

export default SignInForm;