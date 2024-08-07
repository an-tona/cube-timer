import React from 'react';
import '../index.css';
import { Scramble } from './scrambleGenerator';

const colors = ['w', 'o', 'g', 'r', 'b', 'y'];

const generateColorOrder = (scramble = "D2 F2 R2 L2 U2 R2 L2 U2 F' D' B R' F' L2 R U B2 U' L R' U B' F' R B") => {
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

    const scrambleArr = scramble.split(' ');
    scrambleArr.forEach(move => {
        cube.state = cube.twist(cube.state, move);
    });
    
    return cube.state;
}

const InnerGrid = ({ colorOrderForOneFace }) => {
    const colorArr = colorOrderForOneFace.split('');
    const colorsCSS = [
        'bg-white',
        'bg-orange-500',
        'bg-green-500',
        'bg-red-500',
        'bg-blue-500',
        'bg-yellow-500'
    ];

    return (
        <div className="inner-grid">
            {colorArr.map((color, index) => (
                <div
                    key={index}
                    className={`inner-item ${colorsCSS[colors.indexOf(color)]}`}
                >
                    {/* Можна відобразити колір або індекс для налагодження */}
                </div>
            ))}
        </div>
    );
}

const createCorrectColorOrder = (array) => {

    const indexMapping = [6, 5, 4, 7, 3, 0, 1, 2, 8];
    
    return array.map(item => {
        const chars = item.split('');
        const newChars = Array(chars.length);
        indexMapping.forEach((newIndex, oldIndex) => {
            newChars[oldIndex] = chars[newIndex];
        });
        return newChars.join('');
    });
};




export const ScrambleVisualization = () => {

    const cubeState = generateColorOrder();
    const faceColors = cubeState.match(/.{1,8}/g);

    const colorOrderWithoutCenters = createCorrectColorOrder(faceColors);

    const finalColorOrder = colorOrderWithoutCenters.map((order, index) => {
        const color = colors[index % colors.length];
        return order.slice(0, 4) + color + order.slice(4);
    });
    console.log('finalColorOrder',finalColorOrder);
    console.log('test', createCorrectColorOrder(['012345678']));



  return (

    <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-start-2 aspect-square">
            <InnerGrid colorOrderForOneFace={finalColorOrder[0]}/>
        </div>
        <div></div>
        <div></div>

        <div className="aspect-square">
            <InnerGrid colorOrderForOneFace={finalColorOrder[1]}/>
        </div>
        <div className="aspect-square">
            <InnerGrid colorOrderForOneFace={finalColorOrder[2]}/>
        </div>
        <div className="aspect-square">
            <InnerGrid colorOrderForOneFace={finalColorOrder[3]}/>
        </div>
        <div className="aspect-square">
            <InnerGrid colorOrderForOneFace={finalColorOrder[4]}/>
        </div>

        <div></div>
        <div className="col-start-2 aspect-square">
            <InnerGrid colorOrderForOneFace={finalColorOrder[5]}/>
        </div>
        <div></div>
        <div></div>
    </div>
  )
}
