import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../../redux/cart/cartSlice";
import { formatPrice } from "../../../utils/formatPrice";
const SubInformationProduct = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleAddCart = () => {
    const action = addToCart({
      id: data._id,
      product: data,
      quantity: 1,
    });
    dispatch(action);
  };
  const handleBuy = () => {
    const action = addToCart({
      id: data._id,
      product: data,
      quantity: 1,
    });
    dispatch(action);
    navigate("/cart");
  };
  return (
    <div className="product-info flex flex-col p-6">
      <span
        className="text-xl font-semibold mb-2 line-clamp-2 cursor-pointer"
        title={data?.title}
      >
        {data?.title}
      </span>
      <div className="flex items-center justify-start gap-x-5 mb-4">
        <span className="text-base text-slate-400">
          Thương hiệu: {data?.brand?.name}
        </span>
        <span>|</span>
        <span className="text-base text-slate-400">SKU: {data?._id}</span>
      </div>
      {data?.inventory > 0 && data?.inventory < 5 && (
        <span className="text-orange-500 font-medium mb-4">
          Chỉ còn {data?.inventory} sản phẩm
        </span>
      )}
      {data?.inventory === 0 && (
        <span className="text-orange-500 font-medium mb-4">
          Sản phẩm hiện tại hết hàng
        </span>
      )}
      <span className="text-2xl font-semibold text-red-600 mb-2">
        {formatPrice(data?.promotion)}
      </span>
      <div className="flex items-center mb-6">
        <span className="text-lg line-through text-slate-400 mr-2">
          {formatPrice(data?.price)}
        </span>
        <span className="text-blue text-lg"> - {data?.percent}%</span>
      </div>
      <span className="w-full border-dotted border-2 mb-6"></span>
      {data?.inventory > 0 && (
        <>
          <div className="flex items-center justify-between px-4">
            <button
              className="px-8 py-3 bg-red-700 text-white text-lg font-medium rounded-md flex-grow mr-10"
              type="button"
              onClick={handleBuy}
            >
              MUA NGAY
            </button>
            <button
              className="px-3 py-3  text-red-600 text-lg font-medium rounded-md border-2 border-red-600 flex-grow-1"
              type="button"
              onClick={handleAddCart}
            >
              THÊM VÀO GIỎ HÀNG
            </button>
          </div>
          <span className="w-full border-dotted border-2 my-6"></span>
        </>
      )}
    </div>
  );
};

export default SubInformationProduct;
