import { writable, get } from 'svelte/store'
import loader from '@beyonk/async-script-loader'

export const mapsApiLoaded = writable(false)
export const mapsApiKey = 'AIzaSyB1avAIKbPYgmPlB7wjE_twtYc3u2OEiMc'
export const locations = writable({ start: null, destination: null })

// Hold the route in a separate store to the journey. The routefinder service is called in response to
// changes in the journey store, so if we write the route inside the journey store we trigger a loop.
// Using a separate store avoids this.
export const journey = writable({route: null, isReturn: false, depart: null, return: null})
export const uiStage = writable('locations')

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
  },

  getFormattedAddress: (addressComponents) => {
    let address = ''
    addressComponents.forEach(component => {
      const type = component.types[0]
      switch (type) {
        case "street_number": {
          address += component.long_name
          break
        }
        case "route": {
          address += ' ' + component.long_name
          break
        }
        case "postal_town": {
          address += ', ' + component.long_name
          break
        }
        case "postal_code": {
          address += ', ' + component.long_name
          break
        }
      }      
    })
    return address

  },

  getFormattedDate: (dateToFormat) => {
    let date = new Date(dateToFormat)
    return date.toLocaleDateString("en-GB", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  }

}

export const mapStyles = [
  {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#6195a0"
          }
      ]
  },
  {
      "featureType": "administrative.province",
      "elementType": "geometry.stroke",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
          {
              "lightness": "0"
          },
          {
              "saturation": "0"
          },
          {
              "color": "#f5f5f2"
          },
          {
              "gamma": "1"
          }
      ]
  },
  {
      "featureType": "landscape.man_made",
      "elementType": "all",
      "stylers": [
          {
              "lightness": "-3"
          },
          {
              "gamma": "1.00"
          }
      ]
  },
  {
      "featureType": "landscape.natural.terrain",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "poi.park",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#bae5ce"
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
          {
              "saturation": -100
          },
          {
              "lightness": 45
          },
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#fac9a9"
          },
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "elementType": "labels.text",
      "stylers": [
          {
              "color": "#4e4e4e"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#787878"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "transit.station.airport",
      "elementType": "labels.icon",
      "stylers": [
          {
              "hue": "#0a00ff"
          },
          {
              "saturation": "-77"
          },
          {
              "gamma": "0.57"
          },
          {
              "lightness": "0"
          }
      ]
  },
  {
      "featureType": "transit.station.rail",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "color": "#43321e"
          }
      ]
  },
  {
      "featureType": "transit.station.rail",
      "elementType": "labels.icon",
      "stylers": [
          {
              "hue": "#ff6c00"
          },
          {
              "lightness": "4"
          },
          {
              "gamma": "0.75"
          },
          {
              "saturation": "-68"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
          {
              "color": "#eaf6f8"
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
          {
              "color": "#c7eced"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
          {
              "lightness": "-49"
          },
          {
              "saturation": "-53"
          },
          {
              "gamma": "0.79"
          }
      ]
  }
]