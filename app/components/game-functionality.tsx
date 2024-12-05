'use client'

import GameGrid from "./game-grid";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCircleInfo, faDeleteLeft, faRainbow } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Alert, Tooltip } from "@mui/material";
import CongratulationsModal from "./congratulations-modal";
import SorryModal from "./sorry-modal";

export type Guess = [Color | undefined, Color | undefined, Color | undefined, Color | undefined]

type Color = "Red" | "Orange" | "Green" | "Blue" | "Yellow" | "Purple";
export type Solution = [Color, Color, Color, Color]
export type Hint = [number, number]

function getRandomItem<T>(array: T[]): T {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function createRandomSolution(): Solution {
    const colors: Color[] = ["Red", "Orange", "Green", "Blue", "Yellow", "Purple"];
    return [getRandomItem(colors), getRandomItem(colors), getRandomItem(colors), getRandomItem(colors)];
}

const defaultGuess: Guess = [undefined, undefined, undefined, undefined];
const defaultGuessList: Guess[] = [];
const defaultHint: Hint[] = []
export default function GameFunctionality() {

    const [currentGuess, setCurrentGuess] = useState<Guess>(defaultGuess);
    const [showAlert, setShowAlert] = useState(false);
    const [showSorryModal, setShowSorryModal] = useState(false);
    const [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
    const [solution, setSolution] = useState(createRandomSolution())
    const [turn, setTurn] = useState<number>(1)
    const [guesses, setGuesses] = useState(defaultGuessList);
    const [hints, setHints] = useState<Hint[]>(defaultHint)
    const [gameOver, setGameOver] = useState(false)

    console.log(`The solution is ${solution}`)
    console.log(`Current Guesses are ${currentGuess}`)

    function setNextColor(color: Color): void {
        setCurrentGuess((p) => {
            const updatedGuess: Guess = [...p];
            for (let i = 0; i < updatedGuess.length; i++) {
                if (currentGuess[i] === undefined) {
                    updatedGuess[i] = color;
                    break;
                }
            }
            return updatedGuess;
        });
    }

    function handleSorryModalClose(): void {
        setShowSorryModal(false)
    }

    function handleCongratulationsModalClose(): void {
        setShowCongratulationsModal(false)
    }

    function undoLastColor(): void {
        if (gameOver){
            return
        }
        setCurrentGuess((p) => {
            const updatedGuess: Guess = [...p]
            for (let i = 3; i >= 0; i--){
                if (updatedGuess[i] != undefined){
                    updatedGuess[i] = undefined                    
                    break;
                }
            }
            return updatedGuess;
        })
    }

    function startNewGame(): void {
        setTurn(1);
        setCurrentGuess(defaultGuess);
        setGuesses(defaultGuessList);
        setHints(defaultHint)
        setSolution(createRandomSolution());
    }

    function updateGuesses(): void {
        setGuesses(previousState => 
            {
                return [...previousState, currentGuess];
            }
        )
    }


    function submitGuess(): void {
        if (gameOver){
            return
        }
        let completeGuess = true;
        for (const color of Object.keys(currentGuess)){
            if (currentGuess[color as keyof Solution] === undefined){
                setShowAlert(true);
                completeGuess = false;
                setTimeout(() => {
                    setShowAlert(false)
                }, 3000)
                break;
            }
        }
        if (completeGuess === true) { 
            if (JSON.stringify(Object.values(currentGuess)) == JSON.stringify(solution)){
                setShowCongratulationsModal(true)  
                setGameOver(true)
            }
            else {
                setTurn(turn + 1)
                console.log(`Turn is ${turn}`)

                if (turn === 10){
                    setShowSorryModal(true)
                }
                else {
                    updateGuesses()
                    setCurrentGuess(defaultGuess)

                    const correct: Color[] = []
                    const correctIndexes: number[] = []
                    // Get yellow number
                    const partlyCorrect: Color[] = []

                    solution.map((color, i) => {
                        if (currentGuess[i] == color){
                            console.log(`${color} is correctly placed`)
                            correct.push(color)
                            correctIndexes.push(i)
                        }
                    })

                    const guessWithoutCorrect = Array.from(currentGuess)
                    // console.log(`correctIndexes: ${correctIndexes}`)
                    correctIndexes.sort((a, b) => b - a).forEach((i) => {guessWithoutCorrect.splice(i, 1)})

                    console.log(`guessWithoutCorrect: ${guessWithoutCorrect}`)

                    const solutionWithoutCorrect = Array.from(solution)
                    console.log(`correctIndexes: ${correctIndexes}`)
                    correctIndexes.sort((a, b) => b - a).forEach((i) => {solutionWithoutCorrect.splice(i, 1)})
                    console.log(`solutionWithoutCorrect: ${solutionWithoutCorrect}`)

                    solutionWithoutCorrect.forEach((color) => { 
                        if (guessWithoutCorrect.includes(color)){
                            console.log(`Solution: ${solution}`) // Yellow,Green,Green,Blue
                            const matchingColors = solutionWithoutCorrect.filter((x) => x == color)
                            const matchingColorsInPartlyCorrect = partlyCorrect.filter((x) => x == color)
                            const matchingColorsInGuess = guessWithoutCorrect.filter((x) => x == color)

                            console.log(`Number of color ${color} in solution: ${matchingColors.length}`) // 2
                            console.log(`Number of already matching ${color}: ${matchingColorsInPartlyCorrect.length}`) // 0
                            console.log(`Number of color ${color} in guess: ${matchingColorsInGuess}`) // 4

                            if (matchingColorsInGuess.length > (matchingColorsInPartlyCorrect.length)) {
                                console.log(`${color} is incorrectly placed`)
                                partlyCorrect.push(color)
                            }
                        }})

                    setHints(previousState => {
                            return [... previousState, [correct.length, partlyCorrect.length]]
                        }
                    )
                }
            }
        }
    }

    return (
    <>
        {showCongratulationsModal && <CongratulationsModal handleModalClose={handleCongratulationsModalClose} turns={turn}/>}
        {showSorryModal && <SorryModal solution={solution} startNewGame={startNewGame} handleModalClose={handleSorryModalClose}/>}
        <div className="grid grid-cols-8 bg-mygrey p-4 static">
          <FontAwesomeIcon icon={faRainbow} className="place-self-start self-center col-span-6 text-3xl lg:text-4xl text-darkgrey" />
          <Tooltip title="How to play" className="place-self-end px-4 self-center text-3xl lg:text-4xl" arrow>
            <a href="/?show=true"><FontAwesomeIcon data-tooltip-target="info-tooltip" icon={faCircleInfo} className='text-darkgrey'/></a>
          </Tooltip>
          <a onClick={() => startNewGame()} className="cursor-pointer place-self-center rounded-lg border border-solid border-transparent transition-colors bg-darkgrey text-mygrey gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] py-2 px-4 sm:px-5">New Game</a>
        </div>
        <div className="bg-darkgrey flex flex-col place-items-center p-4 grow">
          <h1 className="pt-16 text-mygrey text-4xl lg:text-5xl font-bold">Colordle</h1>
          <h2 className="text-mygrey text-xl lg:text-2xl pt-2 pb-8">Guess the color pattern</h2>
          {guesses.length > 0 && guesses.map((g, i) => <GameGrid key={i} guess={g} hints={hints[i]}></GameGrid>)}
          <GameGrid guess={currentGuess} hints={undefined}/>
          {showAlert && <Alert className="mt-4" severity="error">Not enough colors</Alert> }
        </div>
        <div className='bg-mygrey pt-16 pb-24 flex flex-row justify-center align-end gap-8'>
            <div className='grid grid-cols-3 col-start-4 gap-2 place-content-center border border-solid rounded-lg border-darkgrey py-4 px-8'>
                <a onClick={() => setNextColor("Red")}><FontAwesomeIcon icon={faCircle} className="text-5xl lg:text-6xl text-red-500" /></a>
                <a onClick={() => setNextColor("Orange")}><FontAwesomeIcon icon={faCircle} className="text-5xl lg:text-6xl text-orange-500" /></a>
                <a onClick={() => setNextColor("Yellow")}><FontAwesomeIcon icon={faCircle} className="text-5xl lg:text-6xl text-yellow-500" /></a>
                <a onClick={() => setNextColor("Green")}><FontAwesomeIcon icon={faCircle} className="text-5xl lg:text-6xl text-green-500" /></a>
                <a onClick={() => setNextColor("Blue")}><FontAwesomeIcon icon={faCircle} className="text-5xl lg:text-6xl text-blue-500" /></a>
                <a onClick={() => setNextColor("Purple")}><FontAwesomeIcon icon={faCircle} className="text-5xl lg:text-6xl text-purple-500" /></a>
            </div>
            <div className='flex flex-col place-content-around'>
                <button onClick={() => undoLastColor()}className='bg-mygrey rounded cursor-pointer py-2 px-6 outline self-center outline-2 outline-darkgrey'><FontAwesomeIcon icon={faDeleteLeft} className='text-2xl text-darkgrey self-center'/></button>
                <button onClick={() => submitGuess()} className='rounded-lg cursor-pointer border border-solid border-transparent transition-colors bg-darkgrey text-mygrey hover:bg-[#383838] dark:hover:bg-[#ccc] py-4 px-6 sm:px-5 text-xl'>Guess</button>
            </div>
        </div>
    </>)
}