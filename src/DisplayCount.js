import React from 'react';
import { useRecoilValue } from 'recoil';
import { counterState } from './counterState';

export const DisplayCount = () => {
  const clicksData = useRecoilValue(counterState);

  return <h2>Number of clicks is {clicksData.length}.</h2>;
};
