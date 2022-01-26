<template>
  <div id="app">
    <div>
      <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png">
    </div>
    <div>
      <button
        :disabled="loading.isGettingPokeDetails"
        @click="onGetPokes()">
        <!-- get lang field from i18n pattern -- POSIBLE IMPROVEMENT -->
        {{ loading.isGettingPokeDetails ? 'Getting pokes...' : 'Get pokes' }}
      </button>
    </div>
    <div>
      <strong>pokesHeightAvg</strong>: {{ loading.isGettingPokeDetails ? 'Getting poke details...' : pokesHeightAvg }}
    </div>
    <div>
      <strong>pokesWeightAvg</strong>: {{ loading.isGettingPokeDetails ? 'Getting poke details...' : pokesWeightAvg }}
    </div>
    <table>
      <tr>
        <th style="min-width: 100px;">Name</th>
        <th style="min-width: 100px;">Abilities count</th>
        <th style="min-width: 100px;">Height</th>
        <th style="min-width: 100px;">Weight</th>
        <th style="min-width: 100px;">Abilities</th>
      </tr>
      <tr v-for="(poke, index) in pokes" :key="index">
        <td>
          {{ poke.name }}
        </td>
        <td v-if="loading.isGettingPokeDetails" colspan="4">
          Getting poke details...
        </td>
        <td v-if="!loading.isGettingPokeDetails">
          {{ poke.abilities.length }}
        </td>
        <td v-if="!loading.isGettingPokeDetails">
          {{ poke.height }}
        </td>
        <td v-if="!loading.isGettingPokeDetails">
          {{ poke.weight }}
        </td>
        <td v-if="!loading.isGettingPokeDetails">
          <span v-for="(ability, index) in poke.abilitiesDescription" :key="index">
              {{ ability.ability.name }}
          </span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getPokesRequest, getPokesDetail } from './api/request'

export default {
  name: 'PokeApi',
  components: {},
  data: () => ({
    pokesHeightAvg: 0,
    pokesWeightAvg: 0,
    pokes: [],
    loading: {
      isGettingPokes: false,
      isGettingPokeDetails: false
    }
  }),
  methods: {
    getPokes: async function() {
      let pokes = []
      try {
        const response = await getPokesRequest()
        if (Array.isArray(response.results)) {
          pokes = response.results
        }
      } catch (error) {
        console.log('GET_POKES_ERROR', error)
        // handle error to ERROR CODE PLATFORM TRACKER -- POSIBLE IMPROVEMENT
      }
      return pokes
    },
    onGetPokes: async function() {
      let heigh = 0
      let weight = 0
      this.loading.isGettingPokes = true
      this.loading.isGettingPokeDetails = true
      const pokes = await this.getPokes()
      this.loading.isGettingPokes = false
      if (Array.isArray(pokes)) {
        for await (let poke of pokes) {
            if (poke && poke.url) {
              const pokeDetail = await getPokesDetail(poke.url)
              if (pokeDetail.id) {
                const abilitiesDescriptions = pokeDetail.abilities.filter(ability => !ability.is_hidden)
                poke.abilities = pokeDetail.abilities
                poke.height = pokeDetail.height
                poke.weight = pokeDetail.weight
                poke.abilitiesDescription = abilitiesDescriptions
                heigh += pokeDetail.height
                weight += pokeDetail.weight
              }
            }
        }
        if (pokes.length !== 0) {
          this.pokesHeightAvg = (heigh / pokes.length)
          this.pokesWeightAvg = (weight / pokes.length)
        }
        this.pokes = [...pokes]
      }
      this.loading.isGettingPokeDetails = false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
