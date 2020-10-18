import React from "react";
import {SortableElement} from "react-sortable-hoc";
import "./styles.scss";

const SortableItem = ({value, children}) => (
    <li className="sortable-list-item">
        {value}
        {children}
    </li>
);

export default SortableElement(SortableItem);