import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getById } from "../../services/foodServices";
import classes from "./food.module.css";
import images from "../../constant/images";
import { Price, StarRating, Tags } from "../../components";

const FoodPage = () => {
  const [food, setFood] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // getById(id).then(setFood);
    setFood(getById(id));
    console.log(food);
  }, []);
  return (
    <>
      {food && (
        <div className={classes.container}>
          <img src={images.food1} alt={food.name} className={classes.image} />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className="classes name">{food.name}</span>
              <span
                className={`${classes.favorite} ${
                  food.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
            </div>

            <div className={classes.rating}>
              <StarRating stars={food.stars} size={25} />
            </div>

            <div className={classes.origins}>
              {food.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>
              {food.tags && (
                <Tags
                  tags={food.tags.map((tag) => ({ name: tag }))}
                  forFoodPage={true}
                />
              )}
            </div>

            <div className={classes.cook_time}>
              <span>
                Time to cook about <strong>{food.cookTime}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>
              <Price price={food.price} />
            </div>

            <button>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodPage;
