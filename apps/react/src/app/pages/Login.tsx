import styled from 'styled-components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { loginAsync } from '@internship/store/authentication';
import { useTemporary } from '@internship/shared/hooks';
import { Captcha } from '@internship/ui';
import GoogleLogin from 'react-google-login';
import { api } from '@internship/shared/api';

const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;
const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;
const Button = styled.button`
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  background-color: #007bff;
`;
const H4 = styled.h4`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Container = styled.div`
  display: inline-block;
  border: ridge;
  padding: 4.5rem;
`;

export const Login = (context) => {
  const { handleSubmit, register } = useForm();
  const dispatch = useDispatch();
  const { isCaptchaRequired } = useTemporary();

  const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem('cloud_users', JSON.stringify(response));
    api.auth.loginGoogle(response);
  }

  const onSubmit = (values) => {
    dispatch(loginAsync.request(values));
  };

   const API_BASE_URL = 'http://localhost:8080';

   const ACCESS_TOKEN = 'accessToken';

   const OAUTH2_REDIRECT_URI = 'http://localhost:4200/oauth2/redirect'

   const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;


  return (

  <StyledApp>

      <form onSubmit={handleSubmit(onSubmit)}>
        <H4>Enter your information to log into your account.</H4>
        <Container>
          <StyledRow>
            <div className="col-4">
              <label>User Name:</label>
            </div>
            <div className="col-8">
              <input type="text" name="username" ref={register({ required: true })} />
            </div>
          </StyledRow>
          <StyledRow>
            <div className="col-4">
              <label>Password:</label>
            </div>
            <div className="col-8">
              <input type="password" name="password" ref={register({ required: true })} />
            </div>
          </StyledRow>
          {isCaptchaRequired ? (
            <StyledRow>
              <div className="col-8">
                <Captcha name="captcha" ref={register({ required: true })} />
              </div>
            </StyledRow>
          ) : null}
          <StyledRow>
            <p>No account?</p>
            <a href="/register">Sign Up</a>
          </StyledRow>
          <Button type="submit">Submit</Button>
          <GoogleLogin
            clientId="23500386943-9hrfde5uu9qvugpa1bq3cacdsqbbdu0o.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </Container>
      </form>
    </StyledApp>
  );
};

export default Login;
