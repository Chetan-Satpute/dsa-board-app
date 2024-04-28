import {useParams} from 'react-router-dom';

import SomethingWentWrong from '$components/SomethingWentWrong';
import StructureScreenContent from './components/StructureScreenContent';

function StructureScreen() {
  const {structureId} = useParams();

  if (!structureId) {
    return <SomethingWentWrong />;
  }

  return (
    <div className="flex h-screen w-screen min-w-0">
      <StructureScreenContent structureId={structureId} />
    </div>
  );
}

export default StructureScreen;
