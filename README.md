# wasteNot - Food Waste Prevention App

A simple, sleek iPhone app built using React Native, Ruby on Rails, and PostgreSQL. wasteNot allows a user to log the food they have in their home, keeping track of quantities and expiration dates. This helps the user to prevent food waste, clearly showing what foods will expire soon.

## Table of Contents
* [General Info and Demo](#general-info)
* [Images](#images)
* [Technologies and Libraries Used](#technologies-and-libraries-used)
* [Setup](#setup)
* [Status](#status)
* [Sources](#sources)

## General Info

wasteNot is an iOS application that helps a user keep track of the food they have in their house, along with quantities and expiration date information. This helps prevent food waste by showing the user what foods will expire soon.

* [Video demo (YouTube)](https://www.youtube.com/watch?v=CMciJQn_SA4&feature=youtu.be)
* [Back-End repository](https://github.com/kenave/wasteNot_back)

## Images

<img src="/images/inventory_screen.PNG" alt="sample inventory screen" width="300"> <img src="/images/new_item.PNG" alt="new item screen" width="300"> <img src="/images/expired_milk.PNG" alt="expired milk" width="300">
<img src="/images/quantity_slider.PNG" alt="tap and hold to bring up the quantity slider for liquids or container items" width="300"> <img src="/images/eggs.PNG" alt="these eggs are about to expire, we should probably cook them!" width="300"> <img src="/images/quantity_picker.PNG" alt="tap and hold to bring up the quantity picker for counted items" width="300">

## Technologies and Libraries Used

### Front-End
* React 16.9.0
  * React Libraries:
  * Formik 2.1.2
* React Native via Expo 36.0.0
  * React Native Libraries:
  * @react-native-community/datetimepicker 2.1.0
  * @react-native-community/slider 2.0.8

### [Back-End](https://github.com/kenave/wasteNot_back)
* Ruby 2.6.1
* Rails 6.0.2.1 - back end and API framework
* PostgreSQL 12 - database
* ngrok 2.3.35 - used to expose local server to iPhone
* yup 0.28.0 - form validation
* bundler 2.0.2

## Steps to test wasteNot using Expo App

0. Pre-requisites: PostgreSQL 12 installed and running, Ruby 2.6, Rails 6. An iOS simulator (Mac only) installed via [this tutorial](https://docs.expo.io/workflow/ios-simulator/), or an iPhone with the Expo App (via [Apple App Store](https://apps.apple.com/us/app/expo-client/id982107779)) is also required.
1. Fork and clone the front end and [back end](https://github.com/kenave/wasteNot_back) repositories into a shared root folder.
2. Via terminal/console, navigate to `wasteNot_back` and run `bundle install`.
3. Run `rails db:create`.
4. Run `rails db:migrate`.
5. Run `rails db:seed`. This will give you a test account with the name `TestUser`.
6. Run `rails s`, taking note of the port (should be 3000).
7. In a new terminal window, run `ngrok http 3000` (replacing 3000 with the necessary port). Copy the http link listed under 'forwarding'.
8. Navigate to `/wasteNot_back/config/environments/development.rb`.
9. Replace the ngrok.io link on line 9 with the copied link from step 7, removing 'http://'.
10. Navigate to `/wasteNot_front/shared/ngrok.js`.
11. Replace the ngrok.io link on line 1 with the copied link from step 7.
12. Via terminal/console, navigate to `wasteNot_front` and run `yarn install`.
13. Run `expo start`. The expo developer tools will open in a browser window.
14. If using the simulator, select `Open in iOS Simulator`. Otherwise, scan the QR code with your iPhone and select the option to open in Expo.
15. Enjoy testing wasteNot! The app is easy to use, but you can see a full video demo [here](https://www.youtube.com/watch?v=CMciJQn_SA4&feature=youtu.be).

## Status

Development on wasteNot is currently paused as I focus time and effort on finding a software development job.

If I were to continue to work on wasteNot, I would build functionality starting with the following:
1. Improve sorting of items on the main inventory screen. Allow sorting by overall quantity, name, and nearest expiration date.
2. Deploy the back end to a home server or cloud based server to allow for functionality without the use of ngrok.
3. Implement user creation.
3. Add dark mode functionality. There is currently a bug with the date-picker modal that shows the dates as invisible if the phone is set to dark mode.
4. Add search functionality.

## Sources
* Inspired by and modeled after a [React Native tutorial series](https://www.youtube.com/playlist?list=PL4cUxeGkcC9ixPU-QkScoRBVxtPPzVjrQ) by The Net Ninja
* [React Native documentation](https://reactnative.dev/docs/getting-started)
