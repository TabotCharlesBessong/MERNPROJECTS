import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import images from "../../constant/images";
import { getById } from "../../services/foodServices";
import classes from "./food.module.css";

const FoodPage = () => {
  const [food, setFood] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getById(id).then(setFood);
  }, [id]);
  console.log(food);
  return (
    <>
      {food && (
        <div className={classes.container}>
          <img src={images.food1} alt={food.name} className={classes.image} />
        </div>
      )}
    </>
  );
};

export default FoodPage;
