import React from "react";
import { formatPrice } from "../../utils/formatPrice";
import { useSelector } from "react-redux";

const PDF = ({ componentRef }) => {
  const { cart } = useSelector((state) => state.cart);
  return (
    <div className="hidden">
      <div className="flex flex-col pt-8" ref={componentRef}>
        <span className="text-2xl mx-auto text-tertiary font-medium">
          BÁO GIÁ SẢN PHẨM TỪ PINEPERFUME
        </span>
        {cart?.length > 0 &&
          cart.map((item) => (
            <div
              className="flex items-center justify-between p-5 mb-5"
              key={item.id}
            >
              <div className="flex items-center gap-x-3">
                <img
                  src={item?.product?.images[0]}
                  alt=""
                  className="w-[120px] h-[120px] object-cover border-2"
                />
                <span className="text-lg font-medium line-clamp-2 w-[400px]">
                  {item?.product?.title}
                </span>
                <span className="text-lg">Số lượng: {item?.quantity}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-lg text-primary font-medium">
                  Giá: {formatPrice(item?.product?.promotion)}
                </span>
                <span className="text-base line-through">
                  Giá gốc:{formatPrice(item?.product?.price)}
                </span>
              </div>
            </div>
          ))}

        <div className="flex items-center justify-between px-5">
          <span className="text-black text-lg font-bold">Tổng tạm tính:</span>
          <span className="text-base font-medium">
            {" "}
            {formatPrice(
              cart?.reduce(
                (count, item) => count + item.quantity * item.product.promotion,
                0
              )
            )}
          </span>
        </div>
        <div className="flex items-center justify-between px-5">
          <span className="text-black text-lg font-bold">Thành tiền:</span>
          <span className="text-lg text-primary font-medium">
            {" "}
            {formatPrice(
              cart?.reduce(
                (count, item) => count + item.quantity * item.product.promotion,
                0
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PDF;
