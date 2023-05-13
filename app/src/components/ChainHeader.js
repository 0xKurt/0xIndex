import Brand from "./Brand";
import CopyLink from "./CopyLink";

const ChainHeader = ({ network }) => {
  return (
    <div className="d-flex align-items-center mb-3" style={{ padding: "40px" }}>
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "50%",
          backgroundColor: "lightgrey",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          marginRight: "10px",
        }}
      >
        <img
          src={
            process.env.REACT_APP_API + "/data/blockchains/" + network?.image
          }
          alt={network?.name}
          width="70"
          height="70"
        />
      </div>
      <div style={{ marginLeft: "20px", opacity: "0.9" }}>
        <h1 className="m-0">
          {network?.name} <CopyLink link={window.location.href} />
        </h1>
        <span style={{ fontSize: "20px" }}>
          <Brand />
        </span>
      </div>
    </div>
  );
};

export default ChainHeader;
