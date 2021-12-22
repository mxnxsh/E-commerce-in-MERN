import React from 'react'
import { GoogleMap, LoadScript } from "../../node_modules/@react-google-maps/api/dist/index"
import LoadingBox from "../components/LoadingBox"

const MapScreen = () => {
    return googleApiKey ? <div className="full-conatiner">
        <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
            <GoogleMap id=></GoogleMap>
        </LoadScript>
    </div>:<LoadingBox/>
}

export default MapScreen
