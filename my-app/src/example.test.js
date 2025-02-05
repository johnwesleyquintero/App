import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Example Test Suite', () => {
  it('should demonstrate custom error messages', () => {
    const expectedValue = 5;
    const actualValue = 10;

    expect(actualValue).toBe(expectedValue, 'The actual value does not match the expected value');
  });

  it('should render Button component correctly', () => {
    const tree = renderer.create(<Button onClick={() => {}}>Click me</Button>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
