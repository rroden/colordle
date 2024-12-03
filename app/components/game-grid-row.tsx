'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquare as solidSquare } from "@fortawesome/free-solid-svg-icons";
import { Guess, Solution } from "./game-functionality";

interface GameGridRowProps {
    guess: Guess | Solution;
}

export default function GameGridRow({guess}: GameGridRowProps) {
    return (
        <div className="grid grid-row grid-rows-1 gap-2 row-start-1 place-self-center">
        {Object.entries(guess).map(([i, color]) => {
            let iconClass: string = "text-3xl lg:text-5xl row-start-1 "
            let iconColor: string = color != undefined ? `text-${color.toLowerCase()}-500` : "text-mygrey"
            let iconType = color != undefined ? solidSquare : faSquare
            iconClass += iconColor
            return <FontAwesomeIcon key={i} icon={iconType} className={iconClass} />
        })}
        </div>)
}