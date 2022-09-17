import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useFetchSongsByGenreQuery } from '../redux/services/shazamCore';

const genres = [
  'POP',
  'HIP_HOP_RAP',
  'DANCE',
  'ELECTRONIC',
  'SOUL_RNB',
  'ALTERNATIVE',
  'ROCK',
  'LATIN',
  'FILM_TV',
  'COUNTRY',
  'AFRO_BEATS',
  'WORLDWIDE',
  'REGGAE_DANCE_HALL',
  'HOUSE',
  'K_POP',
  'FRENCH_POP',
  'SINGER_SONGWRITER',
  'REG_MEXICO',
];

const Home = () => {
  const dispatch = useDispatch();
  const { genreListId } = useSelector((state) => state.player);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useFetchSongsByGenreQuery(genreListId || 'POP');
  const location = useLocation();

  if (isFetching) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  const songs = location.pathname.startsWith('/search') ? data.map((song) => song.track) : data;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreListId || 'pop'}</h2>

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || 'pop'}
          className="bg-violet-400 text-white p-3 bg-gradient-to-tl from-white/10 to-[#483D8B] backdrop-blur-lg  rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option
              value={genre}
            >{genre}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {songs?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
