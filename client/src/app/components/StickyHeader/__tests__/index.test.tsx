/**
 *
 * Tests for StickyHeader
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import StickyHeader from 'app/components/StickyHeader'

const defaultProps = {}

const renderSubject = props => render(
  <StickyHeader {...defaultProps} {...props} />
)

afterEach(cleanup);

describe(StickyHeader, () => {
  it('should render on load', () => {
    renderSubject({})
  });
});