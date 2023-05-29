import Box from "@mui/material/Box";
import Quill from "quill";
import styled from "@emotion/styled";
import "../style/Editor.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useScrollTrigger } from "@mui/material";

const Component = styled.div`
  background: #f5f5f5;
`;

var toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const Editor = () => {
  const [quill, setQuill] = useState();
  const [socket, setSocket] = useState();

  /**
   * Instantiate Quill on componentDidMount
   */
  useEffect(() => {
    const quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: toolbarOptions,
      },
    });
    setQuill(quill);
  }, []);

  /**
   * Setup connection with the Server Side
   */
  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Component>
      <Box id="editor"></Box>
    </Component>
  );
};

export default Editor;
