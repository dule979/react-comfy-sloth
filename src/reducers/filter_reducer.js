import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let max_price = Math.max(...action.payload.map((prod) => prod.price));

      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: max_price,
          price: max_price,
        },
      };

    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };

    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let sortedProducts = [...filtered_products];
      if (sort === 'price_lowest') {
        sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
      }
      if (sort === 'price_highest') {
        sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === 'name_a') {
        sortedProducts = sortedProducts.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      }
      if (sort === 'name_z') {
        sortedProducts = sortedProducts.sort((a, b) =>
          b.name.localeCompare(a.name)
        );
      }
      return {
        ...state,
        filtered_products: sortedProducts,
      };

    case UPDATE_FILTERS:
      let { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, company, category, color, price, shipping } = state.filters;

      let tempProducts = [...all_products];

      if (text) {
        tempProducts = tempProducts.filter((product) =>
          product.name.toLowerCase().startsWith(text)
        );
      }

      if (category !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        );
      }

      if (company !== 'all') {
        tempProducts = tempProducts.filter(
          (product) => product.company === company
        );
      }

      if (color !== 'all') {
        tempProducts = tempProducts.filter((product) =>
          product.colors.includes(color)
        );
      }

      if (price) {
        tempProducts = tempProducts.filter((product) => price >= product.price);
      }

      if (shipping) {
        tempProducts = tempProducts.filter((product) => product.shipping);
      }

      return {
        ...state,
        filtered_products: tempProducts,
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          text: '',
          company: 'all',
          color: 'all',
          category: 'all',
          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
