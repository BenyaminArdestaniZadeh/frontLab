import * as React from "react";
import { SVGProps } from "react";
const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path fill="#fff" fillOpacity={0.01} d="M0 0h16v16H0z" />
    <path
      fill="#FCFCFD"
      fillRule="evenodd"
      d="M12.567 4.3a.613.613 0 1 0-.868-.867L8 7.133 4.3 3.433a.613.613 0 0 0-.867.867l3.7 3.7-3.7 3.7a.613.613 0 0 0 .867.867l3.7-3.7 3.7 3.7a.613.613 0 1 0 .867-.867L8.867 8z"
      clipRule="evenodd"
    />
  </svg>
);
export default SvgClose;
