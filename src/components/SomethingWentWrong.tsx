import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';

interface SomethingWentWrongProps {
  onRetry?: () => void;
}

function SomethingWentWrong(props: SomethingWentWrongProps) {
  const {onRetry} = props;

  return (
    <div className="flex flex-1 flex-col items-center justify-start gap-5 p-4">
      <Alert severity="error" variant="outlined" className="gap-2">
        <AlertTitle>Oops!</AlertTitle>
        <p>
          There seems to be a temporary problem. Click Retry to refresh the
          connection.
        </p>

        {onRetry && (
          <Button className="float-right" onClick={onRetry}>
            Retry
          </Button>
        )}
      </Alert>
    </div>
  );
}

export default SomethingWentWrong;
