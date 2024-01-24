import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import UploadWidget from "../UploadWidget";
import { IoTrashOutline } from "react-icons/io5";

const ProductForm = ({
  files,
  setFiles,
  product,
  productImage,
  imagePreview,
  setImagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
  categories,
  filteredBrands,
  isEditing,
}) => {
  const img =
    "https://res.cloudinary.com/bamtech1/image/upload/v1674999036/nhq5gqr1xecrkipneiup.jpg";

  const removeImage = (image) => {
    console.log(image);
    setFiles(files.filter((img, index) => img !== image));
  };

  return (
    <div className=" w-full flex flex-col items-center my-20">
      <UploadWidget files={files} setFiles={setFiles} />

      <div className="w-full container   px-6  bg-neutral  rounded-lg  gap-6 flex flex-col shadow-2xl">
        <br />
        <form onSubmit={saveProduct} className="flex flex-col  items-center">
          <label className="block text-2xl text-dark font-medium">
            Product Images:
          </label>
          <div className="max-w-5xl flex items-center justify-center my-o mx-auto">
            <aside className="w-full md:max-w-3xl my-0 mx-auto flex  justify-start items-center overflow-x-hidden flex-wrap touch-auto border border-dark transition-all rounded-xl">
              {files.length > 0 &&
                files.map((image) => (
                  <div
                    key={image}
                    className="card card-compact  m-1 bg-base-100 shadow-xl overflow-x-clip transform scale-95 hover:scale-100"
                  >
                    <figure className="w-36 h-36">
                      <img
                        className=" w-full h-auto aspect-square  object-contain"
                        src={image}
                        alt="Shoes"
                      />
                    </figure>
                    <div className="card-body">
                      <div className="card-actions justify-end">
                        <IoTrashOutline
                          style={{ fontSize: "20px", color: "red" }}
                          onClick={() => removeImage(image)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              {files.length < 1 && (
                <p className="p-6">No image set for this poduct.</p>
              )}
              {/* <div
                    key={image}
                    className=" flex flex-col  m-1 overflow-hidden transform scale-95 hover:scale-100"
                  >
                    <img
                      src={image}
                      className=" w-full h-auto aspect-square  object-contain"
                      alt="productImage"
                    />
                    <div className=" z-40 bg-slate-50 p-4">
                      <IoTrashOutline
                        style={{ fontSize: "20px", color: "red" }}
                        onClick={() => removeImage(image)}
                      />
                    </div>
                  </div> */}
            </aside>
          </div>
          <br />
          <hr />
          <div className="flex-wrap items-center justify-center flex gap-2 my-2 text-base text-dark">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Product Name:</span>
              </div>
              <input
                placeholder="Product name"
                name="name"
                value={product?.name}
                onChange={handleInputChange}
                type="text"
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Product Category:</span>
              </div>
              <select
                className="select text-neutral select-bordered w-full max-w-xs"
                name="category"
                value={product?.category}
                onChange={handleInputChange}
              >
                {isEditing ? (
                  <option>{product?.category}</option>
                ) : (
                  <option>Select Category</option>
                )}
                {categories.length > 0 &&
                  categories.map((cat) => (
                    <option className="p-2" key={cat._id} value={cat._name}>
                      {cat.name}
                    </option>
                  ))}
              </select>
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Product Brand:</span>
              </div>
              <select
                name="brand"
                value={product?.brand}
                className="select text-neutral select-bordered w-full max-w-xs"
                onChange={handleInputChange}
              >
                {isEditing ? (
                  <option>{product?.brand}</option>
                ) : (
                  <option>Select Brand</option>
                )}

                {filteredBrands.length > 0 &&
                  filteredBrands.map((brand) => (
                    <option key={brand._id} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
              </select>
            </label>

            {/* <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Product Category"
              name="category"
              value={product?.category}
              onChange={handleInputChange}
            /> */}

            {/* <input
              className="peer relative h-10 w-full rounded border border-gray px-4 text-sm text-slate-500  outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
              type="text"
              placeholder="Brand"
              name="brand"
              value={product?.brand}
              onChange={handleInputChange}
            /> */}

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Product Color:</span>
              </div>
              <input
                type="text"
                placeholder="Color"
                name="color"
                value={product?.color}
                onChange={handleInputChange}
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Regular Price:</span>
              </div>
              <input
                type="text"
                placeholder="Regular Price"
                name="regularPrice"
                value={product?.regularPrice}
                onChange={handleInputChange}
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Product Price:</span>
              </div>
              <input
                type="text"
                placeholder="Product Price"
                name="price"
                value={product?.price}
                onChange={handleInputChange}
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Product Quantity:</span>
              </div>
              <input
                type="text"
                placeholder="Product Quantity"
                name="quantity"
                value={product?.quantity}
                onChange={handleInputChange}
                className="input text-neutral input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <label>Product Description:</label>
          {/* <div dangerouslySetInnerHTML={{ __html: description }} /> */}
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForm.modules}
            formats={ProductForm.formats}
          />

          <div className="my-4">
            <button type="submit" className="btn btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;