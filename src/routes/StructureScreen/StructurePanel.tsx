import Button from '@mui/material/Button';

import AlgorithmCard from '$components/AlgorithmCard';
import {AlgorithmParameterType} from '$lib/algorithm';

function StructurePanel() {
  return (
    <div className="flex flex-1 flex-col p-2">
      <h4 className="text-center">Modify Structure</h4>
      <AlgorithmCard
        id="replace-array"
        name="Replace Array"
        parameters={[
          {
            title: 'values',
            type: AlgorithmParameterType.NumberArray,
          },
        ]}
        animated={false}
      />
      <h4 className="text-center">Run Algorithm</h4>
      <Button variant="outlined" className="">
        Binary Search
      </Button>
    </div>
  );
}

export default StructurePanel;
