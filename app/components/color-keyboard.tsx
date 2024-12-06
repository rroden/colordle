import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircle} from "@fortawesome/free-solid-svg-icons"
import { Color } from "./game-functionality";

interface ColorKeyboardProps {
    setNextColor: (color: Color) => void;
}

export default function ColorKeyboard({setNextColor}: ColorKeyboardProps) {
    const colors: { name: Color; className: string }[] = [
        { name: "Red", className: "text-red-500" },
        { name: "Orange", className: "text-orange-500" },
        { name: "Yellow", className: "text-yellow-500" },
        { name: "Green", className: "text-green-500" },
        { name: "Blue", className: "text-blue-500" },
        { name: "Purple", className: "text-purple-500" },
    ];

    return (
        <div className='grid grid-cols-3 col-start-4 gap-2 place-content-center border border-2 border-solid rounded-lg border-darkgrey py-4 px-8'>
            {colors.map((color) => (
                <a key={color.name} onClick={() => setNextColor(color.name)}>
                    <FontAwesomeIcon
                        icon={faCircle}
                        className={`text-5xl lg:text-6xl ${color.className}`}
                    />
                </a>
            ))}
        </div>
    );
}