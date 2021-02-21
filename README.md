# Athens Project

#### This repository is for the [Cursors] does the entire fucking thing in one week challenge

**Athens Project Routing**
_A \* means authentication is required._
_Routes_

```
/                             Home page
/notes*                       User's notes
/notes/:id*                   View and manage a note
/outlines*                    User's outlines
/outlines/:id*                View and manage an outline
/settings*                    User's settings
/premium*                     View premium plans
```

_API Routes_

```
/auth                         GET        Authentication
/auth/redirect                GET        Callback URI
/auth/logout                  GET        Log out
/api/notes/:username          GET        User's notes
/api/outlines/:username       GET        User's outlines
/api/edit/note*               POST       Edit a note
/api/edit/outline*            POST       Edit an outline
/api/delete/note*             POST       Delete a note
/api/delete/outline*          POST       Delete an outline
/api/new/note*                POST       Create a new note
/api/new/outline*             POST       Create a new outline
/api/explore?q=:query         GET        Search other notes and outlines
/api/user/delete*             POST       Delete user's account
/api/user/username*           POST       Update user's username
/api/user/premium/:plan*      POST       Update user's premium plans
/api/user/premium/remove*     POST       Remove user's premium plans
```

**Athens Project Database User Schema**

```
_id              User's email
username         User's username
avatar           User's avatar
notes            User's notes
  name
  note
  website
  private
  id
outlines         User's outlines
  name
  outline
  private
  id
premium          User's premium plans
isSubscribed     Is the user subscribed (so we can get that moolah every month)
```

**Athens Project Packages**
_Excluding type definitions_

```
next                  Next.js
react                 React.js
react-dom             React.js DOM
express               Custom server
passport              Authentication
passport-github       GitHub Authentication Strategy
mongodb               Database driver
mongoose              MongoDB ORM
remark                Markdown parser
uuid                  UUID generation
```

**Athens Project Limits**

```
notes          48 notes
  name         64 chars
  note         1024 chars
  website      256 chars
outlines       12 outlines
  name         72 chars
  outline      4096 chars
```

**Athens Project Premium Perks**
_Privacy ($1/month) – Make private notes and outlines_
_More Notes ($2/month) – Note limit is doubled_
_More Outlines ($3/month) – Outline limit is doubled_
_Avid Writer ($5/month) – Character limits are doubled_
_Professional ($12/month) – Note and outline limits are g o n e_
