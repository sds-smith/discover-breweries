import React from "react";
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div style={{width: 'fit-content', backgroundColor: 'yellow', border: '5px solid black'}}>{text}</div>;

const BreweryMap = ({lat, lng, name}) => {
  const defaultProps = {
    center: {
      lat,
      lng
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '50vh', width: '50vw' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={lat}
          lng={lng}
          text={name}
        />
      </GoogleMapReact>
    </div>
  );
}

export default BreweryMap