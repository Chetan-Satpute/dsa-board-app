import {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import LinearProgress from '@mui/material/LinearProgress';

function SomethingWentWrong() {
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
      <Alert severity="error" variant="outlined" className="gap-2">
        <AlertTitle>Oops!</AlertTitle>
        <p>
          We encountered an issue. We'll take you back to our homepage in a
          moment.
        </p>
        <LinearProgress variant="determinate" value={progress} />
      </Alert>
    </div>
  );
}

export default SomethingWentWrong;
