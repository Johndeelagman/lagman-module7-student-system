import { test, expect } from 'vitest';
import { addItem } from './app.js';

test("Trims string prior to validation check", () => {
  const newItem = { name: "   " };

  expect(() => addItem(newItem)).toThrow(
    "Name cannot be empty or contain only spaces"
  );
});