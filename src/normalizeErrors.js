// [{path: 'email', message: 'does not exist'}]
/*
{
  email: ['e1', 'e2'...]
}
*/

const normalizeErrors = (errors) =>
  errors.reduce((acc, cv) => {
    if (cv.path in acc) {
      acc[cv.path].push(cv.message);
    } else {
      acc[cv.path] = [cv.message];
    }

    return acc;
  }, {});

export default normalizeErrors;
