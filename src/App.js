import React, {useEffect, useRef, useState} from "react";
import arrayMove from "array-move";

import SortableList from "./Components/Sortable/SortableList/SortableList";
import PointsMap from "./Components/Map/PointsMap";
import CityForm from "./Components/Forms/cityForm";
import "./styles/styles.scss"

const App = () => {
    const [state, changeState] = useState({
        referencePoints: [],
        referer: 'ui',
        ymaps: null,
        route: null
    });
    const mapRef = useRef(null);
    const {referencePoints, referer, ymaps, route} = state;

    const onSortEnd = ({oldIndex, newIndex}) => {
        changeState(state => ({
            ...state,
            referencePoints: arrayMove(state.referencePoints, oldIndex, newIndex),
            referer: 'ui'
        }));
    };

    const addRoute = (ref, route, referencePoints) => {
        if (ref.current) {
            if (route) {
                ref.current.geoObjects.remove(route);
            }

            const multiRoute = new ymaps.multiRouter.MultiRoute({
                referencePoints
            }, {
                editorMidPointsType: 'via',
                editorDrawOver: false,
            });

            multiRoute.editor.start();

            multiRoute.model.events.add('requestsuccess', () => {
                const wayPoints = multiRoute.getWayPoints();
                let geocoders = [];


                wayPoints.each(point => {
                    ymaps.geoObject.addon.balloon.get(point);
                    const coords = point.geometry.getCoordinates();

                    const geocoder = ymaps.geocode(coords);
                    geocoders.push(geocoder);

                    geocoder.then(res => {
                        const description = res.geoObjects.get(0).properties.get('description');

                        point.options.set({
                            balloonContentLayout: ymaps.templateLayoutFactory.createClass(description)
                        });
                    })
                });

                Promise.all(geocoders).then(values => {
                    const {coords, points} = values.reduce((acc, val) => {
                        const geoObject = val.geoObjects.get(0);
                        const coords = geoObject.geometry.getCoordinates();
                        const description = geoObject.properties.get('description');

                        acc.coords.push(coords);
                        acc.points.push(description);
                        return acc;
                    }, {coords: [], points: []});

                    changeState(state => ({
                        ...state,
                        referencePoints: points,
                        referer: 'map'
                    }));

                    ref.current.setCenter(coords[coords.length - 1]);
                })
            });

            ref.current.geoObjects.add(multiRoute);

            changeState(state => ({
                ...state,
                route: multiRoute
            }));
        }
    };

    const removeCity = value => {
        changeState(state => ({
            ...state,
            referencePoints: state.referencePoints.filter(point => point !== value),
            referer: 'ui'
        }));
    };

    useEffect(() => {
        if (referer === 'map') return;
        addRoute(mapRef, route, referencePoints);
    }, [referencePoints]);

    return (
        <>
            <div className="scene">
                <div className="user-actions">
                    <CityForm ymaps={ymaps} changeStateFunc={changeState}/>
                    <SortableList items={referencePoints} removeFunc={value => removeCity(value)} onSortEnd={onSortEnd}/>
                </div>
                <PointsMap mapRef={mapRef} changeStateFunc={changeState}/>
            </div>
        </>
    )
};

export default App;
