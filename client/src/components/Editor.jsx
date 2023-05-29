import Box from "@mui/material/Box";
import Quill from "quill";
import styled from "@emotion/styled";
import "../style/Editor.css";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

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
  const { id } = useParams();
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
    quill.disable();
    quill.setText("Loading the document ...");
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

  /**
   * Detect Text Change made by the User/Author
   */
  useEffect(() => {
    if (!socket || !quill) return;

    const handleChange = (delta, oldDelta, source) => {
      if (source !== "user") return;

      socket.emit("send-user-changes", delta);
    };

    quill && quill.on("text-change", handleChange);

    return () => {
      quill && quill.off("text-change", handleChange);
    };
  }, [quill, socket]);

  /**
   * Receive the Text Change made by the User/Author by ALL other users
   */
  useEffect(() => {
    if (!socket || !quill) return;

    const handleChange = (delta) => {
      quill.updateContents(delta);
    };

    socket && socket.on("receive-user-changes", handleChange);

    return () => {
      socket && socket.off("receive-user-changes", handleChange);
    };
  }, [quill, socket]);

  /**
   * Fetch and load a document
   */
  useEffect(() => {
    if (!quill || !socket) return;

    socket &&
      socket.once("load-document", (document) => {
        console.log(document);
        quill.enable();
      });

    socket && socket.emit("get-document", id);
  }, [quill, socket, id]);

  return (
    <Component>
      <Box id="editor"></Box>
    </Component>
  );
};

export default Editor;
