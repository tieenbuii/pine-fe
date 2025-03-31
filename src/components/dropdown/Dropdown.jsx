import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Swal from "sweetalert2";
import { logout } from "../../redux/auth/userSlice";
import { useDispatch } from "react-redux";
import userApi from "../../api/userApi";
const DropdownStyles = styled.div`
  width: 300px;
  background-color: white;
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 20px;
  border-radius: 10px;
  color: black;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  z-index: 10;
  font-size: 20px;
  list-style-type: none;
  padding: 10px 0;
  opacity: 0;
  visibility: hidden;
  transition: all linear 0.25s;
  &::after {
    content: "";
    width: 20px;
    height: 20px;
    transform: rotate(45deg) translateY(-50%);
    background-color: white;
    border-top: 1px solid #f5f5f5;
    position: absolute;
    top: 0;
    right: 50px;
    z-index: 1;
  }
  &::before {
    content: "";
    width: 100%;
    height: 20px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: transparent;
    transform: translateY(-100%);
  }
  a:hover {
    background: #f1fbf7;
    color: #BF2929;
  }
`;

const Dropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  // Middleware kiểm tra token hết hạn
const forceLogoutWhenTokenExpired = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  
  // Nếu không có token thì logout ngay
  if (!token) {
    await dispatch(logout());
    navigate("/");
    Swal.fire({
      icon: 'warning',
      title: 'Phiên đăng nhập không tồn tại',
      text: 'Vui lòng đăng nhập lại',
      confirmButtonColor: "#3085d6",
    });
    return false;
  }}
  return (
    <DropdownStyles className="dropdown">
      <NavLink to="/account" end>
        <div className="flex items-center gap-x-4 border-b-2 border-solid px-4 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
          <span className="text-base font-medium">Tài khoản của tôi</span>
        </div>
      </NavLink>

      <NavLink to="/account/orders" end>
        <div className="flex items-center gap-x-4 border-b-2 border-solid px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
            />
          </svg>

          <span className="text-base font-medium">Đơn hàng</span>
        </div>
      </NavLink>

      <NavLink to="/account/address" end>
        <div className="flex items-center gap-x-4 border-b-2 border-solid px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
            />
          </svg>

          <span className="text-base font-medium">Địa chỉ</span>
        </div>
      </NavLink>
      <NavLink to="/account/reset-password" end>
        <div className="flex items-center gap-x-4 border-b-2 border-solid px-3 py-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
            />
          </svg>

          <span className="text-base font-medium">Đổi mật khẩu</span>
        </div>
      </NavLink>

      <button onClick={handleLogout}>
        {" "}
        <div className="flex items-center gap-x-4 px-3 py-2 hover:text-tertiary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
            />
          </svg>
          <span className="text-base font-medium">Đăng xuất</span>
        </div>
      </button>
    </DropdownStyles>
  );
};

export default Dropdown;
