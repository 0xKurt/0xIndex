const Brand = ({size}) => {
  return (
    <span style={{ color: "gray", letterSpacing: "1px", fontSize: size }} className="brandtext">
      all<b style={{ color: "white", opacity: "0.5" }}>ecosystems</b>.xyz
    </span>
  );
};

export default Brand;
