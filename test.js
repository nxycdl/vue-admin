/**
 * Created by dl on 2017-05-12.
 */
var Mock = require('mockjs');
var Users=[];
for (let i = 0; i < 86; i++) {
    Users.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1),
    }));
}

// 输出结果
console.log(Users);