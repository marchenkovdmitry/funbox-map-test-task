import React from "react";
import {Map, YMaps} from "react-yandex-maps";
import {API_KEY} from "../../constants";

const PointsMap = ({mapRef, changeStateFunc}) => (
    <YMaps query={{apikey: API_KEY}}>
        <Map
            defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            width={700}
            height={500}
            modules={[
                "multiRouter.MultiRoute",
                "multiRouter.EditorAddon",
                "templateLayoutFactory",
                "coordSystem.geo",
                "geocode",
                "util.bounds",
                "geoObject.addon.balloon"
            ]}
            onLoad={(ymaps) => {
                changeStateFunc(state => ({
                    ...state,
                    ymaps
                }));
            }}
            instanceRef={(ref) => {
                if (ref) mapRef.current = ref;
            }}
        />
    </YMaps>
);

export default PointsMap;