import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { actionUserLogIn } from "../../../redux/counterAction/counterAction";

const initialState = {
  formData: {
    nameAccount: "",
    password: "",
  },

  checkErrors: {
    nameAccount: false,
    password: false,
  },

  textErrors: {
    nameAccount: "",
    password: "",
  },

  hiddenPassword: false,
};

const reducerLogIn = (state, action) => {
  switch (action.type) {
    //xử lý thay đổi của form data
    case "CHANGEFORMDATA": {
      const { name, value } = action.payload.element;
      return { ...state, formData: { ...state.formData, [name]: value } };
    }

    case "SUBMITFORMDATA": {
      const { nameAccount, password } = state.formData;
      let checkErrorNameAccount = false;
      let checkErrorPasswword = false;
      let textErrorNameAccount = "";
      let textErrorPassword = "";

      //check nameAccount
      if (!nameAccount) {
        checkErrorNameAccount = true;
        textErrorNameAccount = "Tên tài khoản không được để trống";
      }

      if (!password) {
        checkErrorPasswword = true;
        textErrorPassword = "Mật khẩu không được để trống";
      }

      if (nameAccount && password) {
        const listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];
        let checkNameAccount = false;
        let checkPassword = false;

        listUsers.forEach((user) => {
          if (user.account.nameAccount === nameAccount) {
            checkNameAccount = true; // Tên tài khoản hợp lệ
            if (user.account.password === password) {
              checkPassword = true; // Mật khẩu cũng hợp lệ
            }
          }
        });
        if (!checkNameAccount) {
          checkErrorNameAccount = true;
          textErrorNameAccount = "Tên tài khoản không đúng, thử lại";
        } else if (!checkPassword) {
          checkErrorPasswword = true;
          textErrorPassword = "Mật khẩu không đúng, thử lại";
        }
      }

      if (!checkErrorNameAccount && !checkErrorPasswword) {
        action.payload.dispatchRedux({
          type: actionUserLogIn.type,
          payload: {
            nameAccount: state.formData.nameAccount,
          },
        });

        return {
          ...state,
          formData: {
            nameAccount: "",
            password: "",
          },

          checkErrors: {
            nameAccount: false,
            password: false,
          },

          textErrors: {
            nameAccount: "",
            password: "",
          },
        };
      } else {
        return {
          ...state,
          checkErrors: {
            nameAccount: checkErrorNameAccount,
            password: checkErrorPasswword,
          },

          textErrors: {
            nameAccount: textErrorNameAccount,
            password: textErrorPassword,
          },
        };
      }
    }

    //hidden password
    case "HIDDENPASSWORD":
      return { ...state, hiddenPassword: !state.hiddenPassword };
    default:
      return state;
  }
};

const FormLogIn = () => {
  const [state, dispatch] = useReducer(reducerLogIn, initialState);
  const dispatchRedux = useDispatch();

  //hàm xử lý thay đổi của form data
  const handleChangeFormData = (e) => {
    const element = e.target;
    dispatch({
      type: "CHANGEFORMDATA",
      payload: {
        element,
      },
    });
  };

  //hàm xử lý submit form
  const handleSubmitFromData = (e) => {
    e.preventDefault();
    dispatch({
      type: "SUBMITFORMDATA",
      payload: {
        dispatchRedux,
      },
    });
  };

  //hàm xử lý ẩn hiện mật khẩu
  const handleHiddenPassword = () => {
    dispatch({
      type: "HIDDENPASSWORD",
    });
  };
  return (
    <div className="log-in">
      <div className="title-36">Log in to Exclusive</div>
      <p className="desc">Enter your details below</p>
      <form action="" onSubmit={handleSubmitFromData}>
        <div className="box-input">
          <label htmlFor="nameAccount" className="desc">
            Email or phone number
          </label>
          <input
            type="text"
            id="nameAccount"
            name="nameAccount"
            placeholder="Email or phone number"
            onChange={handleChangeFormData}
            value={state.formData.nameAccount}
          />

          {state.checkErrors.nameAccount ? (
            <div className="error">{state.textErrors.nameAccount}</div>
          ) : null}
        </div>
        <div className="box-input">
          <label htmlFor="password" className="desc">
            Password
          </label>
          <div className="box-tag-input">
            <input
              type={state.hiddenPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Passwword"
              onChange={handleChangeFormData}
              value={state.formData.password}
            />
            <div className="box-icon" onClick={handleHiddenPassword}>
              {state.hiddenPassword ? (
                <i className="fa-regular fa-eye"></i>
              ) : (
                <i className="fa-regular fa-eye-slash"></i>
              )}
            </div>
          </div>

          {state.checkErrors.password ? (
            <div className="error">{state.textErrors.password}</div>
          ) : null}
        </div>

        <button className="btn-dark-pink" type="submit">
          Log In
        </button>
      </form>

      <div className="bottom">
        <p className="desc">
          Don't have an account yet? <span className="desc">Register</span>
        </p>
      </div>
    </div>
  );
};

export default FormLogIn;
