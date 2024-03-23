import loading from "../assets/loading.gif";

const spinner = () => {
  return (
    <div>
      <img src={loading} alt="loading" />
    </div>
  );
};

export default spinner;
