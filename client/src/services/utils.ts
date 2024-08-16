function getEndpointURI(type: Endpoints) {
  return 'http://localhost:8000/api/' + type;
}

export type Endpoints = 'users';

export { getEndpointURI };
