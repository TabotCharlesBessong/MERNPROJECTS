import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, Map, OrderItemList, Title } from "../../components";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { createOrder } from "../../services/orderService";
import classes from "./checkoutPage.module.css";
import { latLng } from "leaflet";

const CheckoutPage = () => {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });

  const submit = async (data) => {
    if (!order.addressLatLng) {
      toast.warning("Please select your location on the map");
      return;
    }
    await createOrder({ ...order, name: data.name, address: data.address });
    navigate("/payment");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  return (
    <>
      <form onSubmit={handleSubmit(submit)} className={classes.container}>
        <div className={classes.content}>
          <Title title="Order Form" fontSize="1.6rem" />
          <div className={classes.inputs}>
            <Input
              defaultValue={user.name}
              label="Name"
              {...register("name")}
              error={errors.name}
            />
            <Input
              defaultValue={user.address}
              label="Address"
              {...register("address")}
              error={errors.address}
            />
          </div>
          <OrderItemList order={order} />
        </div>
        <div>
          <Title title="Choose your location" fontSize="1.6rem" />
          <Map
            location={order.addressLatLng}
            onChange={(latLng) => {
              console.log(latLng);
              setOrder({ ...order, addressLatLng: latLng });
            }}
          />
        </div>
        <div className={classes.buttons_container}>
          <div className={classes.buttons}>
            <Button
              type="submit"
              text="Go To Payment"
              width="100%"
              height="3rem"
            />
          </div>
        </div>
      </form>
    </>
  );
};

export default CheckoutPage;
