import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const FullPizza = () => {
    const [dataPizza, setDataPizza] = useState();
    const { id } = useParams();

    useEffect(() => {
        async function fetchOnePizza() {
            try {
                const { data } = await axios.get(`https://6522c167f43b17938414dc2d.mockapi.io/items/${id}`);
                setDataPizza(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchOnePizza();
        console.log(dataPizza);
    }, []);

    if (!dataPizza) {
        return (
            <div className="container">
                <h2>Загрузка...</h2>
            </div>
        );
    }

    return (
        <div className="container">
            <img src={dataPizza.imageUrl} alt="pizza" />
            <h2>{dataPizza.title}</h2>
            <h4>{dataPizza.price}</h4>
        </div>
    )
}

export { FullPizza }