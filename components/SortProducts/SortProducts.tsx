"use client";

import { Dispatch, SetStateAction } from "react";
import "./SortProduct.scss";

interface Props {
  sortArray: any[];
  type: string;
  sortValue: string;
  setSortValue: Dispatch<SetStateAction<string>>;
  showProductForm: () => void;
  useAll: boolean;
  shouldAdd: boolean;
}

const SortProducts = ({
  sortArray,
  type,
  setSortValue,
  showProductForm,
  sortValue,
  useAll,
  shouldAdd,
}: Props) => {
  return (
    <div className="sort_container">
      {shouldAdd ? (
        <button className="add_product" onClick={showProductForm}>
          <i className="bx bx-plus-circle"></i>
          <p>Add {type}</p>
        </button>
      ) : (
        <div></div>
      )}

      <div className="sort_product">
        <p>Display</p>
        <select
          id="sortCategories"
          value={sortValue}
          onChange={(e) => setSortValue(e.target.value)}
        >
          {useAll && <option value="all">all</option>}
          {sortArray.map((cat, idx) => (
            <option key={idx} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <p>{type}</p>
      </div>
    </div>
  );
};

export default SortProducts;
