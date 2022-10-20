import { useState } from 'react';

import {createAuthUserWithEmailAndPassword, createUserDocumetFromAuth} from '../../utils/firebase/firebase.utils';

import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';
import Button from '../button/button.component';
/* steps to setup sign-in form
    step 1- create functional component 'signinForm' and return a div with the form
    step 2- prepare onChange tag on each input field to track when the input in a field changes
    step 3- create a an object to hold all states as a group 'defaultFormFields' and initialize it with empty strings
    step 4- use 'useState' react function to store the input typed in the fields and initialize it with 'defaultFormFields'
    step 5- create a function 'handleChange' which sets the input fields with the value the user types 
    step 6- create 'name' and 'value' tags to distigush the fields and know which field is firing onChange event   
    step 7- distructure the 'name' and 'value' from the event of onChange method
    step 8- spread other inputs that did not trigger an event(the field the user is not typing on) and only set the field that triggerd the event to store that value in the state 'formFields' 
    setp 9- make the value of the a particular field 'value' tag, value of that particular field from the state 'formFields'. this will make the value of that input equal to the value of the state
*/
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '' 
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields; 

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            alert("passwords do not much");    
            return;
        };
        
        //creating/storing the user in firestore
        try{
            const {user} = await createAuthUserWithEmailAndPassword(email, password)

            await createUserDocumetFromAuth(user, {displayName});
            
            resetFormFields();

        }
        catch(error){
            if(error.code == 'auth/email-already-in-use'){
                alert('cannot create user, email already in use')
            }
            console.log('user creation encountered an error', error)
           
        }

    }

    //console.log(formFields)
    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value})      //spreads-in all 'formFields' object properties(key-value pairs) with their state values, and set the value of the input that triggerd the event(the name that matches with the 'name' tag). 
    } 
    return(
        <div className='sign-up-container'>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label= 'Display Name' inputOptions= {{type:'text', required: true, onChange:handleChange, name:'displayName', value:displayName}} />
                
                <FormInput label= 'Email' inputOptions= {{type:'text', required: true, onChange:handleChange, name:'email', value:email}}/>
                
                <FormInput label= 'Password' inputOptions= {{type:'password', required: true, onChange:handleChange, name:'password', value:password}}/>
                
                <FormInput label= 'Confirm Password' inputOptions= {{type:'password', required: true, onChange:handleChange, name:'confirmPassword', value:confirmPassword}}/>

                <Button type= 'submit' buttonType=''>SIGN UP</Button>
            </form>
        </div>
    )
}

export default SignUpForm;