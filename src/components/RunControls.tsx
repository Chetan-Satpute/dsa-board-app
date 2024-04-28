import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import SkipNextRounded from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRounded from '@mui/icons-material/SkipPreviousRounded';
import {StopRounded} from '@mui/icons-material';

function RunControls() {
  return (
    <Card className="flex">
      <Button className="flex-1">
        <SkipPreviousRounded /> Previous
      </Button>
      <Button className="flex-1" color="error">
        Stop
        <StopRounded />
      </Button>
      <Button className="flex-1">
        Next <SkipNextRounded />
      </Button>
    </Card>
  );
}

export default RunControls;
