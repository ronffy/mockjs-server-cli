const { defaultResult, Mock } = require('./_common')

function getUsers(count = 10) {
  return Mock.mock({
    ...defaultResult,
    [`data|${count}`]: [
      {
        'id|+1': 1,
        'name': '@name',
        'avatar': '@image("100x50", "@name")'
      }
    ]
  });
}

module.exports = {
  ['/api/users'](req, res) {
    const query = req.query;
    let count = 10;
    if (query && query.count) {
      count = query.count;
    }
    setTimeout(() => {
      res.json(getUsers(count))
    }, 400);
  },
}
