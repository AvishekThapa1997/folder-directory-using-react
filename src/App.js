import data from "./data.json";
import "./App.css";
import { FaFolderPlus, FaFolderMinus, FaFile } from "react-icons/fa";
import { useState, useRef } from "react";
import { Transition } from "react-transition-group";

function App() {
  return (
    <div className="App">
      {data.map((file) => {
        return <Directory key={file.name} file={file} />;
      })}
    </div>
  );
}

const Directory = ({ file }) => {
  return file.type.toLowerCase() === "folder" ? (
    <Folder name={file.name} files={file.files} />
  ) : (
    <File name={file.name} />
  );
};

const Folder = ({ name, files }) => {
  const [isExpand, setExpand] = useState(false);
  const subFolderRef = useRef();
  const expandHandler = (event) => {
    setExpand((prevState) => !prevState);
  };
  const defaultStyle = {
    paddingLeft: "2rem",
    transformOrigin: "top",
    transform: "scaleY(0)",
    transition: "transform 0.3s",
  };
  const transitionStyles = {
    entered: {
      transform: "scaleY(1)",
    },
    entering: {
      transform: "scaleY(0)",
    },
  };
  return (
    <div className="folder">
      <p className="folder__name">
        {isExpand ? (
          <FaFolderMinus
            onClick={expandHandler}
            style={{ cursor: "pointer" }}
          />
        ) : (
          <FaFolderPlus onClick={expandHandler} style={{ cursor: "pointer" }} />
        )}
        {name}
      </p>
      {files?.length ? (
        <Transition
          in={isExpand}
          nodeRef={subFolderRef}
          timeout={100}
          appear={isExpand}
          unmountOnExit={true}
        >
          {(state) => {
            return (
              <div
                className="sub"
                style={{ ...defaultStyle, ...transitionStyles[state] }}
                ref={subFolderRef}
              >
                {files.map((file) => (
                  <Directory key={file.name} file={file} />
                ))}
              </div>
            );
          }}
        </Transition>
      ) : null}
    </div>
  );
};

const File = ({ name }) => {
  return (
    <p className="file__name">
      <FaFile />
      {name}
    </p>
  );
};
export default App;
