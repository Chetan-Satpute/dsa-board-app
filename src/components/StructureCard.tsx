import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

interface StructureCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

function StructureCard(props: StructureCardProps) {
  const {title, image, onClick} = props;

  return (
    <Card className="!bg-none">
      <div className="overflow-auto p-1">
        <img src={image} />
      </div>
      <div>
        <Button variant="contained" className="w-full" onClick={onClick}>
          {title}
        </Button>
      </div>
    </Card>
  );
}

export default StructureCard;
