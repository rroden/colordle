import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CongratulationsModalProps {
  handleModalClose: () => void;
  turns: number;
}

export default function CongratulationsModal({handleModalClose, turns}: CongratulationsModalProps) {

    
    return (
      <div className="fixed inset-0 bg-mygrey bg-opacity-40 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-4 pb-16 w-96 shadow-lg rounded bg-darkgrey">
            {/* Navigates back to the base URL - closing the modal */}
            <div className="grid grid-row justify-items-end">
                <a onClick={() => handleModalClose()}><FontAwesomeIcon icon={faX} className="text-lg text-mygrey"/></a>
            </div>
          <div className="text-center flex flex-col place-items-center">
            <div className="pb-8">
              <h3 className="text-2xl font-bold text-mygrey py-2">Congratulations!</h3>
              <h5 className="text-mygrey font-light">You won in {turns} guesses.</h5>
            </div>
            <a onClick={() => (alert("Not implemented"))} className='rounded-lg bg-mygrey text-darkgrey py-4 px-6 sm:px-5 text-xl max-w-24'>Share</a>
          </div>
        </div>
      </div>
    );
  }