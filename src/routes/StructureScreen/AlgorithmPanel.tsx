import {useParams} from 'react-router-dom';

import AlgorithmPanelContent from './components/AlgorithmPanelContent';
import SomethingWentWrong from '$components/SomethingWentWrong';

function AlgorithmPanel() {
  const {structureId, algorithmId} = useParams();

  if (!structureId || !algorithmId) {
    return <SomethingWentWrong />;
  }

  return (
    <AlgorithmPanelContent
      structureId={structureId}
      algorithmId={algorithmId}
    />
  );
}

export default AlgorithmPanel;
