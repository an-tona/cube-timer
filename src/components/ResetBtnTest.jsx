import React from 'react';
import { useDispatch } from 'react-redux';
import { stopwatchSlice } from "./slices/slices.jsx";

export default function ResetBtnTest() {
  const dispatch = useDispatch();

  const handleResetClick = () => {
    dispatch(stopwatchSlice.actions.resetSolveHistory());
  }

  return (
    <button 
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      onClick={handleResetClick}
     >
      Reset Solve History
      </button>
  );
}