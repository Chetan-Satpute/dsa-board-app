import {useParams} from 'react-router-dom';

import SomethingWentWrong from '$components/SomethingWentWrong';
import StructureScreenContent from './components/StructureScreenContent';

function StructureScreen() {
  const {structureId} = useParams();

  return (
    <div className="flex h-screen w-screen min-w-0">
      {structureId ? (
        <StructureScreenContent structureId={structureId} />
      ) : (
        <SomethingWentWrong />
      )}
    </div>
  );
}

export default StructureScreen;
