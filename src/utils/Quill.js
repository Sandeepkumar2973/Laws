// src/utils/quillModules.js
import Quill from "quill";
import TableUI from "quill-table-ui";
import "quill-table-ui/dist/index.css";
// import "./quill.css"

// Register TableUI
Quill.register(
  {
    "modules/tableUI": TableUI,
  },
  true
);

// Line-height style
const Parchment = Quill.import("parchment");

// Custom font-size style
const SizeStyle = new Parchment.Attributor.Style("size", "font-size", {
  scope: Parchment.Scope.INLINE,
  whitelist: [
    "10px",
    "11px",
    "12px",
    "13px",
    "14px",
    "15px",
    "16px",
    "18px",
    "20px",
    "24px",
    "28px",
    "32px",
  ],
});
Quill.register(SizeStyle, true);
const LineHeightStyle = new Parchment.Attributor.Style(
  "lineheight",
  "line-height",
  {
    scope: Parchment.Scope.BLOCK,
    whitelist: ["1", "1.2", "1.5", "2", "2.5", "3"],
  }
);
Quill.register(LineHeightStyle, true);

// Text-transform style (capitalization)
const TextTransformStyle = new Parchment.Attributor.Style(
  "texttransform",
  "text-transform",
  {
    scope: Parchment.Scope.INLINE,
    whitelist: ["none", "uppercase", "lowercase", "capitalize"],
  }
);
Quill.register(TextTransformStyle, true);

// ✅ Define toolbar labels for the dropdown
const Picker = Quill.import("ui/picker");
const icons = Quill.import("ui/icons");

icons["texttransform"] = "";
const textTransformValues = ["none", "uppercase", "lowercase", "capitalize"];
const textTransformLabels = {
  none: "None",
  uppercase: "UPPERCASE",
  lowercase: "lowercase",
  capitalize: "Capitalize",
};

class TextTransformPicker extends Picker {
  constructor(select, container) {
    super(select, container);
    this.update();
  }

  update() {
    const value = this.select.value || this.select.options[0].value;
    this.label.innerHTML = textTransformLabels[value] || value;
  }
}

// Register the custom UI so Quill shows labels
Quill.register("modules/texttransformPicker", TextTransformPicker);

export const modules = {
  toolbar: [
    [
      { font: [] },
      {
        size: [
          "10px",
          "11px",
          "12px",
          "13px",
          "14px",
          "15px",
          "16px",
          "18px",
          "20px",
          "24px",
          "28px",
          "32px",
        ],
      },
    ],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["table"],
    ["clean"],
    [{ lineheight: ["1", "1.2", "1.5", "2", "2.5", "3"] }],
    [{ texttransform: ["none", "uppercase", "lowercase", "capitalize"] }],
  ],
  tableUI: true,
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "align",
  "table",
  "lineheight",
  "texttransform",
];
