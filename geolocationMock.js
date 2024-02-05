const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;
// Include jsdom-global to simulate a DOM environment
const jsdom = require('jsdom-global')();
