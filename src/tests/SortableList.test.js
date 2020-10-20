import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SortableList from "../Components/Sortable/SortableList/SortableList";
import { render as testingRender } from '@testing-library/react';

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

it("SortableList renders with one city", () => {
    act(() => {
        render(<SortableList items={['Москва']} />, container);
    });

    expect(container.textContent).toBe("Москва");
});

it("SortableList renders with list of cities", () => {
    act(() => {
        render(<SortableList items={['Москва, Санкт-Петербург']} />, container);
    });

    expect(container.textContent).toBe("Москва, Санкт-Петербург");
});

test('renders SortableList', () => {
    const {container} = testingRender(<SortableList items={['Москва']}/>);
    const element = container.querySelector('.sortable-list');
    expect(element).toBeInTheDocument();
});