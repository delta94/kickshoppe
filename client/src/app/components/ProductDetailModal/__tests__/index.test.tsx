/**
 *
 * Tests for ProductDetailModal
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ProductDetailModal from 'app/components/ProductDetailModal'

const defaultProps = {}

const renderSubject = props => render(
  <ProductDetailModal {...defaultProps} {...props} />
)

afterEach(cleanup);

describe(ProductDetailModal, () => {
  it('should render on load', () => {
    renderSubject({})
  });
});