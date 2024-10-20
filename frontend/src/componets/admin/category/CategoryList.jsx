import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  deleteCategory,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categorySlice";

const CategoryList = ({ categories }) => {
  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const confirmDelete = (slug) => {
    confirmAlert({
      title: "Delete Category",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Delete",
          onClick: () => delCat(slug),
        },
        {
          label: "Cancel",
          // onClick: () => alert('Click No')
        },
      ],
    });
  };

  const delCat = async (slug) => {
    await dispatch(deleteCategory(slug));
    await dispatch(getCategories());
  };

  return (
    <div className="mb-2 ">
      <h3 className="text-dark ">All Categories</h3>

      <div className="">
        {categories.length === 0 ? (
          <p>No category found</p>
        ) : (
          <table className=" table">
            <thead>
              <tr className="bg-base-200">
                <th>s/n</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => {
                const { _id, name, slug } = cat;
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>{name}</td>

                    <td>
                      <span>
                        <FaTrashAlt
                          size={20}
                          color={"red"}
                          onClick={() => confirmDelete(slug)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
