import GameFunctionality from './components/game-functionality';
import HowToPlayModal from './components/how-to-play-modal';

type SearchParamProps = {
  searchParams: Promise<Record<string, string> | null | undefined>;
};

export default async function Home({ searchParams }: SearchParamProps) {

  const params = await searchParams;

  return (
    <main>
      <div className="bg-darkgrey min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col">
        {params?.show && <HowToPlayModal />}
        <GameFunctionality/>
      </div>
    </main>
  );
}
