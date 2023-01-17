import React from 'react';
import Button from './Button';
import totalTracking from '../../total-tracking.json';

const COMPONENT_NAME = Button.name;

export default {
  title: 'components/button',
  component: Button,
  parameters: {},
};

export const primaryButton = () => <Button theme="primary">Button</Button>;

export const secondaryButton = () => <Button theme="secondary">Button</Button>;

export const usecase = () => {
  return (
    <div>
      <h1>{Button.name}</h1>
      <div>
        {totalTracking.map((page) => (
          <div>
            <h2>
              {page.project}/{page.path} 페이지
            </h2>
            <p>
              {page.components.map((c) => c.name === COMPONENT_NAME).length} 번
              사용
            </p>
            <h3>Usecases</h3>
            {page.components.map((component) => {
              const propsText = Object.entries(component.props)
                .filter(([key]) => key !== 'children')
                .map(([key, value]) => {
                  if (typeof value === 'object') {
                    return `${key}={${value?.['value']}}`;
                  }
                  return `${key}="${value}"`;
                })
                .join(' ');
              return (
                <div style={{ marginBottom: 10 }}>
                  <span>{`<${component.alias} ${propsText}>${component.props.children}</${COMPONENT_NAME}>`}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
