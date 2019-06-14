const Mock = require('mockjs');

function getUsers(count = 10) {
  return Mock.mock({
    [`data|${count}`]: [
      {
        'id|+1': 1,
        'name': '@name',
        'avatar': '@image("100x50", "@name")'
      }
    ]
  }).data;
}

module.exports = {
  async ['/api/users']({ query }) {
    await delay(getRandomTimeout()); // 随机延迟
    let count = 10;
    if (query && query.count) {
      count = query.count;
    }
    return getUsers(count);
  },
}


function getRandomTimeout(min = 100, max = 1000) {
  return Math.ceil((Math.random() || 0.1) * (max / min)) * min;
}

function delay(timeout) {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, timeout);
  })
}