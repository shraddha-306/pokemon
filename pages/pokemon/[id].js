import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';

const POKEMON_QUERY = gql`
  query Pokemon($id: String!) {
    pokemon(id: $id) {
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
      evolutions {
        id
        name
        number
        image
        types
      }
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

export default function PokemonPage() {
  const router = useRouter();
  const { id } = router.query;
  const [showEvolutions, setShowEvolutions] = useState(false);

  const { loading, error, data } = useQuery(POKEMON_QUERY, {
    variables: { id },
    skip: !id,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemon = data?.pokemon;
  if (!pokemon) return null;

  const toggleEvolutions = () => {
    setShowEvolutions(!showEvolutions);
  };

  const types = pokemon.types.map((type, index) => (
    <div key={index} className={`type ${type.toLowerCase()}`}>
      {type}
    </div>
  ));

  const weaknesses = pokemon.weaknesses.map((weakness, index) => (
    <div key={index} className={`weakness ${weakness.toLowerCase()}`}>
      {weakness}
    </div>
  ));

  const resistant = pokemon.resistant.map((resist, index) => (
    <div key={index} className={`resist ${resist.toLowerCase()}`}>
      {resist}
    </div>
  ));
  return (
    <div className="pokemon-detail">
        <div className="pokemon-header">{pokemon.name} <span className="pokemon-number">#{pokemon.number}</span>
        </div>
        <div className="pokemon-body">
            <div className='pokemon-core'>
                <div className="pokemon-image">
                    <img src={pokemon.image} alt={pokemon.name} />
                </div>
                <div className="pokemon-info">
                    <div className="pokemon-types">
                        <h2 className="info-title">Types</h2>
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
                    <div className="pokemon-weaknesses">
                        <h2 className="info-title">Weaknesses</h2>
                        <div className="weaknesses-container">
                            {pokemon.weaknesses.map((weakness) => (
                                <span
                                    key={weakness}
                                    className="weakness"
                                    style={{ backgroundColor: typeColors[weakness], color: typeTextColors[weakness] }}
                                >
                                {weakness}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="pokemon-resistant">
                        <h2 className="info-title">Resistant</h2>
                        <div className="resistant-container">
                            {pokemon.resistant.map((resistance) => (
                                <span
                                    key={resistance}
                                    className="resistant"
                                    style={{ backgroundColor: typeColors[resistance], color: typeTextColors[resistance] }}
                                >
                                {resistance}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="pokemon-physical">
                        <h2 className="info-title">Physical Characteristics</h2>
                        <div className="pokemon-physical-container">
                            <div className="pokemon-weight">
                                <h3 className="physical-title">Weight</h3>
                                <p className="physical-value">
                                    {pokemon.weight.minimum} - {pokemon.weight.maximum}
                                </p>
                            </div>
                            <div className="pokemon-height">
                                <h3 className="physical-title">Height</h3>
                                <p className="physical-value">
                                    {pokemon.height.minimum} - {pokemon.height.maximum}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="pokemon-stats">
                        <h2 className="info-title">Stats</h2>
                        <div className="pokemon-stats-container flex justify-between">
                            <div className="pokemon-flee-rate" style={{display:"block"}}>
                                <h3 className="stats-title">Flee Rate</h3>
                                <p className="stats-value text-center">{pokemon.fleeRate}</p>
                            </div>
                            <div className="pokemon-max-cp" style={{display:"block"}}>
                                <h3 className="stats-title">Max CP</h3>
                                <p className="stats-value text-center">{pokemon.maxCP}</p>
                            </div>
                            <div className="pokemon-max-hp" style={{display:"block"}}>
                                <h3 className="stats-title">Max HP</h3>
                                <p className="stats-value text-center">{pokemon.maxHP}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pokemon-evolutions" style={{ backgroundColor: typeColors[pokemon.types[0]] }}>
                <h2 className="info-title">Evolutions</h2>
                    {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
                        <div className="evolutions-container">
                            <div className="evolution-container" key={pokemon.id}>
                                <Link href={`/pokemon/${pokemon.id}`}>
                                    <img src={pokemon.image} alt={pokemon.name} />
                                    <p className="name text-xl font-bold">{pokemon.name}<span className='number'> #{pokemon.number}</span></p>
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
                                </Link>
                            </div>
                            <MdKeyboardArrowRight className='arrowIcon' />
                            {pokemon.evolutions.map((evolution, index) => (
                            <><div className="evolution-container" key={evolution.id}>
                                    <Link href={`/pokemon/${evolution.id}`}>
                                        <img src={evolution.image} alt={evolution.name} />
                                        <p className="name text-xl font-bold">{evolution.name}<span className='number'> #{evolution.number}</span></p>
                                        <div className="types-container">
                                            {evolution.types.map((type) => (
                                                <span
                                                    key={type}
                                                    className="type"
                                                    style={{ backgroundColor: typeColors[type], color: typeTextColors[type] }}
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </Link>
                                </div>{index !== pokemon.evolutions.length - 1 && <MdKeyboardArrowRight className='arrowIcon' />}</>
                            ))}
                        </div>
                    ) : (
                    <p className="no-evolutions">This Pokemon does not have any evolutions.</p>
                    )}
            </div>
        </div>
    </div>
  );
}  