import { useReducer } from "react";

const initialState = {
  formData: {
    nameUser: "",
    nameAccount: "",
    password: "",
    rePassword: "",
  },

  checkErrors: {
    nameUser: false,
    nameAccount: false,
    password: false,
    rePassword: false,
  },

  textErrors: {
    nameUser: "",
    nameAccount: "",
    password: "",
    rePassword: "",
  },

  hiddenPassword: {
    password: false,
    rePassword: false,
  },
};

const registerReducer = (state, action) => {
  switch (action.type) {
    //theo dõi data của form
    case "CHANGEFORMDATA": {
      const { name, value } = action.payload.element;
      return { ...state, formData: { ...state.formData, [name]: value } };
    }

    //xử lý submit form data
    case "SUBMITFORMDATA": {
      const { nameUser, nameAccount, password, rePassword } = state.formData;

      let cheakErrorNameUser = false;
      let cheakErrorNameAccount = false;
      let cheakErrorPassword = false;
      let cheakErrorRePassword = false;

      let textErrorNameUser = "";
      let textErrorNameAccount = "";
      let textErrorPassword = "";
      let textErrorRePassword = "";

      const listUsers = JSON.parse(localStorage.getItem("listUser")) || [];

      //Kiểm tra tên
      if (!nameUser) {
        cheakErrorNameUser = true;
        textErrorNameUser = "Name không được để trống";
      } else {
        cheakErrorNameUser = false;
        textErrorNameUser = "";
      }

      //kiểm tra nameAccount
      if (!nameAccount) {
        cheakErrorNameAccount = true;
        textErrorNameAccount = "Name account không được để trống";
      } else {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nameAccount);
        const isPhoneNumber = /^(03|05|07|08|09)\d{8}$/.test(nameAccount);

        if (isEmail || isPhoneNumber) {
          const findUser = listUsers.find(
            (user) => user.account.nameAccount === nameAccount
          );

          if (findUser) {
            cheakErrorNameAccount = true;
            textErrorNameAccount = isEmail
              ? "Email đã được đăng ký"
              : "Số điện thoại đã được đăng ký";
          } else {
            cheakErrorNameAccount = false;
            textErrorNameAccount = "";
          }
        } else {
          cheakErrorNameAccount = true;
          textErrorNameAccount = "Dữ liệu không hợp lệ";
        }
      }

      //kiểm tra mật khẩu
      if (!password) {
        cheakErrorPassword = true;
        textErrorPassword = "Password không được để trống";
      } else if (!rePassword) {
        cheakErrorPassword = false;
        textErrorPassword = "";
        cheakErrorRePassword = true;
        textErrorRePassword = "Re-password không được để trống";
      } else if (password !== rePassword) {
        cheakErrorRePassword = true;
        textErrorRePassword = "Password không khớp";
      } else {
        cheakErrorRePassword = false;
        textErrorRePassword = "";
      }

      if (
        !cheakErrorNameUser &&
        !cheakErrorNameAccount &&
        !cheakErrorPassword &&
        !cheakErrorRePassword
      ) {
        const newUser = {
          account: {
            nameUser,
            nameAccount,
            password,
          },
        };

        listUsers.push(newUser);
        localStorage.setItem("listUsers", JSON.stringify(listUsers));

        return {
          ...state,
          formData: {
            nameUser: "",
            nameAccount: "",
            password: "",
            rePassword: "",
          },
          checkErrors: {
            nameUser: false,
            nameAccount: false,
            password: false,
            rePassword: false,
          },
          textErrors: {
            nameUser: "",
            nameAccount: "",
            password: "",
            rePassword: "",
          },
        };
      } else {
        return {
          ...state,
          formData: {
            nameUser: nameUser,
            nameAccount: nameAccount,
            password: password,
            rePassword: rePassword,
          },
          checkErrors: {
            nameUser: cheakErrorNameUser,
            nameAccount: cheakErrorNameAccount,
            password: cheakErrorPassword,
            rePassword: cheakErrorRePassword,
          },
          textErrors: {
            nameUser: textErrorNameUser,
            nameAccount: textErrorNameAccount,
            password: textErrorPassword,
            rePassword: textErrorRePassword,
          },
        };
      }
    }

    //xử lý hidden password
    case "HIDDENPASSWORD": {
      if (action.payload.value === "password") {
        return {
          ...state,
          hiddenPassword: {
            ...state.hiddenPassword,
            password: !state.hiddenPassword.password,
          },
        };
      }
      return {
        ...state,
        hiddenPassword: {
          ...state.hiddenPassword,
          rePassword: !state.hiddenPassword.rePassword,
        },
      };
    }
    default:
      return state;
  }
};

