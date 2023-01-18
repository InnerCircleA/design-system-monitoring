/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import totalTracking from '../../total-tracking.json';
import Code from './CodeBlock';

type PageTracking = typeof totalTracking[number];
type ComponentTracking = PageTracking['components'][number];

const convertPropsValueToText = (
  value: string | { type: string; value: string }
) => {
  if (typeof value === 'object') {
    return `{${value.value}}`;
  }
  return `"${value}"`;
};

const convertPropsToText = (
  key: string,
  value: string | { type: string; value: string }
) => {
  return `${key}=${convertPropsValueToText(value)}`;
};

const ComponentUsecase: React.FC<{ componentTracking: ComponentTracking }> = ({
  componentTracking,
}) => {
  const componentPropsText = Object.entries(componentTracking.props)
    .filter(([key]) => key !== 'children')
    .map(([key, value]) => convertPropsToText(key, value))
    .join(' ');
  const spreadPropsText = componentTracking.spread ? ' { ...somthing }' : '';

  const propsText = `${componentPropsText}${spreadPropsText}`;
  const componentName = componentTracking.alias;
  const childrenText = convertPropsValueToText(
    componentTracking.props.children
  );

  const componentText = `<${componentName} ${propsText}>${childrenText}</${componentName}>`;

  return (
    <div style={{ marginBottom: 10 }}>
      <Code language="jsx" code={componentText}></Code>
    </div>
  );
};

export const UsecaseTable: React.FC<{ componentName: string }> = ({
  componentName,
}) => {
  return (
    <div>
      {totalTracking.map((page) => (
        <div>
          <h2>
            {page.project}/{page.path} 페이지
          </h2>
          <h3>Usecases</h3>
          {(page.components as ComponentTracking[])
            .filter((c: ComponentTracking) => c.name === componentName)
            .map((componentTracking) => (
              <ComponentUsecase componentTracking={componentTracking} />
            ))}
        </div>
      ))}
    </div>
  );
};
