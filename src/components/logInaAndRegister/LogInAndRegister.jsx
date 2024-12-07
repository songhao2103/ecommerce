import FormLogIn from "./formLogIn/FormLogIn";
// import FormRegister from "./formRegister/FormRegister";

const LogInAndRegister = () => {
  return (
    <div className="log-in-and-register">
      <div className="image">
        <img
          src="https://songhao2103.github.io/IMG_du_an_REACT/ecommerce/media/dl.beatsnoop%201.png"
          alt=""
        />
      </div>

      <FormLogIn></FormLogIn>
      {/* <FormRegister></FormRegister> */}
    </div>
  );
};

export default LogInAndRegister;
