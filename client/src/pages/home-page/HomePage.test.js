import React, { } from 'react';
import { shallow } from 'enzyme';

import HomePage from './HomePage';
import HomeLanding from '../../components-home/home-landing/HomeLanding';
// import { findByTestAttribute } from '../../utils/testUtils';

// *************************** HOME PAGE TESTS *************************** //
describe('HomePage.js Component Tests', () => {
  let wrapper;

  const findByTestAttribute = (wrapper, val) => {
    return wrapper.find(`[test-attr="${val}"]`)
  };

  // Render a ShallowWrapper of HomePage.js component before each test runs
  beforeEach(() => {
    wrapper = shallow(<HomePage />);
  });

  test('renders HomePage.js without crashing', () => {
    const componentHomePage = findByTestAttribute(wrapper, 'component-homepage');
    expect(componentHomePage.length).toBe(1);
  });

  test('renders 1 instance of HomeLanding.js component', () => {
    expect(wrapper.find(HomeLanding).length).toBe(1);
  });

});