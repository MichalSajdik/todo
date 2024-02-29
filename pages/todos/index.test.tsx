import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import TodosPage from './index';
import React from 'react';

describe('TodosPage', () => {
  it('renders a heading', () => {
    const { container } = render(<TodosPage/>);

    expect(container).toBeInTheDocument();
  });
});