const hostname = window && window.location && window.location.hostname;

let BASE_URL;
if (hostname === 'localhost') {
  BASE_URL = 'http://localhost:3000';
} else {
  BASE_URL = 'http://35.173.188.239:3000';
}

export default BASE_URL;