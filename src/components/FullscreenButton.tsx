import {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import FullscreenRounded from '@mui/icons-material/FullscreenRounded';
import FullscreenExitRounded from '@mui/icons-material/FullscreenExitRounded';
import IconButton from '@mui/material/IconButton';

interface FullscreenButtonProps {
  long?: boolean;
}

function FullScreenButton(props: FullscreenButtonProps) {
  const {long = false} = props;

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const eventHandler = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    eventHandler();
    document.addEventListener('fullscreenchange', eventHandler);

    return () => document.removeEventListener('fullscreenchange', eventHandler);
  }, []);

  if (!document.fullscreenEnabled) {
    return null;
  }

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.body.requestFullscreen();
    }
  };

  if (long) {
    return (
      <Button className="gap-2" variant="outlined" onClick={toggleFullscreen}>
        {isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        {isFullscreen ? <FullscreenExitRounded /> : <FullscreenRounded />}
      </Button>
    );
  }

  return (
    <IconButton onClick={toggleFullscreen}>
      {isFullscreen ? <FullscreenExitRounded /> : <FullscreenRounded />}
    </IconButton>
  );
}

export default FullScreenButton;
