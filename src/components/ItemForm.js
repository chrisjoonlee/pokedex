import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editItem, createItem } from '../store/items';

const ItemForm = ({ itemId, pokemonId, hideForm }) => {
  const dispatch = useDispatch();

  // Receive the item from the store if there's an itemId
  let item;
  if (itemId) {
    useSelector(state => state.items[itemId]);
  }

  // States
  const [happiness, setHappiness] = useState(item ? item.happiness : 0);
  const [name, setName] = useState(item ? item.name : '');
  const [price, setPrice] = useState(item ? item.price : 0);

  const updateName = (e) => setName(e.target.value);
  const updateHappiness = (e) => setHappiness(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...item,
      name,
      happiness,
      price
    };

    let returnedItem;
    if (item) {
      returnedItem = dispatch(editItem(payload));
    }
    else {
      console.log("ItemForm pokemonId", pokemonId);
      returnedItem = dispatch(createItem(pokemonId, payload));
    }

    if (returnedItem) {
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className="edit-form-holder centered middled">
      <form className="item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName}
        />
        <input
          type="number"
          placeholder="Happiness"
          min="0"
          max="100"
          required
          value={happiness}
          onChange={updateHappiness}
        />
        <input
          type="number"
          placeholder="Price"
          required
          value={price}
          onChange={updatePrice}
        />
        {item && <button
          type="submit">
          Update Item
        </button>}
        {!item && <button
          type="submit">
          Create Item
        </button>}
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default ItemForm;