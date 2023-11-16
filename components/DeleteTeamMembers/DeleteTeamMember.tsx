import { object, string } from "yup";
import "../BasicInformation/BasicInformation.css";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { dker, getToken } from "@/utils/Links";
import { ResponseDtoProps } from "@/types";
import HttpErrorHandler from "@/utils/ErrorHandler";

export default function DeleteTeamCard({ active }: { active: string }) {
  const [success, setSuccess] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [checkedMessage, setCheckedMessage] = useState("");
  const [error, setError] = useState("");

  const validationSchema = object().shape({
    email: string()
      .email("Must be a valid email")
      .required("Email of the user must be provided"),
  });

  const { errors, touched, handleChange, handleSubmit, isSubmitting, values } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema,
      onSubmit: async ({ email }, { resetForm, setSubmitting }) => {
        const url = process.env.NEXT_PUBLIC_BASE_URL + "/api/v1/user/delete";
        const apiKey = getToken();
        const data = JSON.stringify({
          userName: email,
        });

        const config = {
          method: "post",
          maxBodyLength: Infinity,
          url,
          headers: {
            apiKey,
            "Content-Type": "application/json",
          },
          data,
        };

        await axios
          .request(config)
          .then((response) => {
            const {
              responseDto: { code, message },
            } = response.data as {
              responseDto: ResponseDtoProps;
              userDto: null;
              userDtoList: null;
            };

            if (code === dker) {
              setError(message);
              return;
            } else {
              resetForm();
              setSubmitting(false);
              setSuccess(message);
            }
          })
          .catch((error) => {
            setError(HttpErrorHandler(error));
          });
      },
    });
  return (
    <form
      style={{ display: active === "deleteTeam" ? "block" : "none" }}
      className="basicInformationWrapper"
      onSubmit={handleSubmit}
    >
      <h2 className="settings_title">Delete Team</h2>
      <div id="liner"></div>

      <p className="delete_team_warning w-3/4 mt-4">
        When you delete a team member, access to this dashboard account and
        services will be permanently deleted.
      </p>

      <div className="mt-5 flex items-center gap-3 w-3/4">
        <label htmlFor="deleteEmail" className="settings_label w-1/2">
          Email address
        </label>
        <input
          className="settings_input w-1/2"
          type="text"
          id="deleteEmail"
          placeholder="Email address"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>

      {errors.email && touched.email && (
        <div className="error_message">{errors.email}</div>
      )}

      <div className="mt-4 flex items-center gap-3 w-3/4">
        <input
          className="settings_checkb0x"
          type="checkbox"
          id="emailCheckbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          required
        />
        <label htmlFor="emailCheckbox" className="settings_label w-3/4">
          Confirm that I want to delete this account.
        </label>
      </div>

      <div className="mt-1 error_message w-3/4">{checkedMessage}</div>

      <div className="mt-4 w-100 flex justify-end">
        <button
          type="submit"
          className="setting_submit_btn"
          disabled={isSubmitting || !isChecked}
        >
          Delete
        </button>
      </div>
    </form>
  );
}
