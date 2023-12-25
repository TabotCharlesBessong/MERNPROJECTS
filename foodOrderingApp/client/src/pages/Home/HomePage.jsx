import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { getAll, search } from "../../services/foodServices";
import { Search, Thumbnails } from "../../components";
import { useParams } from "react-router-dom";

const initialState = { foods: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOOD_LOADED":
      return { ...state, foods: action.payload };
    default:
      return state;
  }
};

const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods } = state;
  const { searchTerm } = useParams();
  console.log(searchTerm)

  useEffect(() => {
    const loadFoods = searchTerm ? search(searchTerm) : getAll()

    loadFoods.then(foods => dispatch({type:'FOOD_LOADED',payload:foods}))
  }, [searchTerm]);
  return (
    <>
      <Search />
      <Thumbnails foods={foods} />
    </>
  );
};

export default HomePage;
