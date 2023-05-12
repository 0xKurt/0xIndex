import React, { useState, useRef, useEffect } from "react";
import { Image } from "react-bootstrap";
import ProjectMenu from "./ProjectMenu";
function Project({ project, width }) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isTextClamped, setIsTextClamped] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setIsTextClamped(
        descriptionRef.current.scrollHeight >
          descriptionRef.current.clientHeight,
      );
    }
  }, [project.description]);

  const toggleDescription = (event) => {
    event.preventDefault();
    setShowFullDescription(!showFullDescription);
  };

  const shortDescriptionStyle = {
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    cursor: "pointer",
  };

  const fullDescriptionStyle = {
    overflow: "visible",
    display: "block",
    cursor: "pointer",
  };

  const onClickLink = () => {
    window.open(project.link, "_blank");
  };

  return (
    <tr key={Math.floor(Math.random() * 9999998) + 1}>
      <td>
        <div style={{ display: "flex", width}}>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "flex-start",
              fontWeight: "700",
              color: "grey",
            }}
            onClick={() => setShowMenu(!showMenu)}
          >
            &#8942;
            <ProjectMenu show={showMenu} />
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ cursor: "pointer" }} onClick={onClickLink}>
              <Image
                src={`${process.env.REACT_APP_API}/data/protocols/${project.image}`}
                roundedCircle
                width={50}
                height={50}
              />
            </div>
            <div style={{ flex: 1, marginLeft: "10px" }}>
              <div
                href={project.link}
                style={{ fontWeight: "700", cursor: "pointer" }}
                onClick={onClickLink}
              >
                {project.name}
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div
                    ref={descriptionRef}
                    style={
                      showFullDescription
                        ? fullDescriptionStyle
                        : shortDescriptionStyle
                    }
                    onClick={onClickLink}
                  >
                    {project.description}
                  </div>
                  {isTextClamped && (
                    <div>
                      <div
                        onClick={toggleDescription}
                        style={{
                          color: "grey",
                          textDecoration: "none",
                          cursor: "pointer",
                        }}
                      >
                        {showFullDescription ? "less" : "more"}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default Project;