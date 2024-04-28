import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import SkipNextRounded from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRounded from '@mui/icons-material/SkipPreviousRounded';
import {StopRounded} from '@mui/icons-material';

import {useAppDispatch} from '$hooks/redux';
import {stopRunning, updateCurrentStep} from '$redux/rootSlice';

function RunControls() {
  const dispatch = useAppDispatch();

  const handlePrevious = () => {
    dispatch(updateCurrentStep(-1));
  };

  const handleStop = () => {
    dispatch(stopRunning());
  };

  const handleNext = () => {
    dispatch(updateCurrentStep(1));
  };

  return (
    <Card className="flex">
      <Button className="flex-1" onClick={handlePrevious}>
        <SkipPreviousRounded /> Previous
      </Button>
      <Button className="flex-1" color="error" onClick={handleStop}>
        Stop
        <StopRounded />
      </Button>
      <Button className="flex-1" onClick={handleNext}>
        Next <SkipNextRounded />
      </Button>
    </Card>
  );
}

export default RunControls;
