import { React, useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { SignIn } from '../components/Authentication';
import { useDispatch } from 'react-redux';

const SignInPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <div style={{ width: '30rem', margin: 'nonce', padding: '20px', color: "white", width:"80%", backgroundColor:"#1E1F21", minHeight:"700px"}}
        class="container d-flex aligns-items-center justify-content-center">
        <Form
            onSubmit={event => {
                event.preventDefault();
                SignIn(dispatch, { username, password });
            }}>
            <h4 style={{ textAlign: 'center' }}>Login</h4>
            <InputGroup className='mb-3'>
                <FormControl placeholder='Username' required
                    onChange={event => setUsername(event.target.value)} />
            </InputGroup>
            <InputGroup className='mb-3'>
                <FormControl placeholder='Password' type='password' required
                    onChange={event => setPassword(event.target.value)} />
            </InputGroup>
            <Button type='submit' variant='primary' style={{ margin: 'auto', display: 'block', width: '10rem',background:"#222222" }}>Sign In</Button>
        </Form>
    </div>
    )
};

export default SignInPage;
