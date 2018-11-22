export const mockDealer = {
  brandId: 'lalalala',
  organizationId: 'lelelele',
  regionId: 'lulululu',
  legacyDealerId: 'MB0001',
  name: 'Peter\'s Cars',
  address: {
    name: 'Peter\'s Cars',
    entity: 'The Mighty Peter',
    streetNumber: '123',
    route: 'Main Street',
    locality: 'What is locality?',
    subdivision: 'Mr. Rogers\' Neighborhood',
    county: 'Fairfax County',
    country: 'United State of America',
    postalCode: '20171',
    postalCodeSuffix: '4567',
    display: 'Peter\'s Cars\n123 Main Street\nHerndon, VA 20171'
  },
  url: 'http://www.peterscars.com',
  email: 'suckitup@walkitoff.com',
  phone: {
    countryCode: '1',
    areaCode: '877',
    prefix: '615',
    DID: '3187',
    display: '+1 (877) 615-3187'
  },
  timeZone: 'Eastern Standard (-5:00)',
  contact: {
    name: 'Peter',
    title: 'The Mighty',
    email: 'suckitup@walkitoff.com',
    phone: '+1 (877) 615-3187'
  },
  hours: [
    {
      day: 0,
      open: new Date('January 1, 1970 12:00:00'),
      close: new Date('January 1, 1970 18:00:00'),
      display: 'Sunday 9am - 9pm'
    },
    {
      day: 1,
      open: new Date('January 1, 1970 09:00:00'),
      close: new Date('January 1, 1970 21:00:00'),
      display: 'Monday 9am - 9pm'
    },
    {
      day: 2,
      open: null,
      close: null,
      display: 'Tuesday 9am - 9pm'
    },
    {
      day: 3,
      open: new Date('January 1, 1970 09:00:00'),
      close: new Date('January 1, 1970 21:00:00'),
      display: 'Wednesday 9am - 9pm'
    },
    {
      day: 4,
      open: new Date('January 1, 1970 09:00:00'),
      close: new Date('January 1, 1970 21:00:00'),
      display: 'Thursday 9am - 9pm'
    },
    {
      day: 5,
      open: new Date('January 1, 1970 09:00:00'),
      close: new Date('January 1, 1970 21:00:00'),
      display: 'Friday 9am - 9pm'
    },
    {
      day: 6,
      open: new Date('January 1, 1970 09:00:00'),
      close: new Date('January 1, 1970 21:00:00'),
      display: 'Saturday 9am - 9pm'
    }
  ],
  holidays: [
    {
      date: new Date('November 22, 2018 00:00:00'),
      open: null,
      close: null
    },
    {
      date: new Date('November 23, 2018 00:00:00'),
      open: new Date('January 1, 1970 12:00:00'),
      close: new Date('January 1, 1970 17:00:00')
    },
    {
      date: new Date('December 12, 2018 00:00:00'),
      open: null,
      close: null
    },
    {
      date: new Date('December 13, 2018 00:00:00'),
      open: new Date('January 1, 1970 12:00:00'),
      close: new Date('January 1, 1970 17:00:00')
    }
  ]
};
