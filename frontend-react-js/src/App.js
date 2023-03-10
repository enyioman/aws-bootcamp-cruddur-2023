import './App.css';

import HomeFeedPage from './pages/HomeFeedPage';
import NotificationsFeedPage from './pages/NotificationsFeedPage';
import UserFeedPage from './pages/UserFeedPage';
import SignupPage from './pages/SignupPage';
import SigninPage from './pages/SigninPage';
import RecoverPage from './pages/RecoverPage';
import MessageGroupsPage from './pages/MessageGroupsPage';
import MessageGroupPage from './pages/MessageGroupPage';
import ConfirmationPage from './pages/ConfirmationPage';
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import { Amplify } from 'aws-amplify';

Amplify.configure({
  "AWS_PROJECT_REGION": 'us-east-1',
  "aws_cognito_region": 'us-east-1',
  "aws_user_pools_id": 'us-east-1_KFMpUSnP5',
  "aws_user_pools_web_client_id": '64s0p05ggkhfa6a8ni2ak9djf5',
  "oauth": {},
  Auth: {
    // We are not using an Identity Pool
    // identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID, // REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1',           // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_KFMpUSnP5',         // OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '64s0p05ggkhfa6a8ni2ak9djf5',   // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
  }
});

// Amplify.configure({
//   "AWS_PROJECT_REGION": process.env.REACT_APP_AWS_PROJECT_REGION,
//   "aws_cognito_region": process.env.REACT_APP_AWS_COGNITO_REGION,
//   "aws_user_pools_id": process.env.REACT_APP_AWS_USER_POOLS_ID,
//   "aws_user_pools_web_client_id": process.env.REACT_APP_CLIENT_ID,
//   "oauth": {},
//   Auth: {
//     // We are not using an Identity Pool
//     // identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID, // REQUIRED - Amazon Cognito Identity Pool ID
//     region: process.env.REACT_APP_AWS_PROJECT_REGION,           // REQUIRED - Amazon Cognito Region
//     userPoolId: process.env.REACT_APP_AWS_USER_POOLS_ID,         // OPTIONAL - Amazon Cognito User Pool ID
//     userPoolWebClientId: process.env.REACT_APP_CLIENT_ID,   // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
//   }
// });

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeFeedPage />
  },
  {
    path: "/notifications",
    element: <NotificationsFeedPage />
  },
  {
    path: "/@:handle",
    element: <UserFeedPage />
  },
  {
    path: "/messages",
    element: <MessageGroupsPage />
  },
  {
    path: "/messages/@:handle",
    element: <MessageGroupPage />
  },
  {
    path: "/signup",
    element: <SignupPage />
  },
  {
    path: "/signin",
    element: <SigninPage />
  },
  {
    path: "/confirm",
    element: <ConfirmationPage />
  },
  {
    path: "/forgot",
    element: <RecoverPage />
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;