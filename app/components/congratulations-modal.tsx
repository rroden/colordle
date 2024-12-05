import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useState } from "react";
import { Alert } from "@mui/material";

interface CongratulationsModalProps {
  handleModalClose: () => void;
  turns: number;
}

export default function CongratulationsModal({handleModalClose, turns}: CongratulationsModalProps) {

    const [showCopyAlert, setShowCopyAlert] = useState(false)

    function handleCopy(): void {
      setShowCopyAlert(true)
    }
    
    return (
      <div className="fixed inset-0 bg-mygrey bg-opacity-40 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-4 pb-16 w-96 shadow-lg rounded bg-darkgrey">
            {/* Navigates back to the base URL - closing the modal */}
            <div className="grid grid-row justify-items-end">
                <a onClick={() => handleModalClose()}><FontAwesomeIcon icon={faX} className="text-lg text-mygrey cursor-pointer"/></a>
            </div>
          <div className="text-center flex flex-col place-items-center gap-2">
            <div className="pb-4">
              <h3 className="text-2xl font-bold text-mygrey py-2">Congratulations!</h3>
              <h5 className="text-mygrey font-light">You won in {turns} guesses.</h5>
            </div>
            <CopyToClipboard text={`I beat Colordle in ${turns} guesses!`} onCopy={() => handleCopy()}>
              <button className='cursor-pointer rounded-lg bg-mygrey text-darkgrey py-4 px-6 sm:px-5 text-xl max-w-24'>Share</button>
            </CopyToClipboard>
            {showCopyAlert && <Alert className="mt-4">Results copied</Alert>}
          </div>
        </div>
      </div>
    );
  }