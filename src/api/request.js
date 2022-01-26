const API_URL = 'https://pokeapi.co/api/v2' // API_URL from ENV VAR -- POSIBLE IMPROVEMENT 

// export async function getPokesRequest(limit, offset) { // params for query request -- POSIBLE IMPROVEMENT
export async function getPokesRequest() {
  const url = 'pokemon?limit=100&offset=200'
  let response = await fetch(`${API_URL}/${url}`, {
    method: 'get'
  })
  if (response.ok) {
    response = await response.json()
  } else {
    response = Promise.reject(response)
  }
  return response
}

export async function getPokesDetail(pokeDetailUrl) {
  let response = await fetch(`${pokeDetailUrl}`, {
    method: 'get'
  })
  if (response.ok) {
    response = await response.json()
  } else {
    response = Promise.reject(response)
  }
  return response
}