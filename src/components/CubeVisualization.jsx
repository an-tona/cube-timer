import React from 'react';
import '../index.css';
import { useSelector } from 'react-redux';

const colors = ['w', 'o', 'g', 'r', 'b', 'y'];

const generateColorOrder = (scramble = '') => {
    const cube = {
        faces: 'ULFRBD',
        moves: {
            U: [22, 21, 20, 14, 13, 12, 38, 37, 36, 30, 29, 28],
            L: [40, 47, 46, 36, 35, 34, 0, 7, 6, 16, 23, 22],
            F: [46, 45, 44, 12, 11, 10, 2, 1, 0, 24, 31, 30],
            R: [44, 43, 42, 20, 19, 18, 4, 3, 2, 32, 39, 38],
            B: [42, 41, 40, 28, 27, 26, 6, 5, 4, 8, 15, 14],
            D: [34, 33, 32, 10, 9, 8, 18, 17, 16, 26, 25, 24]
        },
        state: 'wwwwwwwwooooooooggggggggrrrrrrrrbbbbbbbbyyyyyyyy',
        twist: function(state, move) {
            const face = move.charAt(0);
            const faceIndex = cube.faces.indexOf(face);
            const turns = move.length > 1 ? (move.charAt(1) === "2" ? 2 : 3) : 1;
            let prevState;
			state = state.split("");
            for (let i = 0; i < turns; i++) {
                prevState = state.slice(0);

                for (let k = 0; k < 8; k++) {
					state[(faceIndex * 8) + k] = prevState[(faceIndex * 8) + ((k + 2) % 8)];
				}
                for (let k = 0; k < 12; k++) {
					state[cube.moves[face][k]] = prevState[cube.moves[face][(k + 9) % 12]];
				}
			}
            return state.join("");
        } 
    }

    if(!scramble) {
        return cube.state;
    }

    const scrambleArr = scramble.toUpperCase().split(' ');
    scrambleArr.forEach(move => {
        cube.state = cube.twist(cube.state, move);
    });
    
    return cube.state;
}

// Конвертуємо порядок кольорів в зручний для HTML формат та додаємо центри
const createCorrectColorOrder = (cubeState, colors) => { 
    const faceColors = cubeState.match(/.{1,8}/g); 
    const indexMapping = [6, 5, 4, 7, 3, 0, 1, 2, 8];

    return faceColors.map((item, index) => {
        const chars = item.split('');
        const newChars = Array(chars.length);
        indexMapping.forEach((newIndex, oldIndex) => {
            newChars[oldIndex] = chars[newIndex];
        });

        const reorderedFace = newChars.join('');
        const color = colors[index % colors.length];
        return reorderedFace.slice(0, 4) + color + reorderedFace.slice(4);
    });
};


const SingleFaceVisualization = ({ colorOrder }) => {
    const colorArr = colorOrder.split('');
    const colorsCSS = [
        'bg-white',
        'bg-orange-500',
        'bg-green-500',
        'bg-red-500',
        'bg-blue-500',
        'bg-yellow-500'
    ];

    return (
        <div className="face-visualization">
            {colorArr.map((color, index) => (
                <div
                    key={index}
                    className={`inner-item ${colorsCSS[colors.indexOf(color)]}`}
                >
                </div>
            ))}
        </div>
    );
}


export const CubeVisualization = () => { //пізніше потрібно буде передавати scramble як параметр
    const scramble = useSelector(state => state.stopwatch.solve.scramble);

    const cubeState = generateColorOrder(scramble);
    const finalColorOrder = createCorrectColorOrder(cubeState, colors);

  return (

    <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-start-2 aspect-square">
            <SingleFaceVisualization colorOrder={finalColorOrder[0]}/>
        </div>
        <div></div>
        <div></div>

        <div className="aspect-square">
            <SingleFaceVisualization colorOrder={finalColorOrder[1]}/>
        </div>
        <div className="aspect-square">
            <SingleFaceVisualization colorOrder={finalColorOrder[2]}/>
        </div>
        <div className="aspect-square">
            <SingleFaceVisualization colorOrder={finalColorOrder[3]}/>
        </div>
        <div className="aspect-square">
            <SingleFaceVisualization colorOrder={finalColorOrder[4]}/>
        </div>

        <div></div>
        <div className="col-start-2 aspect-square">
            <SingleFaceVisualization colorOrder={finalColorOrder[5]}/>
        </div>
        <div></div>
        <div></div>
    </div>
  )
}