const FormRegister = () => {
  const [state, dispatch] = useReducer(registerReducer, initialState);

  //hàm theo dõi data của form
  const handleChangeFormData = (e) => {
    const element = e.target;
    dispatch({
      type: "CHANGEFORMDATA",
      payload: {
        element,
      },
    });
  };

  //hàm submit form
  const handleSubmitFormData = (e) => {
    e.preventDefault();
    dispatch({
      type: "SUBMITFORMDATA",
    });
  };

  //hàm xử lý ẩn hiện mật khẩu
  const handleHiddenPassword = (value) => {
    dispatch({
      type: "HIDDENPASSWORD",
      payload: {
        value,
      },
    });
  };

  return (
    <div className="form-register">
      <div className="title-36">Create an account</div>
      <p className="desc">Enter your details below</p>
      <form onSubmit={handleSubmitFormData}>
        <div className="box-input box-name-user">
          <label htmlFor="nameUser" className="desc">
            Name:
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            name="nameUser"
            id="nameUser"
            value={state.formData.nameUser}
            onChange={handleChangeFormData}
          />

          {state.checkErrors.nameUser ? (
            <div className="error">{state.textErrors.nameUser}</div>
          ) : null}
        </div>
        <div className="box-input box-name-account">
          <label htmlFor="nameAccount" className="desc">
            Email or phone number:
          </label>
          <input
            type="text"
            placeholder="Enter your email or phone number"
            name="nameAccount"
            id="nameAccount"
            value={state.formData.nameAccount}
            onChange={handleChangeFormData}
          />
          {state.checkErrors.nameAccount ? (
            <div className="error">{state.textErrors.nameAccount}</div>
          ) : null}
        </div>
        <div className="box-input box-password">
          <label htmlFor="password" className="desc">
            Password:
          </label>
          <div className="box-tag-input">
            <input
              type={state.hiddenPassword.password ? "text" : "password"}
              placeholder="Enter your password"
              id="password"
              name="password"
              value={state.formData.password}
              onChange={handleChangeFormData}
            />

            <div
              className="box-icon"
              onClick={() => handleHiddenPassword("password")}
            >
              {state.hiddenPassword.password ? (
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
        <div className="box-input box-re-password">
          <label htmlFor="rePassword" className="desc">
            Re-password:
          </label>
          <div className="box-tag-input">
            <input
              type={state.hiddenPassword.rePassword ? "text" : "password"}
              placeholder="Enter your re-password"
              id="rePassword"
              name="rePassword"
              value={state.formData.rePassword}
              onChange={handleChangeFormData}
            />
            <div
              className="box-icon"
              onClick={() => handleHiddenPassword("rePassword")}
            >
              {state.hiddenPassword.rePassword ? (
                <i className="fa-regular fa-eye"></i>
              ) : (
                <i className="fa-regular fa-eye-slash"></i>
              )}
            </div>
          </div>

          {state.checkErrors.rePassword ? (
            <div className="error">{state.textErrors.rePassword}</div>
          ) : null}
        </div>
        <button type="submit" className="btn-dark-pink">
          Create Account
        </button>
      </form>
      <div className="bottom">
        <p className="desc">
          Already have account? <span className="desc"> Log in</span>
        </p>
      </div>
    </div>
  );
};

export default FormRegister;
