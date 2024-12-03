'use client'

import { Guess, Hint, Solution } from "./game-functionality";
import GameGridRow from "./game-grid-row";

interface GameGridProps {
    guess: Guess | Solution;
    hints: Hint | undefined
}

export default function GameGrid({guess, hints}: GameGridProps) {
    return (
        <div className="grid grid-col grid-columns-2 pl-6">
        <GameGridRow guess={guess}></GameGridRow>
        <div className="row-start-1 pl-4 w-8 text-center">
        { hints && <div>
                        <p className="text-green-500">{hints[0]}</p>
                        <p className="text-yellow-500">{hints[1]}</p>
                    </div>
        }
        </div>  
    </div>)
}