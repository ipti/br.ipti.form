import { CSSProperties } from "react";
import ReactQuill from "react-quill";
import "./editor.css";
import "react-quill/dist/quill.snow.css";

interface QuillEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: any) => void;
  style?: CSSProperties;
  placeholder?: string;
  height?: number;
  readOnly?: boolean;
}

const QuillEditor = ({
  value = "",
  onChange,
  onBlur,
  style,
  placeholder = "",
  height = 240,
  readOnly = false,
}: QuillEditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      placeholder={placeholder || "Escreva aqui..."}
      readOnly={readOnly}
      style={{ minHeight: `${height}px`, ...style }}
      modules={{
        toolbar: {
          container: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            [{ align: [] }],
            ["link"],
            // ["video"],
            // ["code-block"],
            // ["clean"],
          ],
        },
        clipboard: {
          matchVisual: false,
        },
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "align",
        "video",
        "code-block",
      ]}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default QuillEditor;
