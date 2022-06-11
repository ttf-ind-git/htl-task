import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import {useLocation} from 'react-router-dom';

const InfoPage = (props) => {

  const location = useLocation();
    
  const [selectedElement, setSelectedElement] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [showInfoWindow, setInfoWindowFlag] = useState(true);

    console.log(location.state)

    const mapStyles = {
        width: '75%',
        height: '90%',
        margin: '30px',
    };

  return (
    <div>
      <Map
        google={props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat: location.state.lat, lng: location.state.lon}}
      >
       
            <Marker
              key={location.state.id}
              title={location.state.name}
              position={{lat: location.state.lat, lng: location.state.lon }}
              onClick={(props, marker) => {
                setSelectedElement(location.state);
                setActiveMarker(marker);
              }}
            />
       
        {selectedElement ? (
          <InfoWindow
            visible={showInfoWindow}
            marker={activeMarker}
            onCloseClick={() => {
              setSelectedElement(null);
            }}
          >
            <div>
              <h6>Name: {selectedElement.name}</h6>
              <h6>Email: {selectedElement.email}</h6>
            </div>
          </InfoWindow>
        ) : null}
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCEKfd8JlcFwptKlBAVHeSqOpah1OSAZTY"
})(InfoPage);

// AIzaSyCEKfd8JlcFwptKlBAVHeSqOpah1OSAZTY - demo
