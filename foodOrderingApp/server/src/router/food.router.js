import { Router } from "express";
<<<<<<<< HEAD:foodOrderingApp/server/src/router/food.js
import { sample_foods, sample_tags } from "../../src/constant/data.js";
========
import { sample_foods, sample_tags } from "../constant/data.js";
>>>>>>>> a80e021fbb3430998d22681c25d7fd649be6ef90:foodOrderingApp/server/src/router/food.router.js

const router = Router();

router.get("/", (req, res) => {
  res.send(sample_foods);
});

router.get("/tags", (req, res) => {
  res.send(sample_tags);
});

router.get("/search/:searchTerm", (req, res) => {
  const { searchTerm } = req.params;
  const foods = sample_foods.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  res.send(foods);
});

router.get("/tag/:tag", (req, res) => {
  const { tag } = req.params;
  const foods = sample_foods.filter((item) => item.tags?.includes(tag));
  res.send(foods);
});

router.get("/:foodId", (req, res) => {
  const { foodId } = req.params;
  const food = sample_foods.find((item) => item.id === foodId);
  res.send(food);
});

export default router;
// module.exports = router
