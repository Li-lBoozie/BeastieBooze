const { User, Drink, Review, CalEntry, BarCrawl } = require('./Models');

// getUser should take a userId and return the found user, empty array or null if not found?
const getUser = async (id) => {
  try {
    const user = await User.find({ googleId: id });
    return user;
  } catch (err) {
    console.log('getUser failed', err);
  }
};

// createUser should take a user object ({ googleId, username }) which should make a new user entry in the db
const createUser = async (userObj) => {
  const { googleId, givenName: username, imageUrl } = userObj;

  try {
    const newUser = await User.create({ googleId, username, imageUrl });
    return newUser;
  } catch (err) {
    console.log('createUser failed', err);
  }
};

const findAndUpdate = async (id, data) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $push: { creations: data } },
    { new: true }
  );
  return updatedUser;
};

const findAndUpdateFavorites = async (id, data) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $push: { favorites: data } },
    { new: true }
  );
  return updatedUser;
};

const findAndDeleteFavorites = async (id, drinkId) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $pull: { favorites: { favId: drinkId } } },
    { new: true }
  );
  return updatedUser;
};

// Adds a review to the review model with information on author, drink and review.
const addReviews = async (data) => {
  const reviewList = await Review.create({
    googleId: data.id,
    review: data.review,
    drinkId: data.drinkId,
    username: data.username,
  });
  return reviewList;
};

// Gets all reviews for a given drink id.
const findDrinkReviews = async (id) => {
  const drinkReviews = await Review.find({ drinkId: id });
  // .populate('Review')
  // .exec((err) => {
  //   console.error(err);
  // });
  return drinkReviews;
};

const getEvent = async (date, startTime, id) => {
  try {
    const event = await CalEntry.find({
      date: date,
      startTime: startTime,
      user: id,
    });
    return event;
  } catch (err) {
    console.log('getUser failed', err);
  }
};

const getEventsByDate = async (date) => {
  try {
    const events = await CalEntry.find({ date: date });
    return events;
  } catch (err) {
    console.log('getUser failed', err);
  }
};


const createEvent = async (data) => {
  try {
  const newEvent = await CalEntry.create({
    name: data.name,
    date: data.date,
    type: data.type,
    description: data.description,
    startTime: data.startTime,
    endTime: data.endTime,
    location: data.location,
    invited: data.invited
  })
  return newEvent
  } catch (err) {
    console.log('createNewEvent failed', err);
  }
};

const findAndUpdateEvent = async (date, startTime, data) => {
  const updatedEvent = await CalEntry.findOneAndUpdate({ new: true });
  return updatedEvent;
};

const findAndDeleteDay = async (date) => {
  const deleteEvent = await CalEntry.deleteMany({ date: date });

  return deleteEvent;
};

const findAndDeleteEvent = async (date, startTime, id) => {
  const deleteEvent = await CalEntry.deleteOne({
    date: date,
    startTime: startTime,
  });

  return deleteEvent;
};

// const addBarCrawl = async (barCrawl) => {
//   const newBarCrawl = new BarCrawl({
//     name: barCrawl.name,
//     breweryList: barCrawl.barCrawl,
//   });
//   await newBarCrawl.save();
// }

// const addBrewery = async (brewery) => {
//   const newBrewery = new BarCrawl({
//     name: brewery.name,
//     street: brewery.address_1,
//     city: brewery.city,
//     zipCode: brewery.postal_code,
//     breweryList: brewery.breweryList,
//   });
//   await newBrewery.save();
// };

module.exports = {
  getUser,
  createUser,
  findAndUpdate,
  findAndUpdateFavorites,
  findAndDeleteFavorites,
  addReviews,
  findDrinkReviews,
  getEvent,
  createEvent,
  findAndUpdateEvent,
  findAndDeleteEvent,
  findAndDeleteDay,
  getEventsByDate,
  // addBrewery,
  // addBarCrawl,
};
