const DEVELOPMENT = 'development';
const PRODUCTION = 'production';
process.NODE_ENV = process.NODE_ENV || DEVELOPMENT;

let BASE_URL;
if (process.NODE_ENV === DEVELOPMENT) {
  BASE_URL = 'http://localhost:3000';
} else {
  BASE_URL = 'http://35.173.188.239:3000';
}

export default BASE_URL;