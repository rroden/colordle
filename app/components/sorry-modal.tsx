import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Solution } from "./game-functionality";
import GameGridRow from "./game-grid-row";

interface SorryModalProps {
    solution: Solution;
    startNewGame: () => void;
    handleModalClose: () => void;
}

export default function SorryModal({solution, startNewGame, handleModalClose}: SorryModalProps) {

    function handleClose() {
        handleModalClose();
        startNewGame();
    }

    return (
      <div className="fixed inset-0 bg-mygrey bg-opacity-40 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-4 pb-16 w-96 shadow-lg rounded bg-darkgrey">
            {/* Navigates back to the base URL - closing the modal */}
            <div className="grid grid-row justify-items-end">
                <a onClick={() => handleModalClose()}><FontAwesomeIcon icon={faX} className="text-lg text-mygrey"/></a>
            </div>
          <div className="text-center flex flex-col gap-4 place-items-center">
            <div className="pb-8 flex flex-col gap-y-2">
                <h3 className="text-2xl font-bold text-mygrey py-2">Sorry, try again!</h3>
                <h5 className="text-mygrey font-light">The answer was:</h5>
                <GameGridRow guess={solution}/>
            </div>
            <a onClick={() => handleClose()} className='rounded-lg bg-mygrey text-darkgrey py-4 px-4 text-xl max-w-36'>New Game</a>
          </div>
        </div>
      </div>
    );
  }