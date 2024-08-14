import React from 'react';
import { useDispatch } from 'react-redux';
import { stopwatchSlice } from "./slices/slices.jsx";

export default function ResetBtnTest() {
  const dispatch = useDispatch();

  const handleResetClick = () => {
    dispatch(stopwatchSlice.actions.resetSolveHistory());
  }

  return (
    <button onClick={handleResetClick}>Reset Solve History</button>
  );
}