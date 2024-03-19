import { ListPlus } from "@phosphor-icons/react";
import { msToMinSeconds } from "../utils/utils";
import Audio from "./Audio";
import { useInfos } from "../contexts/InfosContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function ShowTrack({ infos }: { infos?: Track }) {
  const infosContext = useInfos();

  const addToQueue = (uri: string) => {
    infosContext.addTrackToQueue(uri);
  };

  if (!infos) {
    return (
      <div>
        <SkeletonTheme
          baseColor="#585555"
          highlightColor="#444"
          width={"100%"}
          height={"100%"}
        >
          <div className="space-y-4">
            <Skeleton width={"100%"} className="aspect-square" />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </SkeletonTheme>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <img
        src={infos?.album.images[0].url}
        alt={`${infos?.name} cover`}
        className="w-full aspect-square object-cover rounded"
      />

      <span className="flex items-center justify-between">
        <p className="text-lg font-bold">{infos.name}</p>
        <p className="text-zinc-300 text-sm font-medium">
          {msToMinSeconds(infos.duration_ms)}
        </p>
      </span>

      <span className="flex items-center justify-between">
        <p className="text-sm text-zinc-300 font-medium line-clamp-1">
          {infos?.artists
            .slice(0, 3)
            .map((artist) => artist.name)
            .join(", ")}
          {infos.artists.length > 3 && "..."}
        </p>
        <a
          href={infos.external_urls.spotify}
          target="_blank"
          className="hover:scale-110 transition-all"
        >
          <img
            src="../../Spotify_Icon_RGB_Green.png"
            alt="Open in Spotify"
            className="min-h-[24px] min-w-[24px] w-6 h-6"
          />
        </a>
      </span>

      {infos.album.name !== infos.name && (
        <p className="text-sm text-zinc-300 font-medium">{infos.album.name}</p>
      )}

      <span className="flex items-center justify-between">
        <span className="flex items-start">
          <p className="font-semibold">Preview</p>
          <Audio src={infos.preview_url} />
        </span>
        <button
          onClick={() => addToQueue(infos.uri)}
          className="flex items-center gap-2"
        >
          <p>Add To Queue</p>
          <ListPlus size={24} color="#ffffff" weight="fill" />
        </button>
      </span>
    </div>
  );
}

export default ShowTrack;