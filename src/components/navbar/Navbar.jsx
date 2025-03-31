import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Profile from "../profile/Profile";
import Swal from "sweetalert2";
import userApi from "../../api/userApi";
import { logout } from "../../redux/auth/userSlice";
import Cart from "../cart/Cart";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import { getCart } from "../../redux/cart/cartSlice";
import CartHollow from "../cart/CartHollow";
import Search from "../search/Search";
import useClickOutSide from "../../hooks/useClickOutSide";
import useDebounce from "../../hooks/useDebounce";

const Navbar = () => {
  const loggedInUser = useSelector((state) => state.user.current);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bodyStyle = document.body.style;
  let isLocked = false;
  const hanleMouseOver = () => {
    if (!isLocked) {
      // disableBodyScroll(bodyStyle);
      isLocked = true;
    }
  };
  const hanleMouseOut = () => {
    if (isLocked) {
      // enableBodyScroll(bodyStyle);
      isLocked = false;
    }
  };

  const isLoggedIn =
    loggedInUser === null ? null : loggedInUser.active === "active";

  const handleLogout = () => {
    Swal.fire({
      title: "Đăng xuất ",
      text: "Bạn có chắc chắn muốn đăng xuất không ?",
      showCancelButton: true,
      icon: "question",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const action = logout();
        dispatch(action);
        await userApi.logout();
        navigate("/");
        Swal.fire("Tạm biệt! Hẹn gặp lại quý khách");
      }
    });
  };

  // cart
  let { cart } = useSelector((state) => state.cart);
  useEffect(() => {
    if (!cart) {
      dispatch(getCart());
    }
  }, [cart]);

  //search
  const [keyword, setKeyWord] = useState("");
  const location = useLocation();
  const { show, setShow, nodeRef } = useClickOutSide();
  const handleClick = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setKeyWord("");
    localStorage.setItem("keyword", keyword);
  }, [location.search]);

  const handleClickSearch = () => {
    if (keyword === "") return;
    localStorage.setItem("keyword", keyword);
    navigate(`/product/?keyword=${keyword}`);
    setShow(false);
  };

  const handleChange = (e) => {
    setKeyWord(e.target.value);
  };

  const search = useDebounce(keyword, 500);

  useEffect(() => {
    if (show === true) {
      // disableBodyScroll(bodyStyle);
    } else {
      // enableBodyScroll(bodyStyle);
    }
  }, [show]);

  return (
    <nav className="bg-white h-[80px] sticky z-50 shadow-md transition-all top-0 text-white -translate-y-0.5 ">
      <div className="container xl:w-[95%] max-w-[1280px] flex items-center h-full justify-between ">
        <div className="flex items-center justify-center gap-2">
          <Link to="/" className="flex items-center gap-8">
            <div className="w-auto h-[60px] object-cover">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-full h-full object-cover"
                title="Trang chủ"
              />
            </div>
            {/* <span className="text-black font-medium text-3xl" title="Trang chủ">
              PINEFUME
            </span> */}
          </Link>
        </div>
        {/* <Link
          title="Tất cả sản phẩm"
          className="cursor-pointer flex align-center border rounded-md py-1 px-2 text-[14px]"
          to="/product"
        >
          <p>
            {" "}
            DANH MỤC
            <br /> SẢN PHẨM
          </p>
        </Link> */}
        <div className="w-[650px] flex items-center relative border rounded-lg" ref={nodeRef}>
          <input
            type="text"
            className="py-3 px-4 rounded-l-lg text-base w-[600px] flex-shrink-0 text-black"
            id="search"
            placeholder="Bạn cần tìm gì?"
            onClick={handleClick}
            onChange={handleChange}
            value={keyword}
          />
          <div
            className="w-[50px] bg-primary h-[48px] rounded-r-lg flex items-center justify-center cursor-pointer "
            onClick={handleClickSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7 text-secondary"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          {keyword && show === true && (
            <Search onClickItem={handleClose} keyword={search} />
          )}
        </div>

        {!isLoggedIn ? (
          <Link
            to="/sign-in"
            className="flex items-center justify-center  hover:text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-black"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="px-2 font-medium text-base text-black">Đăng nhập</span>
          </Link>
        ) : (
          <Profile data={loggedInUser}  />
        )}
        <div
          className="relative flex items-center gap-x-3 cart-home cursor-pointer"
          onMouseOver={hanleMouseOver}
          onMouseOut={hanleMouseOut}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8 text-black cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
          <div className="flex flex-col items-start justify-between">
            <span className="font-medium text-sm text-black">Giỏ hàng của bạn</span>
            <span className="font-medium text-sm text-black">
              ({cart?.length || 0}) sản phẩm
            </span>
          </div>
          {cart?.length > 0 ? <Cart /> : <CartHollow />}
        </div>
      </div>
      <div className="bg-primary flex text-white justify-center">
        <Link to="/" className="py-2 px-4 hover:text-secondary transition-all">Trang chủ</Link>
        <Link to="/about" className="py-2 px-4 hover:text-secondary transition-all">Giới thiệu</Link>
        <Link to="/product" className="py-2 px-4 hover:text-secondary transition-all">Sản phẩm</Link>
        <Link to="/contact" className="py-2 px-4 hover:text-secondary transition-all">Liên hệ</Link>
        <Link to="/faq" className="py-2 px-4 hover:text-secondary transition-all">Hỏi đáp</Link>
      </div>
    </nav>
  );
};

export default Navbar;
