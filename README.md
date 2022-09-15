
<div align="center">
  <img src="/public/logo.png" height="100" width="100" alt="logo"/>
  <h1>Bakin Zone</h1>
    <p>Are you also the foodie? Do you love Desserts? <a href="https://bakinzone.netlify.app/">Bakin Zone</a> is for you! Its the Video Library which helps you in baking different desserts like Cakes, Muffins, Donuts, Cookies and Pastries! Checkout the source code for backend <a href="https://github.com/romabulani/bakinzone-backend">here</a>.</p>
 </div>

## How to run the app locally?
```
$ git clone https://github.com/romabulani/BakinZone.git
$ cd BakinZone
$ npm install
$ npm start
```

## Screens in this project
- Landing Page
- Video Listing Page
- Authentication (Login, Signup and Logout) Pages
- Single Video Page
- Playlist Management Page
- Watch Later Page
- Watch History Page
- Liked Videos Page
- Upload Video Page
- 404 (Not Found) Page

## Features
- Landing Page with Featured Categories. User can navigate to video listing page by selecting category.
- Video Listing Page with options of Watch Later, create new Playlist, add or remove the video from Playlist. Filter videos based on category. Sort video by latest date.
- Persistent Search Functionality, search works even after page refresh.
- Single Video Page - User can like video, add to watch Later, Add/Remove from Playlist. Notes on every video with sorting of notes in descending order based of playing time of video. User can add, edit and delete notes. On playing the video, it will be added in watch history and Custom View Count will be increased.
- Playlist Management Page, consists of all custom Playlists, user can browse in playlist, delete video from playlist and delete playlist.
- Watch Later Page - User can delete the video from Watch Later.
- Watch History Page - User can delete the video from Watch History and can even Clear Watch History.
- Liked Videos Page - User can delete the video from Liked Videos.
- Upload Video Page - User can upload the video by giving Youtube URL, title, description and category. All necessary Validations are done here. If the video already exists, it wont be uploaded.
- Toggle Theme - Light and Dark Theme, theme is persistent even after page refresh.
- Alerts in the app to notify the users about success/failure operations.
- All the screens are Responsive.

## Tech Stack and Tools
- React JS
- React Router v6
- React Context API + useReducer
- Vanilla CSS integrated with [Muffin UI](https://muffinui.netlify.app/) Component Library
- Git For Version Control
- Netlify for Deployment
- Cloudinary for Image Hosting of Video Thumbnails
- React Player

## Live Link
[Bakin Zone](https://bakinzone.netlify.app/)

## Demo Video


https://user-images.githubusercontent.com/42478246/162221766-eaab1882-4da0-49d0-a333-0c53f94fb1dc.mp4





