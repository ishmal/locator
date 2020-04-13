# locator
A simple library for Maidenhead locators.  It converts from decimal latitude and
longitude to a Maidenhead specification and back.

Usage:

const covertor = new Locator();

This returns an array with the left longitude, bottom latitude, and width and height
of the Maidenhead box, all in decimal degrees.
const bounds = convertor.locatorToLatLon("EM10");


const locator converter.latLonToLocator(35.456, -47.123)
