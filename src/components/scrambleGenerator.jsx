export default function scrambleGenerator(reqScrambleLen = 25) {
	const cube = {
		faces: "DLBURF",
		scramble: function (reqScrambleLen) {
			let count = 0;
			const total = (reqScrambleLen !== undefined && typeof reqScrambleLen === "number" && reqScrambleLen > 0) ? reqScrambleLen : 25;
			const moves = [];
			const modifiers = ["", "'", "2"];
			while (count < total) {
				const move = cube.faces[Math.floor(Math.random() * 6)] + modifiers[Math.floor(Math.random() * 3)];
				if (count > 0 && move.charAt(0) === moves[count - 1].charAt(0)) {
					continue;
				}
				if (count > 1 && move.charAt(0) === moves[count - 2].charAt(0) &&
						moves[count - 1].charAt(0) === cube.faces.charAt((cube.faces.indexOf(move.charAt(0)) + 3) % 6)) {
					continue;
				}
				moves[count] = move;
				count++;
			}
			return moves.join(' ');
		}
	};
	return cube.scramble(reqScrambleLen);
}