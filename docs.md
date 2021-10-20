# Main

- post category
- only logged in users can create/comment on post - maybe
- down/upvote option - only logged in users
- sorting option for posts on homepage
- search functionality
- replace netlify identity to allow user profiles or extend netlify identity to allow such features

# Currently working on / Planned next feature

# Completed

- logged in/out notification ✅
- add reply feature ✅
- color icon ✅
- Content Card: add total comments, add date created/updated, add who created post ✅
- comment sorting option ✅
- use localstorage to check if person visited app or not, if so then don't show modal to let them know about the state of the project ✅
- edit option for logged in users ✅
- delete option for logged in users ✅
- animation between page transitions ✅
- converted content <input> to <textarea> for <Post/> (content creation) and <Form> (comment submission)
- title/content/readmore shorten function updated (home page only) ✅

# Notes:

- <Post /> (sends POST request) to create a new post and <Form> (sends PUT request) will update the forum data, like the comments field.
- <Content /> allows authenciated users to update/delete their posts.
- <Nav> and <Content> navigate users, like '/'->'/post' or '/post' -> '/'

# Implementation Considertion
