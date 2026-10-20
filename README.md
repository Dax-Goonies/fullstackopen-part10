# Rate Repository App

A mobile application for rating GitHub repositories. Users can browse GitHub-style repositories, view individual repository details and reviews, and create new reviews when signed in. The app is built with React Native and Expo, and it uses a GraphQL API as its backend. Created as part of Full Stack Open, part 10.

## Try the App on Your Phone

You can try the app on your phone by scanning the following QR code with Expo Go:

![QR code for testing the app](./qr-code.svg)

**Note on Android:** Expo Go on Android (client version 57.0.9) has a confirmed, open bug that prevents EAS Update downloads from completing ([expo/expo#50139](https://github.com/expo/expo/issues/50139)). The Expo team has identified the root cause and a fix is pending release in a future Expo Go build. The app itself works correctly and has been verified via an Android emulator with a newer Expo Go build, as well as locally. If the QR code fails to load on an Android device with Expo Go 57.0.9, this known upstream issue is the cause, not the app.

## Features

- Browse and search GitHub repositories, with sorting by latest or highest/lowest rated
- View a repository's details, stats, and reviews
- Sign up and sign in
- Create, view, and delete your own reviews
- Infinite scrolling / pagination for the repository list

## Tech Stack

- React Native, Expo
- Apollo Client (GraphQL)
- React Router Native
- Formik + Yup
- Jest + React Native Testing Library

## Running Locally

1. Clone this repository.
2. Set up and run the [Rate Repository API](https://github.com/fullstack-hy2020/rate-repository-api) locally, following its own README.
3. In `rate-repository-app/`, create a `.env` file with `EXPO_PUBLIC_APOLLO_URI` pointing at your local API instance.
4. Run `npm install` followed by `npm start`.