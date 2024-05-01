import {Button, Card} from '@mui/material';

interface StructureCardProps {
  title: string;
  image: string;
  onClick: () => void;
}

function StructureCard(props: StructureCardProps) {
  const {title, image, onClick} = props;

  return (
    <Card>
      <div className="p-1">
        <img src={image} />
      </div>
      <div>
        <Button
          variant="contained"
          className="w-full !rounded-t-none"
          onClick={onClick}
        >
          {title}
        </Button>
      </div>
    </Card>
  );
}

export default StructureCard;
