import { writable, get } from 'svelte/store'
import loader from '@beyonk/async-script-loader'

export const mapsApiLoaded = writable(false)
export const mapsApiKey = 'AIzaSyB1avAIKbPYgmPlB7wjE_twtYc3u2OEiMc'
export const journey = writable({ start: null, destination: null, returnJourney: false })

// Hold the route in a separate store to the journey. The routefinder service is called in response to
// changes in the journey store, so if we write the route inside the journey store we trigger a loop.
// Using a separate store avoids this.
export const route = writable(null)

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
    if (!get(mapsApiLoaded)) {
      // Use the async loader to create a callback function, load the API, then remove the callback function (we don't need it)
      const url = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB1avAIKbPYgmPlB7wjE_twtYc3u2OEiMc&libraries=places&callback=mapsApiReady'      
      loader([ { type: 'script', url } ], test, callback)
      window.mapsApiReady = () => {
        mapsApiLoaded.update( () => true)
        delete window.mapsApiReady
      }
    }

  },

  createMarker: (map, lat, lng, title) => {

    if (map) {
      new google.maps.Marker({
        position: new google.maps.LatLng(lat, lng),
        map: map,
        title: title
      })
    }

  },

 createRoute: async (map, start, destination) => {  
    let directionsService = new google.maps.DirectionsService()
    let directionsRenderer = new google.maps.DirectionsRenderer()
    directionsRenderer.setMap(map)
    let request = {
      origin: new google.maps.LatLng(start.geometry.location.lat(), start.geometry.location.lng()),
      destination:  new google.maps.LatLng(destination.geometry.location.lat(), destination.geometry.location.lng()),
      travelMode: google.maps.TravelMode['DRIVING']
    }
    let route
    await directionsService.route(request, function(directionsResult, status) {      
      if (status == 'OK' && directionsResult.routes) {
        directionsRenderer.setDirections(directionsResult)
        route = directionsResult.routes[0].legs[0]
      }
    })

    return route 
  }

}