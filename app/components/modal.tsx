import { faSquare, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal() {

    
    return (
      <div className="fixed inset-0 bg-mygrey bg-opacity-40 overflow-y-auto h-full w-full flex items-center justify-center">
        <div className="p-6 w-96 shadow-lg rounded bg-darkgrey">
            {/* Navigates back to the base URL - closing the modal */}
            <div className="grid grid-row justify-items-end">
                <a href="/"><FontAwesomeIcon icon={faX} className="text-lg text-mygrey"/></a>
            </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-mygrey">How to Play Colordle</h3>
            <h5 className="text-mygrey font-light">Guess the Colordle in 10 tries.</h5>
            <div className="mt-2 px-7 py-3">
              <ul className="list-disc text-mygrey"><li>The answer is a pattern of four colors.</li></ul>
              <ul className="list-disc text-mygrey pb-4"><li>When you guess a pattern, a green number and yellow number will appear.</li></ul>
              <div className="flex flex-rows-1 place-items-center gap-2 px-16 pb-4">
                <FontAwesomeIcon icon={faSquare} className="text-3xl text-red-500 basis-1/5" />
                <FontAwesomeIcon icon={faSquare} className="text-3xl text-orange-500 basis-1/5" />
                <FontAwesomeIcon icon={faSquare} className="text-3xl text-green-500 basis-1/5" />
                <FontAwesomeIcon icon={faSquare} className="text-3xl text-purple-500 basis-1/5" />
                <div className="grid grid-cols-1 basis-1/5">
                    <p className="text-green-500">1</p>
                    <p className="text-yellow-500">1</p>
                </div>
              </div>
              <ul className="list-disc text-mygrey"><li>The <div className="text-green-500 inline">green</div> number signifies the number of correct 
              colors in the correct spots.</li></ul>
              <div className="flex flex-row">
              <ul className="list-disc text-mygrey"><li>The <div className="text-yellow-500 inline">yellow</div> number stands for the number of correct colors in the wrong spots.</li></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }