import { useState } from "react";

// для опционального использования стоит добавить ? - onClickCategory?:
type CategoriesProps = {
    categoryId: number;
    onClickCategory: (i: number) => void;
    getCategories?: (categories: string[]) => void;
};

const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые"
];

const Categories: React.FC<CategoriesProps> = ({ categoryId, onClickCategory, getCategories }) => {
    //если такой ф-ции не будет то всё что справа от нее не будет вызвано ( ?. )
    // getCategories?.(categories);

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