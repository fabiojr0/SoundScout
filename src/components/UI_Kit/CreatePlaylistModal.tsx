import { useEffect, useRef, useState } from 'react';
import { useMutateCreatePlaylist } from '../../hooks/playlist/useMutateCreatePlaylist';
import { useUserData } from '../../hooks/useUserData';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { Check, X } from '@phosphor-icons/react';

type PlaylistInfo = {
  name: string;
  description: string;
  public: boolean;
};

function CreatePlaylistModal({
  uris,
  name,
  description,
  setShowModal,
}: {
  uris: string[];
  name: string;
  description: string;
  setShowModal: (show: boolean) => void;
}) {
  const { data: user } = useUserData();
  const { mutate } = useMutateCreatePlaylist();

  const modalRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo>({
    name: '',
    description: '',
    public: false,
  });

  const [isVisible, setIsVisible] = useState(false); // Estado para controlar a visibilidade do modal

  useEffect(() => {
    setPlaylistInfo({ name, description, public: false });
    setIsVisible(true); // Ativar a visibilidade do modal quando ele for montado
  }, []);

  const handleCreatePlaylist = () => {
    mutate(
      {
        user_id: user?.data.id || '',
        uris,
        ...playlistInfo,
      },
      { onSuccess: playlist_id => navigate(`/playlist/${playlist_id}`) }
    );
  };

  const verifyClick = (target: EventTarget) => {
    if (modalRef.current && !modalRef.current.contains(target as Node)) {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setShowModal(false), 300);
  };

  if (!user) {
    return null;
  }

  return (
    <div
      className={`fixed w-screen h-screen flex justify-center items-center z-50 top-0 left-0 p-4 bg-black/50 transform transition-transform ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
      onClick={e => verifyClick(e.target)}
    >
      <div className="bg-black p-4 rounded-lg space-y-4 border-2 border-darkGreen w-full max-w-96" ref={modalRef}>
        <div className="flex items-start">
          <div>
            <h1 className="text-2xl font-bold">Create Playlist</h1>
            <p className="text-gray-400">Create a new playlist based on your top tracks</p>
          </div>
          <button onClick={closeModal}>
            <X size={24} weight="regular" />
          </button>
        </div>
        <label className="flex flex-col gap-2 font-semibold cursor-pointer" htmlFor="name">
          Name
          <input
            type="text"
            placeholder="Name"
            value={playlistInfo.name}
            onChange={e => setPlaylistInfo({ ...playlistInfo, name: e.target.value })}
            className="bg-blackfy border-2 border-zinc-400 rounded-lg text-white px-4 py-2 hover:border-white cursor-text transition"
            id="name"
          />
        </label>

        <label className="flex flex-col gap-2 font-semibold cursor-pointer" htmlFor="description">
          Description
          <textarea
            placeholder="Description"
            value={playlistInfo.description}
            onChange={e => setPlaylistInfo({ ...playlistInfo, description: e.target.value })}
            className="bg-blackfy border-2 border-zinc-400 rounded-lg text-white px-4 py-2 hover:border-white cursor-text transition"
            id="description"
          />
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={playlistInfo.public}
            onChange={e => setPlaylistInfo({ ...playlistInfo, public: e.target.checked })}
            className="sr-only"
          />
          <div
            className={`w-6 h-6 flex justify-center items-center rounded ${playlistInfo.public ? 'bg-lightGreen' : 'bg-gray-100'} border-2 border-gray-300`}
          >
            {playlistInfo.public && <Check size={24} color="white" />}{' '}
          </div>
          Public
        </label>

        <Button onClick={handleCreatePlaylist}>Salvar</Button>
      </div>
    </div>
  );
}

export default CreatePlaylistModal;
