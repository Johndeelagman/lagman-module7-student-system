export function addItem(newItem) {
  // Validation patch: Reject empty/missing names or whitespace-only strings
  if (!newItem || !newItem.name || newItem.name.trim() === "") {
    throw new Error("Name cannot be empty or contain only spaces");
  }

  return newItem;
}