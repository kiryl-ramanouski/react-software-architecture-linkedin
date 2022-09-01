import React from 'react';

const One = () => {
  throw new Error();
  // eslint-disable-next-line no-unreachable
  return <h1>One</h1>;
};

export default One;
