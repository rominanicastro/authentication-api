## Simple Authentication API

### Instructions
1. Install node dependencies: `npm install`
2. Run mongo: `mongo`
3. Run in development mode (with nodemon): `npm start`
4. Go to http://localhost:3090

### Endpoints available 

#### GET http://localhost:3090/
You must provide a authorization token as header

#### POST http://localhost:3090/signin
Body:
- email
- password

Returns token

#### POST http://localhost:3090/signup
Body:
- email
- password

Returns token
