import React, { useState, useEffect } from "react";
import DangerAlert from "./DangerAlert";
import Spinner from "./Spinner";
import SuccessAlert from "./SuccessAlert";
import { useDispatch, useSelector } from "react-redux";

const AddCategoryModal = () => {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const x = useSelector((state) => state.cat);
  //console.log(x);

  const add_category_handler = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("/category/add-category", {
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("auth_token"),
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        category_name: category,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        console.log(result);
        if (result.error) {
          return setError(result.error);
        }
        dispatch({type:"UPDATE_CATEGORY"});

        setSuccess(`${result.result.category_name} category is created`);
      })
      .catch((err) => console.log(err));
  };

  const close__handler = () => {
    setCategory("");
    setSuccess(null);
    setError(null);
  };

  return (
    <div>
      <button
        type="button"
        className="btn btn-outline-primary btn-lg"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Add Category
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add Category
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              {loading && <Spinner />}
              {error && <DangerAlert alert={error} />}
              {success && <SuccessAlert alert={success} />}
              <form onSubmit={add_category_handler}>
                <div className="form-group">
                  <label for="exampleInputEmail1"></label>
                  <input
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                    placeholder="Add your category"
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                </div>
                <br />

                <button type="submit" className="btn btn-primary">
                  Add Category
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                onClick={close__handler}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
