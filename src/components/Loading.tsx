import {CircularProgress} from '@mui/material';

function Loading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <CircularProgress />
    </div>
  );
}

export default Loading;
