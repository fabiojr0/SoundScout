import FollowHeart from './FollowHeart';
import Audio from '../Audio';
import { Queue } from '@phosphor-icons/react';
import Tooltip from './Tooltip';
import { msToMinSeconds } from '../../utils/utils';

type FollowData = {
  follow: boolean;
  setFollow: (follow: boolean) => void;
  showTooltip: TooltipProps;
  handleFollow: (playlist_id: string) => void;
  id: string;
};

type TrackData = {
  preview_url: string;
  showTooltipQueue: TooltipProps;
  uri: string;
  addToQueue: (uri: string) => void;
};

function ShowInfos({
  title,
  subtitle,
  description,
  spotifyUrl,
  followData,
  trackData,
  duration_ms,
  followers,
}: {
  title: string;
  subtitle: string;
  description?: string;
  spotifyUrl: string;
  followData: FollowData;
  trackData?: TrackData;
  duration_ms?: number;
  followers?: number;
}) {
  return (
    <span className="flex items-center justify-between lg:w-full h-full lg:items-end">
      <span className="space-y-2 ">
        <p className="text-lg font-bold lg:text-5xl">{title}</p>
        <p className="text-zinc-300 text-sm font-medium lg:text-lg lg:font-normal">{subtitle}</p>
        {description && <p className="text-zinc-300 text-sm font-medium lg:text-lg lg:font-normal">{description}</p>}
        {trackData && (
          <span className="flex items-center gap-2">
            <p className="font-semibold text-white">Preview</p>
            <Audio src={trackData.preview_url} />
          </span>
        )}
      </span>
      <span className="flex flex-col items-end justify-between gap-2 h-full">
        <a href={spotifyUrl} target="_blank" className="hover:scale-110 transition-all">
          <img
            src="../../Spotify_Icon_RGB_Green.png"
            alt="Open in Spotify"
            className="min-h-[24px] min-w-[24px] w-6 h-6"
          />
        </a>
        <FollowHeart
          follow={followData.follow}
          message={followData.showTooltip.message}
          color={followData.showTooltip?.color}
          onClick={() => followData.handleFollow(followData.id)}
          followers={followers}
        />
        {duration_ms && <p className="text-zinc-300 text-sm font-medium">{msToMinSeconds(duration_ms)}</p>}
        {trackData && (
          <Tooltip message={trackData.showTooltipQueue.message} color={trackData.showTooltipQueue.color}>
            <button
              onClick={() => trackData.addToQueue(trackData.uri)}
              className="flex items-center gap-2 group active:text-lightGreen transition-all"
            >
              <p className="whitespace-nowrap ">Add To Queue</p>
              <Queue size={20} weight="fill" className="group-hover:scale-125 transition-all" />
            </button>
          </Tooltip>
        )}
      </span>
    </span>
  );
}

export default ShowInfos;
