import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRainbow, faCircleInfo, faCircle, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { Tooltip } from "@mui/material";
import Modal from "./components/modal";

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function Home({ searchParams }: SearchParamProps) {

  const params = await searchParams;

  return (
    <div className="grid grid-rows-8 min-h-screen bg-darkgrey pb-20 font-[family-name:var(--font-geist-sans)]">
      <main>
      {params?.show && <Modal />}
      <div className="grid grid-cols-8 bg-mygrey p-4 static top-0 row-start-1">
        <FontAwesomeIcon icon={faRainbow} className="place-self-start self-center col-span-6 text-3xl" />
        <Tooltip title="How to play" className="place-self-end px-4 self-center text-3xl" arrow>
          <a href="/?show=true"><FontAwesomeIcon data-tooltip-target="info-tooltip" icon={faCircleInfo}/></a>
        </Tooltip>
        <a className="place-self-center rounded-lg border border-solid border-transparent transition-colors bg-darkgrey text-mygrey gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] py-2 px-4 sm:px-5">New Game</a>
      </div>
      <div className="bg-darkgrey flex flex-col place-items-center p-4 row-start-2 row-span-7">
        <h1 className="pt-16 text-mygrey text-4xl font-bold">Colordle</h1>
        <h2 className="text-mygrey text-xl pt-2">Guess the color pattern</h2>
        <div className="grid grid-row grid-rows-1 gap-2 pt-8">
          <FontAwesomeIcon icon={faSquare} className="text-3xl text-mygrey row-start-1" />
          <FontAwesomeIcon icon={faSquare} className="text-3xl text-mygrey row-start-1" />
          <FontAwesomeIcon icon={faSquare} className="text-3xl text-mygrey row-start-1" />
          <FontAwesomeIcon icon={faSquare} className="text-3xl text-mygrey row-start-1" />
        </div>
        <div>
          <FontAwesomeIcon icon={faCircle} className="text-3xl text-red-500" />
          <FontAwesomeIcon icon={faCircle} className="text-3xl text-orange-500" />
          <FontAwesomeIcon icon={faCircle} className="text-3xl text-yellow-500" />
          <FontAwesomeIcon icon={faCircle} className="text-3xl text-green-500" />
          <FontAwesomeIcon icon={faCircle} className="text-3xl text-blue-500" />
          <FontAwesomeIcon icon={faCircle} className="text-3xl text-purple-500" />
          <a className='bg-mygrey rounded py-2 px-4'><FontAwesomeIcon icon={faDeleteLeft} className='text-xl'/></a>
          <a className='bg-mygrey rounded p-4 text-darkgrey'>Guess</a>
        </div>
      </div>
      </main>
    </div>
  );
}
