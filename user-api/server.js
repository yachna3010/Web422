const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const userRoutes = require('./routes/user');
const userService = require('../user-service');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Passport JWT Strategy
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    },
    async (jwt_payload, done) => {
      try {
        const user = await userService.getUserById(jwt_payload._id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

app.use(express.json());
app.use(passport.initialize());

app.use('/api/user', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});