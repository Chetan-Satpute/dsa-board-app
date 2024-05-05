import StructureCardSection from './components/StructureCardSection';

function HomeScreen() {
  return (
    <div className="flex h-screen w-screen flex-col gap-10 p-2">
      <div className="mt-20 flex flex-col justify-center text-center">
        <h1 className="font-marker text-3xl font-thin md:text-5xl">
          DSA Board
        </h1>
        <p className="font-kalam text-lg md:text-2xl">
          Interactive Exploration of Algorithms & Data Structures
        </p>
      </div>
      <StructureCardSection />
    </div>
  );
}

export default HomeScreen;
