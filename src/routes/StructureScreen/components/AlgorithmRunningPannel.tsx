import {Card} from '@mui/material';

import CodeBlock from '$components/CodeBlock';
import RunControls from '$components/RunControls';
import {useAppSelector} from '$hooks/redux';
import {createStep} from '$lib/step';

interface AlgorithmRunningPannelProps {
  code: string;
}

function AlgorithmRunningPannel(props: AlgorithmRunningPannelProps) {
  const {code} = props;

  let step = useAppSelector(state => state.steps[state.currentStep]);

  if (!step) {
    step = createStep();
  }

  const stackItems = step.stack.map((signature, index) => (
    <CodeBlock key={index} text={signature} hlLines={index === 0 ? [0] : []} />
  ));

  const highlight = step.highlight;

  return (
    <>
      <RunControls />
      <Card className="flex-1 !overflow-auto font-ubuntu">
        <CodeBlock text={code} hlLines={highlight} />
      </Card>
      <Card className="h-1/6 !overflow-auto p-2 font-ubuntu">{stackItems}</Card>
    </>
  );
}

export default AlgorithmRunningPannel;
