import React from "react";
import {SortableContainer} from "react-sortable-hoc";
import SortableItem from "../SortableItem/SortableItem";
import "./styles.scss";
import Remove from "../../UI/svg/Remove";

const SortableList = ({items, removeFunc}) => (
    <ul className="sortable-list">
        {items.map((value, index) => (
            <SortableItem index={index} value={value} key={`item-${value}-${index}`}>
                <button type={"button"} onClick={() => removeFunc(value)} title={`Удалить точку - ${value}`}>
                    <Remove/>
                </button>
            </SortableItem>
        ))}
    </ul>
);

export default SortableContainer(SortableList);