import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;
      const tempItem = state.cart.find((i) => i.id === id + color);

      if (tempItem) {
        let tempCart = state.cart.map((item) => {
          if (item.id === id + color) {
            let newAmount = item.amount + amount;
            if (newAmount > item.max) {
              newAmount = item.max;
            }

            return {
              ...item,
              amount: newAmount,
            };
          } else {
            return item;
          }
        });

        return {
          ...state,
          cart: tempCart,
        };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          image: product.images[0].url,
          color,
          amount,
          price: product.price,
          max: product.stock,
        };
        return {
          ...state,
          cart: [...state.cart, newItem],
        };
      }
    case TOGGLE_CART_ITEM_AMOUNT:
      const { id: cartId, value } = action.payload;
      const toggledCart = state.cart.map((item) => {
        if (cartId === item.id) {
          if (value === 'inc') {
            let newAmount = item.amount + 1;
            if (newAmount > item.max) {
              newAmount = item.max;
            }
            return {
              ...item,
              amount: newAmount,
            };
          }
          if (value === 'dec') {
            let newAmount = item.amount - 1;
            if (newAmount < 1) {
              newAmount = 1;
            }
            return {
              ...item,
              amount: newAmount,
            };
          }
        }
        return item;
      });

      return {
        ...state,
        cart: toggledCart,
      };

    case COUNT_CART_TOTALS:
      const { total_items, total_amount } = state.cart.reduce(
        (total, item) => {
          const { price, amount } = item;

          total.total_items += amount;
          total.total_amount += amount * price;

          return total;
        },
        { total_items: 0, total_amount: 0 }
      );

      return {
        ...state,
        total_items,
        total_amount,
      };

    case REMOVE_CART_ITEM:
      const tempCart = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        cart: tempCart,
      };

    case CLEAR_CART:
      return {
        ...state,
        cart: [],
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default cart_reducer;
