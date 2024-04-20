import {useParams} from 'react-router-dom';

import SomethingWentWrong from '$components/SomethingWentWrong';
import StructureScreenContent from './components/StructureScreenContent';

function StructureScreen() {
  const {structureId} = useParams();

  if (!structureId) {
    return <SomethingWentWrong />;
  }

  return <StructureScreenContent structureId={structureId} />;
}

export default StructureScreen;
