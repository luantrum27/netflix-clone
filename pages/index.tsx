import type { NextPage, NextPageContext } from 'next'
import { getSession } from 'next-auth/react'
import Billboard from '../components/Billboard';
import MovieList from '../components/MovieList';
import Navbar from '../components/Navbar';
import useMovieList from '../hooks/useMovieList';
import useFavorites from '../hooks/useFavorites';

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanet: false,
      }
    }
  }
  return {
    props: {}
  }
}

const Home: NextPage = () => {
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  return (
    <>
      <Navbar />
      <Billboard />
      <div className='pb-40'>
        <MovieList title="Trending now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  )

}

export default Home
