# Athens Project

#### This repository is ~~for the [Cursors] does the entire fucking thing in one week challenge~~ dead

**Athens Project Routing**

_A \* means authentication is required._

_Routes_

```
/                             Home page
/*                            User's notes
/:id*                         View and manage a note
/settings*                    User's settings
/premium*                     View premium plans
```

_API Routes_

```
/auth                         GET        Authentication
/auth/redirect                GET        Callback URI
/auth/logout                  GET        Log out
/api/notes/:email             GET        User's notes
/api/edit*                    POST       Edit a note
/api/delete*                  POST       Delete a note
/api/new*                     POST       Create a new note
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
```

**Athens Project Limits**

```
notes          64 notes
  name         128 chars
  note         4096 chars
  website      512 chars
```

**Athens Project Premium Perks**

_Privacy ($1/month) – Make private notes and outlines_

_More Notes ($2/month) – Note limit is doubled_

_Avid Writer ($5/month) – Character limits are doubled_

_Professional ($12/month) – Note limits are g o n e_
