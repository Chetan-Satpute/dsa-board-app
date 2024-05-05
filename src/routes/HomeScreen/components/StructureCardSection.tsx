import {useNavigate} from 'react-router-dom';
import {useQuery} from '@tanstack/react-query';

import getStructures from '$api/getStructures';
import Loading from '$components/Loading';
import SomethingWentWrong from '$components/SomethingWentWrong';
import StructureCard from '$components/StructureCard';

function StructureCardSection() {
  const navigate = useNavigate();

  const {data, isLoading, isError, refetch} = useQuery({
    queryKey: ['structures'],
    queryFn: getStructures,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <SomethingWentWrong onRetry={refetch} />;
  }

  const cards = data.structures.map(struct => (
    <StructureCard
      key={struct.id}
      title={struct.title}
      image={struct.image}
      onClick={() => navigate(`/${struct.id}`)}
    />
  ));

  return <div className="flex flex-wrap justify-center gap-10">{cards}</div>;
}

export default StructureCardSection;
