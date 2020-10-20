import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render } from '@testing-library/react';
import PointsMap from "../Components/Map/PointsMap";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test('renders PointsMap', () => {
    const {container} = render(<PointsMap/>);
    expect(container).toBeInTheDocument();
});