import Alert from '@mui/material/Alert';

import FullScreenButton from '$components/FullscreenButton';

import StructureCardSection from './components/StructureCardSection';

function HomeScreen() {
  return (
    <div className="flex h-screen w-screen flex-col gap-10 p-2">
      <div className="mt-20 flex flex-col items-center justify-center text-center">
        <h1 className="font-marker text-3xl font-thin md:text-5xl">
          DSA Board
        </h1>

        <p className="font-kalam text-lg md:text-2xl">
          Interactive Exploration of Algorithms & Data Structures
        </p>

        {document.fullscreenEnabled && (
          <div className="flex flex-col items-center justify-center">
            <Alert variant="outlined" severity="info">
              <p className="mb-2 mt-0">
                We recommend using fullscreen mode for best experience.
              </p>
              <FullScreenButton long />
            </Alert>
          </div>
        )}
      </div>

      <StructureCardSection />
    </div>
  );
}

export default HomeScreen;
