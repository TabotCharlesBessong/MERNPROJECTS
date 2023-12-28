import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { getAll, getAllByTag, getAllTags, search } from "../../services/foodServices";
import { Search, Tags, Thumbnails } from "../../components";
import { useParams } from "react-router-dom";

const initialState = { foods: [],tags:[] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FOOD_LOADED":
      return { ...state, foods: action.payload };
    case "TAGS_LOADED":
      return {...state,tags:action.payload}
    default:
      return state;
  }
};

const HomePage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods,tags } = state;
  const { searchTerm,tag } = useParams();
  console.log(searchTerm)

  useEffect(() => {
    getAllTags().then(tags => dispatch({type:'TAGS_LOADED',payload:tags}))

    const loadFoods = tag ? getAllByTag(tag) : searchTerm ? search(searchTerm) : getAll()

    loadFoods.then(foods => dispatch({type:'FOOD_LOADED',payload:foods}))
  }, [searchTerm,tag]);
  return (
    <>
      <Search />
      <Tags tags={tags} />
      <Thumbnails foods={foods} />
    </>
  );
};

export default HomePage;
