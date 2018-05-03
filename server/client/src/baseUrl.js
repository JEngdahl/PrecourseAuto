const hostname = window && window.location && window.location.hostname;

let BASE_URL;
if (hostname === 'localhost') {
  BASE_URL = 'http://localhost:3000';
} else {
  BASE_URL = 'http://ec2-107-23-198-130.compute-1.amazonaws.com:3000';
}

export default BASE_URL;