import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Link from 'next/link';
import queryString from 'query-string';

const POKEMON_QUERY = gql`
  query Pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

const typeColors = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Electric: '#F7D02C',
  Grass: '#7AC74C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dragon: '#6F35FC',
  Dark: '#705746',
  Steel: '#B7B7CE',
  Fairy: '#D685AD',
};
const typeTextColors = {
    Normal: '#000',
    Fire: '#fff',
    Water: '#fff',
    Electric: '#000',
    Grass: '#fff',
    Ice: '#000',
    Fighting: '#fff',
    Poison: '#fff',
    Ground: '#fff',
    Flying: '#fff',
    Psychic: '#fff',
    Bug: '#fff',
    Rock: '#fff',
    Ghost: '#fff',
    Dragon: '#fff',
    Dark: '#fff',
    Steel: '#fff',
    Fairy: '#fff',
  };

export default function HomePage() {
    const { stringify, parse } = queryString;
    
    const router = useRouter();
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const { page } = queryString.parse(router.asPath.split(/\?/)[1]);
    if (page !== undefined) {
      setPageNumber(parseInt(page) - 1);
    }
  }, [router]);

  const { loading, error, data } = useQuery(POKEMON_QUERY, {
    variables: { first: 151 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { pokemons } = data;

  const pageCount = Math.ceil(pokemons.length / itemsPerPage);

  const displayPokemons = pokemons
    .slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage)
    .map((pokemon) => (
        <Link key={pokemon.id} href={`/pokemon/${pokemon.id}`}>
      <div key={pokemon.id} className="pokemon-container">
        <img src={pokemon.image} alt={pokemon.name} />
        <p className='number'>#0{pokemon.number}</p>
        <p className="name text-xl font-bold">{pokemon.name}</p>
        <div className="types-container">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="type"
              style={{ backgroundColor: typeColors[type], color: typeTextColors[type] }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
      </Link>
    ));

    const handlePageClick = ({ selected }) => {
        const newPageNumber = selected;
        const query = stringify({ page: newPageNumber + 1 });
        router.push({
          pathname: router.pathname,
          search: `?${query}`,
        });
        setPageNumber(newPageNumber);
      };

  return (
    <div>
      <div className="pokemon-grid">{displayPokemons}</div>
      <ReactPaginate
  previousLabel="Previous"
  nextLabel="Next"
  pageCount={pageCount}
  marginPagesDisplayed={2}
  pageRangeDisplayed={4}
  onPageChange={handlePageClick}
  containerClassName="pagination"
  activeClassName="active"
  forcePage={pageNumber}
/>
    </div>
  );
}
