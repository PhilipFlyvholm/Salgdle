
// Inpired by: https://github.com/dgvai/wordle-algorithm/blob/master/wordle.js
export function getBoxes(solution: number, guess: number): ('correct' | 'present' | 'absent')[] {
	const splitSolution = solution.toString().split('').reverse();
	const splitGuess = guess.toString().split('').reverse();
	console.log('splitSolution', splitSolution);
	console.log('splitGuess', splitGuess);
	
	const solutionCharsTaken = splitSolution.map(() => false);

	let statuses = Array.from(Array(Math.max(solution.toString().length, guess.toString().length)));
	for (let i = 0; i < splitGuess.length; i++) {
		const letter = splitGuess[i];
		console.log(letter, splitSolution[i]);
		
		if (letter === splitSolution[i]) {
			console.log('correct', i);
			
			statuses[i] = 'correct';
			solutionCharsTaken[i] = true;
		}
	}

	/*
       Absent Cases
      */

	for (let i = 0; i < splitGuess.length; i++) {
		const letter = splitGuess[i];
		if (statuses[i]) continue;

		if (!splitSolution.includes(letter)) {
			statuses[i] = 'absent';
			continue;
		}

		/*
        Present Cases
        */

		const indexOfPresentChar = splitSolution.findLastIndex(
			(x, index) => x === letter && !solutionCharsTaken[index]
		);

		if (indexOfPresentChar > -1) {
			statuses[i] = 'present';
			solutionCharsTaken[indexOfPresentChar] = true;
		} else {
			statuses[i] = 'absent';
		}
	}
	
	statuses = statuses.reverse();
	if (guess.toString().length < solution.toString().length) {
		statuses = statuses.slice(solution.toString().length - guess.toString().length);
	}

	return statuses;
}
