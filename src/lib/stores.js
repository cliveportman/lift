import { writable, get } from 'svelte/store'
import loader from '@beyonk/async-script-loader'

export const mapsApiLoaded = writable(false)
export const mapsApiKey = 'AIzaSyB1avAIKbPYgmPlB7wjE_twtYc3u2OEiMc'
export const journey = writable({ start: null, destination: null, returnJourney: false })

function test () {
  //return !!window.google
}

function callback () {
  //console.log('Google Maps API loaded')
}

export const Utilities = {

  subscribe: mapsApiLoaded.subscribe,
  
  loadGoogleMapsApi: () => {

    // Check the API isn't loaded already to avoid the multiple times on page warning during dev
    console.log(get(mapsApiLoaded))
    if (!get(mapsApiLoaded)) {
      // Use the async loader to create a callback function, load the API, then remove the callback function (we don't need it)
      const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1avAIKbPYgmPlB7wjE_twtYc3u2OEiMc&libraries=places&callback=mapsApiReady'      
      loader([ { type: 'script', url } ], test, callback)
      window.mapsApiReady = () => {
        mapsApiLoaded.update( () => true)
        delete window.mapsApiReady
      }
    }

  }

}