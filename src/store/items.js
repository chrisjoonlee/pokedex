export const LOAD_ITEMS = "items/LOAD_ITEMS";
export const UPDATE_ITEM = "items/UPDATE_ITEM";
export const REMOVE_ITEM = "items/REMOVE_ITEM";
export const ADD_ITEM = "items/ADD_ITEM";

const load = (items, pokemonId) => ({
  type: LOAD_ITEMS,
  items,
  pokemonId
});

const update = (item) => ({
  type: UPDATE_ITEM,
  item
});

const add = (item) => ({
  type: ADD_ITEM,
  item
});

const remove = (itemId, pokemonId) => ({
  type: REMOVE_ITEM,
  itemId,
  pokemonId
});

export const getItems = pokemonId => async dispatch => {
  const response = await fetch(`/api/pokemon/${pokemonId}/items`);

  if (response.ok) {
    const items = await response.json();
    console.log(items);
    dispatch(load(items, pokemonId));
  }
};

export const editItem = payload => async dispatch => {
  const response = await fetch(`/api/items/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const item = await response.json();
    dispatch(update(item));
  }
}

export const createItem = (pokemonId, payload) => async dispatch => {
  console.log("Creating item")
  console.log("pokemonId", pokemonId);
  const response = await fetch(`/api/pokemon/${pokemonId}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  if (response.ok) {
    const item = await response.json();
    console.log("Item", item);
    dispatch(add(item));
  }
}

export const deleteItem = (itemId, pokemonId) => async dispatch => {
  const response = await fetch(`/api/items/${itemId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    dispatch(remove(itemId, pokemonId));
  }
}

const initialState = {};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEMS:
      const newItems = {};
      action.items.forEach(item => {
        newItems[item.id] = item;
      })
      return {
        ...state,
        ...newItems
      }
    case REMOVE_ITEM:
      const newState = { ...state };
      delete newState[action.itemId];
      return newState;
    case ADD_ITEM:
    case UPDATE_ITEM:
      return {
        ...state,
        [action.item.id]: action.item
      };
    default:
      return state;
  }
};

export default itemsReducer;