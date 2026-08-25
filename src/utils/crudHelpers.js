// src/utils/crudHelpers.js

export const addItem = (items, newItem) => {
  return [...items, newItem];
};

export const getItemById = (items, id) => {
  return items.find(item => item.id === id);
};

export const updateItem = (items, updatedItem) => {
  return items.map(item => item.id === updatedItem.id ? updatedItem : item);
};

export const deleteItem = (items, id) => {
  return items.filter(item => item.id !== id);
};

export const searchItems = (items, query) => {
  return items.filter(item => item.name.includes(query));
};