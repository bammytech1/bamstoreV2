import React, { useState } from "react";
// import Card from "../../card/Card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
// import Loader from "../../loader/Loader";
import { toast } from "react-toastify";
import {
  createCategory,
  getCategories,
} from "../../../redux/features/categoryAndBrand/categorySlice";

const CreateCategory = ({ reloadCategory }) => {
  const [name, setName] = useState("");

  const { isLoading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const saveCat = async (e) => {
    e.preventDefault();
    if (name.length < 3) {
      return toast.error("Coupon must be up to 3 characters");
    }
    const formData = {
      name,
    };
    // console.log(formData);
    dispatch(createCategory(formData));
    dispatch(getCategories());
    setName("");
    reloadCategory();
  };

  return (
    <>
      {isLoading && (
        <div className="flex  justify-center ">
          <span className="loading loading-ball loading-xs"></span>
          <span className="loading loading-ball loading-sm"></span>
          <span className="loading loading-ball loading-md"></span>
          <span className="loading loading-ball loading-lg"></span>
        </div>
      )}
      {/* <div className="w-full h-1 bg-red-700 "></div> */}

      <div className="mb-2 text-dark border rounded-lg p-4">
        <h3 className="text-center text-base">Create Category</h3>
        <p className="text-center">
          Use the form to <b>Create a Category.</b>
        </p>
        <div className="w-full p-4">
          <br />
          <form onSubmit={saveCat}>
            <label>Category Name:</label>
            <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Category name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <div className="my-2">
              <button type="submit" className="btn btn-primary">
                Save Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCategory;
