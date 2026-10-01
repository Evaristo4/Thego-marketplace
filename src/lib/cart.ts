export type CartItem = {
  id: string;
  name: string;
  seller: string;
  price: number;
  image: string;
  quantity: number;
};

const CART_STORAGE_KEY = "thego-cart";
const CART_CHANGE_EVENT = "thego-cart-change";
const EMPTY_CART: CartItem[] = [];
let cachedCart: CartItem[] | undefined;

export function readCart(): CartItem[] {
  try {
    const storedCart: unknown = JSON.parse(
      window.localStorage.getItem(CART_STORAGE_KEY) ?? "[]",
    );

    if (!Array.isArray(storedCart)) {
      return [];
    }

    return storedCart.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        typeof item.id === "string" &&
        "name" in item &&
        typeof item.name === "string" &&
        "seller" in item &&
        typeof item.seller === "string" &&
        "price" in item &&
        typeof item.price === "number" &&
        "image" in item &&
        typeof item.image === "string" &&
        "quantity" in item &&
        typeof item.quantity === "number" &&
        Number.isInteger(item.quantity) &&
        item.quantity > 0,
    );
  } catch {
    return [];
  }
}

export function writeCart(cart: CartItem[]) {
  cachedCart = cart;
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_CHANGE_EVENT));
}

export function subscribeToCart(callback: () => void) {
  function handleStorageChange() {
    cachedCart = undefined;
    callback();
  }

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(CART_CHANGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(CART_CHANGE_EVENT, callback);
  };
}

export function getCartSnapshot() {
  cachedCart ??= readCart();
  return cachedCart;
}

export function getEmptyCartSnapshot() {
  return EMPTY_CART;
}

export function getCartCount(cart: CartItem[]) {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

export function getCartTotal(cart: CartItem[]) {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}