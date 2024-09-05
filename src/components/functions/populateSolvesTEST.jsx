import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { stopwatchSlice } from "../slices/slices.jsx";

function NumberInputForm() {
    const [number, setNumber] = useState(0);

    const dispatch = useDispatch();



    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for(let i = 0; i <= number; i++) {
            dispatch(stopwatchSlice.actions.saveSolve({scramble: null}));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-4">
            {/* Number input field */}
            <input
                type="number"
                value={number}
                onChange={handleChange}
                placeholder="Enter a number"
                className="border border-gray-300 rounded-md p-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            {/* Submit button */}
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Submit
            </button>
        </form>
    );
}

export default NumberInputForm;