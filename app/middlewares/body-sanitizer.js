const sanitizer = require('sanitizer');

const bodySanitizer = (req, _,next) => {
  if (req.body) {
    for (let propName in req.body) {
        if (req.body.hasOwnProperty(propName)) {
      req.body[propName] = sanitizer.escape( req.body[propName] );
        }
    }
  }
  next();
};

module.exports = bodySanitizer;