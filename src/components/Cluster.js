import React, {Component} from 'react'
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';

  const MapWithMarkerClusterer = () => {

    const mapContainerStyle = {
      height: '700px',
      width: '100%',
    }
    
    const center = { lat: 13.124675306010246, lng: 80.22714936695505 }
    
    const locations = [
     { lat: 12.875838416312234, lng: 79.08824598598022 },
     { lat: 12.947913602117358, lng: 79.15168794329743 },
     { lat: 12.925387031643568, lng: 79.18665732143575 },
     { lat: 13.124675306010246, lng: 80.22714936695505 }, 
     { lat: 13.115030746287935, lng: 80.29376489134263 }, 
     { lat: 13.085594741233072, lng: 80.21016142569326 }, 
     { lat: 13.069267783175627, lng: 80.19648401881865 }, 
     { lat: 12.981956986266031, lng: 80.22140255345934 }, 
     { lat: 12.955509252001109, lng: 80.18744302223384 }, 
   
    ]
  
    const options = {
      imagePath:
        'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
       
    }
  
    function createKey(location) {
      return location.lat + location.lng
    }

    return (
      <LoadScript googleMapsApiKey="AIzaSyCEKfd8JlcFwptKlBAVHeSqOpah1OSAZTY">
        <GoogleMap id='marker-example' mapContainerStyle={mapContainerStyle} zoom={3} center={center}>
          <MarkerClusterer options={options}>
            {(clusterer) =>
              locations.map((location) => (
                <Marker key={createKey(location)} position={location} clusterer={clusterer}  />
              )) 
            }
          </MarkerClusterer>
        </GoogleMap>
      </LoadScript>
    )
  }

  export default MapWithMarkerClusterer