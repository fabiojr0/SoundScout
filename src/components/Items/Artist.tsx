import { useEffect, useState } from 'react';
import { useMutateFollowArtist } from '../../hooks/artist/useMutateFollowArtist';
import { capitalizeEachWord } from '../../utils/utils';
import SkeletonDefault from '../Skeleton/SkeletonDefault';
import ItemInfos from '../UI_Kit/ItemInfos';
import ItemImage from '../UI_Kit/ItemImage';
import FollowHeart from '../UI_Kit/FollowHeart';

function Artist({ infos, index }: { infos: Artist; index: number }) {
  const [showTooltip, setShowTooltip] = useState<TooltipProps>({ message: '' });
  const [follow, setFollow] = useState<boolean>(false);

  useEffect(() => {
    infos?.followed && setFollow(infos?.followed);
  }, [infos?.followed]);

  const { mutate: mutateFollow } = useMutateFollowArtist();

  const handleFollow = async (artist_id: string) => {
    mutateFollow({ artist_id, follow });

    setShowTooltip({
      message: !follow ? 'Followed' : 'Unfollowed',
      color: !follow ? '' : 'darkgreen',
    });

    setFollow(!follow);

    setTimeout(() => {
      setShowTooltip({ message: '' });
    }, 2000);
  };

  if (!infos) {
    return <SkeletonDefault index={index} />;
  }

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold min-w-7">{index}º</p>
        {infos.images && (
          <ItemImage image={infos.images[0].url} alt={`${infos.name} image`} link={`/Artist/${infos.id}`} />
        )}
        <ItemInfos
          title={infos.name}
          description={
            infos.genres
              ? `${capitalizeEachWord(
                  infos.genres
                    .slice(0, 3)
                    .map(genre => genre)
                    .join(', ')
                )}
          ${infos.genres.length > 3 ? '...' : ''}`
              : ''
          }
          spotifyUrl={infos.external_urls.spotify}
          redirectUrl={`/Artist/${infos.id}`}
        />
      </div>
      <div>
        <FollowHeart
          follow={follow}
          message={showTooltip.message}
          color={showTooltip?.color}
          onClick={() => handleFollow(infos.id)}
        />
      </div>
    </div>
  );
}

export default Artist;
