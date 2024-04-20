import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

function AlgorithmPanel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 items-center justify-center">
      <h1>Algorithm Panel</h1>
      <Button onClick={() => navigate('/array')}>Structure Page</Button>
    </div>
  );
}

export default AlgorithmPanel;
