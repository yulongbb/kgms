import { render } from '@testing-library/react';

import LibReact from './lib-react';

describe('LibReact', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LibReact />);
    expect(baseElement).toBeTruthy();
  });
});
