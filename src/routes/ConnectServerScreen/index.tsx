import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import Card from '@mui/material/Card';
import {CardContent, LinearProgress, Typography} from '@mui/material';
import {useQuery} from '@tanstack/react-query';

import {getCheckConnection} from '$api/getCheckConnection';

function ConnectServerScreen() {
  const [showOutlet, setShowOutlet] = useState(false);

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ['server-connection'],
    queryFn: getCheckConnection,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (isError) {
      refetch();
    }

    if (!isLoading && data) {
      timeout = setTimeout(() => setShowOutlet(true), 2000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [refetch, isError, isLoading, data]);

  if (showOutlet) return <Outlet />;

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card>
        <LinearProgress />
        <CardContent className="flex flex-col gap-5">
          <Typography variant="h5" className="text-center !font-bold">
            App Startup
          </Typography>
          <Typography
            variant="body2"
            className="text-center !font-kalam !text-xl"
          >
            We're currently starting up the app to ensure everything is ready.
            <br />
            This initial process might take a minute.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default ConnectServerScreen;
