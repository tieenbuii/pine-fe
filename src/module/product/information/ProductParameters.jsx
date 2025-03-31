import React from "react";

const ProductParameters = ({ data }) => {
  console.log(data);
  return (
    <div className="product-parameters px-5 pb-10">
      <div className="text-2xl font-semibold mb-8">Thông tin chi tiết</div>
      <table className="table-product">
        <thead>
          <tr>
            <td>Thương hiệu</td>
            <td>{data?.brand?.name}</td>
          </tr>
          <tr>
            <td>Giới tính</td>
            <td>{data?.gender}</td>
          </tr>
          <tr>
            <td>Nồng độ</td>
            <td>{data?.concentration}</td>
          </tr>
          <tr>
            <td>Xuất xứ</td>
            <td>{data?.origin}</td>
          </tr>
          <tr>
            <td>Năm ra mắt</td>
            <td>{data?.yearOfLaunch}</td>
          </tr>
          <tr>
            <td>Nhóm nước hoa</td>
            <td>{data?.perfumeGroup}</td>
          </tr>
          <tr>
            <td>Độ tuổi khuyên dùng</td>
            <td>{data?.recommendedAge}</td>
          </tr>
          <tr>
            <td>Hương đầu</td>
            <td>{data?.topNotes} </td>
          </tr>
          <tr>
            <td>Hương giữa</td>
            <td>{data?.middleNotes}</td>
          </tr>
          <tr>
            <td>Hương cuối</td>
            <td>{data?.baseNotes}</td>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default ProductParameters;
