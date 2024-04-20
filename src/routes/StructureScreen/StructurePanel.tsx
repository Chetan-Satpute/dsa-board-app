import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';

function StructurePanel() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 items-center justify-center">
      <h1>Structure Panel</h1>
      <Button onClick={() => navigate('/array/algo')}>Algo Page</Button>
    </div>
  );
}

export default StructurePanel;
