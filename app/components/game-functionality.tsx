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

let defaultGuess: Guess = [undefined, undefined, undefined, undefined];
let defaultGuessList: Guess[] = [];
let defaultHint: Hint[] = []
export default function GameFunctionality() {

    let [currentGuess, setCurrentGuess] = useState<Guess>(defaultGuess);
    let [showAlert, setShowAlert] = useState(false);
    let [showSorryModal, setShowSorryModal] = useState(false);
    let [showCongratulationsModal, setShowCongratulationsModal] = useState(false);
    let [solution, setSolution] = useState(createRandomSolution())
    let [turn, setTurn] = useState<number>(9)
    let [guesses, setGuesses] = useState(defaultGuessList);
    let [hints, setHints] = useState<Hint[]>(defaultHint)

    console.log(`The solution is ${solution}`)
    console.log(`Guesses are ${JSON.stringify(guesses)}`)
    console.log(`Current Guesses are ${currentGuess}`)

    function setNextColor(color: Color): void {
        console.log(`Color: ${color}`)
        setCurrentGuess((p) => {
            var updatedGuess: Guess = [...p];
            for (let i = 0; i < updatedGuess.length; i++) {
                if (currentGuess[i] === undefined) {
                    updatedGuess[i] = color;
                    console.log(`Updated guess: ${updatedGuess}`)
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
        setCurrentGuess((p) => {
            var updatedGuess: Guess = [...p]
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
        let completeGuess = true;
        for (let color of Object.keys(currentGuess)){
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
            }
            else {
                setTurn(turn + 1)
                console.log(`Turn is ${turn}`)

                if (turn === 10){
                    console.log("turn is 10")
                    setShowSorryModal(true)
                }
                else {
                    updateGuesses()
                    setCurrentGuess(defaultGuess)
                    // Get green number
                    var correctlyPlaced = 0
                    // Get yellow number
                    var incorrectlyPlaced = 0
                    for (let i = 0; i < solution.length; i++){
                        if (solution[i] == currentGuess[i]){
                            correctlyPlaced++
                        }
                        else if (solution.includes(currentGuess[i] as Color)){
                            incorrectlyPlaced++
                        }
                    }
                    setHints(previousState => {
                            return [... previousState, [correctlyPlaced, incorrectlyPlaced]]
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
          <a onClick={() => startNewGame()} className="place-self-center rounded-lg border border-solid border-transparent transition-colors bg-darkgrey text-mygrey gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] py-2 px-4 sm:px-5">New Game</a>
        </div>
        <div className="bg-darkgrey flex flex-col place-items-center p-4 grow">
          <h1 className="pt-16 text-mygrey text-4xl lg:text-5xl font-bold">Colordle</h1>
          <h2 className="text-mygrey text-xl lg:text-2xl pt-2 pb-8">Guess the color pattern</h2>
          {guesses.length > 0 && guesses.map((g, i) => <GameGrid key={i} guess={g} hints={hints[i]}></GameGrid>)}
          <GameGrid guess={currentGuess} hints={undefined}/>
          {showAlert && <Alert severity="error">Not enough colors</Alert> }
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
                <a onClick={() => undoLastColor()}className='bg-mygrey rounded py-2 px-6 outline self-center border border-solid border-darkgrey'><FontAwesomeIcon icon={faDeleteLeft} className='text-2xl text-darkgrey self-center'/></a>
                <a onClick={() => submitGuess()} className='rounded-lg border border-solid border-transparent transition-colors bg-darkgrey text-mygrey hover:bg-[#383838] dark:hover:bg-[#ccc] py-4 px-6 sm:px-5 text-xl'>Guess</a>
            </div>
        </div>
    </>)
}