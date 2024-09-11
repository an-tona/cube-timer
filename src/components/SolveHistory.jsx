import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import formatTime from "./functions/formatTime.jsx";
import TransitionsModal from './DialogContainer.jsx';
import { CubeVisualization } from './CubeVisualization.jsx';
import CopyScramble from './CopyScramble.jsx';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { stopwatchSlice } from './slices/slices.jsx';

function SolveHistory() {
    const solveHistory = useSelector(state => state.stopwatch.solveHistory);
    const dispatch = useDispatch();
    const [openModalIndex, setOpenModalIndex] = useState(null);

    const handleDeleteSolve = (index) => {
        dispatch(stopwatchSlice.actions.deleteSolve({ index }));
        setOpenModalIndex(null);
    };

    const handleOpenModal = (index) => {
        setOpenModalIndex(index);
    };

    const handleCloseModal = () => {
        setOpenModalIndex(null);
    };

    const solveTimeWithPenalty = (solve, isPreview) => {
        if (solve.isDNF) {
            return isPreview ? 'DNF' : `DNF(${formatTime(solve.solveTime)})`;
        } else if (solve.isPlus2) {
            return `${formatTime(solve.solveTime + 2000)}+`;
        } else {
            return formatTime(solve.solveTime);
        }
    };

    //штрафи
    const handlePlus2Click = (index) => {
        dispatch(stopwatchSlice.actions.togglePlus2({ index }));
    }

    const handleDNFClick = (index) => {
        dispatch(stopwatchSlice.actions.toggleDNF({ index }));
    }

    return (
        <div className="bg-blue-100 p-6 rounded-md max-w-full h-full">
            <div className="flex flex-wrap overflow-auto max-h-full hide-scrollbar">
                {solveHistory.map((solve, index) => (
                    <TransitionsModal 
                        key={index} 
                        buttonText={solveTimeWithPenalty(solve, true)}
                        open={openModalIndex === index}
                        handleOpen={() => handleOpenModal(index)}
                        handleClose={handleCloseModal}
                    >
                        <div className='flex flex-col justify-center items-center'>
                            <DeleteOutlineIcon 
                                className="cursor-pointer"
                                onClick={() => handleDeleteSolve(index)}
                            />
                            <h2 className='font-source-code-pro font-normal text-[50px]'>{solveTimeWithPenalty(solve)}</h2>
                            <div>
                                <span className="cursor-pointer"
                                onClick={() => handlePlus2Click(index)}
                                style={{ color: solve?.isPlus2 ? 'red' : 'black', transition: '200ms' }}
                                >
                                    +2
                                </span>
                                <span> | </span>
                                <span className="cursor-pointer"
                                onClick={() => handleDNFClick(index)}
                                style={{ color: solve?.isDNF ? 'red' : 'black', transition: '200ms' }}
                                >
                                    DNF
                                </span>
                            </div>
                            <div className='w-3/4'>
                                <CubeVisualization scramble={solve.scramble}/>
                            </div>
                            <p>{solve.scramble}</p>
                            <CopyScramble scramble={solve.scramble}/>
                        </div>
                    </TransitionsModal>
                ))}
            </div>
        </div>
    );
}

export default SolveHistory;