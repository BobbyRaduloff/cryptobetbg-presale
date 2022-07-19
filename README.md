# Running instructions
- `npm install` in the repo folder.
- install mongodb server
- fill in the following variables in a file called `.env.local`:
```
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB=cryptobet # make sure to create this database in mongo
SECRET_COOKIE_PASSWORD=<any random string>
# you can get those for free if you google recaptcha api keys (put localhost as domain)
NEXT_PUBLIC_RECAPTCHA_PUBLIC=<recaptchaV2 public key>
RECAPTCHA_SECRET=<recaptchaV2 private keyß>
```
- `npm run dev` in the repo folder
