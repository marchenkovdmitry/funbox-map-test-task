import React from "react";
import {Field, Form, Formik} from "formik";
import "./styles.scss";

const CityForm = ({ymaps, changeStateFunc}) => (
    <Formik
        validate={({city}) => {
            return ymaps.geocode(city).then(res => {
                    if (!res.metaData.geocoder.found) {
                        return {
                            city: 'Такого города нет. Попробуйте ввести другой.'
                        }
                    }
                }, err => {
                    console.error(err);
                    return {
                        city:  'Произошла непредвиденная ошибка, попробуйте еще раз.'
                    }
                }
            );
        }}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{city: ""}}
        onSubmit={({city}, {resetForm}) => {
            changeStateFunc(state => ({
                ...state,
                referencePoints: [...state.referencePoints, ...[city]],
                referer: 'ui'
            }));
            resetForm();
        }}
    >
        {({errors}) => (
            <Form className="city-form">
                <div className="city-form__field">
                    <label htmlFor="city">Город</label>
                    <Field id={"city"} name="city" type="text" placeholder={"Введите город и нажмите enter"}/>
                    {errors && <p className="city-form__error-message">{errors.city}</p>}
                </div>
            </Form>
        )}
    </Formik>
);

export default CityForm;