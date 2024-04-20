import {useParams} from 'react-router-dom';

import SomethingWentWrong from '$components/SomethingWentWrong';
import StructurePaneContent from './components/StructurePaneContent';

function StructurePanel() {
  const {structureId} = useParams();

  if (!structureId) {
    return <SomethingWentWrong />;
  }

  return <StructurePaneContent structureId={structureId} />;
}

export default StructurePanel;
