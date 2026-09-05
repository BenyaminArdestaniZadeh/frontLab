const template = (variables, options) => {
  const { tpl } = options; // Destructure `tpl` from `options`
  return tpl`
            import * as React from 'react';
            import { SVGProps } from 'react';
            const ${variables.componentName} = (props: SVGProps<SVGSVGElement>) => (
              ${variables.jsx}
            );
            export default ${variables.componentName};
          `;
};
module.exports = template;
