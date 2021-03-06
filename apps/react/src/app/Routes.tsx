import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  About,
  CategoryContentPage,
  Contact,
  ContentViewingPage,
  ForgotPasswordPage,
  Login,
  MailErrorPage,
  MailSuccessPage,
  MainPage,
  OAuth2RedirectHandler,
  Profile,
  Register,
  ResetPassword,
  ContentMorePage,
  SearchPage,
} from './pages';

export const Routes = ({ children, ...props }) => {
  return (
    <Router {...props}>
      {children}
      <Route exact path="/" component={MainPage} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/forgotpassword" component={ForgotPasswordPage} />
      <Route path="/resetpassword" component={ResetPassword} />
      <Route path="/profile" component={Profile} />
      <Route path="/contents" component={ContentViewingPage} />
      <Route path="/category/:categoryName" component={CategoryContentPage} />
      <Route path="/content/:contentId" component={ContentMorePage} />
      <Route path="/auth" component={OAuth2RedirectHandler} />
      <Route exact path="/mailsuccess" component={MailSuccessPage} />
      <Route exact path="/mailerror" component={MailErrorPage} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/search/:contentHeaders" component={SearchPage} />
    </Router>
  );
};
