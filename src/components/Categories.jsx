import { useState } from "react";


function Categories({ categoryId, onClickCategory }) {

    const categories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые"
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((category, i) => (
                    <li
                        key={i}
                        className={categoryId === i ? "active" : ""}
                        onClick={() => onClickCategory(i)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { Categories };