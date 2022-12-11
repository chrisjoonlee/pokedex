import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getItems, deleteItem } from '../store/items';

const PokemonItems = ({ pokemon, setEditItemId }) => {
  const dispatch = useDispatch();
  console.log("Loading PokemonItems component");
  if (pokemon) console.log("Pokemon id", pokemon.id);

  useEffect(() => {
    console.log("Dispatching getItems thunk");
    dispatch(getItems(pokemon.id));
    console.log("id", pokemon.id);
  }, [pokemon.id]);

  const items = useSelector((state) => {
    if (!pokemon.items) return null;
    return pokemon.items.map(itemId => state.items[itemId]);
  });

  if (!items) {
    return null;
  }

  const handleDeleteItemClick = async (e, itemId) => {
    e.preventDefault();

    dispatch(deleteItem(itemId, pokemon.id));
  }

  return items.map((item) => (
    <tr key={item.id}>
      <td>
        <img
          className="item-image"
          alt={item.imageUrl}
          src={`${item.imageUrl}`}
        />
      </td>
      <td>{item.name}</td>
      <td className="centered">{item.happiness}</td>
      <td className="centered">${item.price}</td>
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => setEditItemId(item.id)}>
            Edit
          </button>
        </td>
      )}
      {pokemon.captured && (
        <td className="centered">
          <button onClick={e => handleDeleteItemClick(e, item.id)}>
            Delete
          </button>
        </td>

      )}
    </tr>
  ));
};

export default PokemonItems;