const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemonPage(limit = 24, offset = 0){
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText} during fetching the list of pokemons`);
      }
      return response.json();
}

export async function fetchPokemonDetails(pokemonName){
      const response = await fetch(`${BASE_URL}/pokemon/${pokemonName}`);
      if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText} during fetching the details of pokemon ${pokemonName}`);
      }
      return response.json();
}

export async function fetchPokemonSpecies(pokemonName){
      const response = await fetch(`${BASE_URL}/pokemon-species/${pokemonName}`);
      if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText} during fetching the species of pokemon ${pokemonName}`);     
      }
      const data = await response.json();
      const entry = data.flavor_text_entries.find((e)=>e.language.name === 'fr') ||
            data.flavor_text_entries.find((e)=>e.language.name === 'en');
      return entry ? entry.flavor_text.replace(/\f|n/g, ' ') : '';
}

export async function fetchPokemonEvolutionChain(pokemonName){
      const speciesResponse = await fetch(`${BASE_URL}/pokemon-species/${pokemonName}`);
      if(!speciesResponse.ok){
            throw new Error(`Error ${speciesResponse.status}: ${speciesResponse.statusText} during fetching the species of pokemon ${pokemonName}`);     
      }
      const speciesData = await speciesResponse.json();
      const evolutionChainUrl = speciesData.evolution_chain.url;
      const evolutionResponse = await fetch(evolutionChainUrl);
      if(!evolutionResponse.ok){
            throw new Error(`Error ${evolutionResponse.status}: ${evolutionResponse.statusText} during fetching the evolution chain of pokemon ${pokemonName}`);     
      }
      return evolutionResponse.json();
}

export async function fetchPokemonTypes(){
      const response = await fetch(`${BASE_URL}/type`);
      if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText} during fetching the list of pokemon types`);
      }
      return response.json();
}

export async function fetchPokemonByType(typeName){
      const response = await fetch(`${BASE_URL}/type/${typeName}`);
      if(!response.ok){
            throw new Error(`Error ${response.status}: ${response.statusText} during fetching the list of pokemons of type ${typeName}`);
      }
      return response.json();
}

// FIX: these helpers are synchronous string operations, so they must NOT be async.
// Marking them async made them return Promises, which broke callers that used the
// returned value directly (e.g. spriteUrl(id) used as an <img src>).
export function extractPokemonIdFromUrl(url){
      const parts = url.split('/').filter(Boolean);
      return parts[parts.length - 1];
}

export function spriteUrl(pokemonId){
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
}

