import React, { useState, lazy, Suspense } from 'react';
import ErrorBoundary from '../ErrorBoundary';
// import One from './One';
// import Two from './Two';
// import Three from './Three';

const One = lazy(() => import('./One'));
const Two = lazy(() => import('./Two'));
const Three = lazy(() => import('./Three'));

const About = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <h1>About</h1>
      <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button>
      {show && (
        <Suspense fallback={<p>Loading Components...</p>}>
          <ErrorBoundary>
            <One />
          </ErrorBoundary>
          <ErrorBoundary>
            <Two />
          </ErrorBoundary>
          <ErrorBoundary>
            <Three />
          </ErrorBoundary>
        </Suspense>
      )}
    </>
  );
};

export default About;

render() {
  const isLoggedIn = this.state.isLoggedIn;
  let button;
  if (isLoggedIn) {
    button = <LogoutButton onClick={this.handleLogoutClick} />;
  } else {
    button = <LoginButton onClick={this.handleLoginClick} />;
  }

  return (
    <div>
      <Greeting isLoggedIn={isLoggedIn} />
      {button}
    </div>
  );
}
