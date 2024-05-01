import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';

interface NotFoundProps {
  target: string;
}

function NotFound(props: NotFoundProps) {
  const {target} = props;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }

        return Math.min(oldProgress + 1, 100);
      });
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (progress === 100) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-start gap-5 p-4">
      <Alert severity="warning" variant="outlined" className="gap-2">
        <AlertTitle>
          {target[0].toUpperCase() + target.slice(1)} Unavailable!
        </AlertTitle>
        <p>
          The requested {target} seems unavailable. We'll redirect you back to
          the home screen.
        </p>
        <LinearProgress variant="determinate" value={progress} />
      </Alert>
    </div>
  );
}

export default NotFound;
