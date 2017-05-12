/**
 * Created by dl on 2017-05-12.
 */
var list = [{
    "id": "A3aF4bD0-547C-C1aD-7d39-E6e31f4eFFeF",
    "name": "冯刚",
    "addr": "江西省 景德镇市 昌江区",
    "age": 58,
    "birth": "1984-11-15",
    "sex": 1
},
    {
        "id": "fdeBA1CE-C17d-B8FE-b393-4eCb4aF93c4F",
        "name": "杜磊",
        "addr": "天津 天津市 南开区",
        "age": 50,
        "birth": "2012-12-15",
        "sex": 0
    },
    {
        "id": "B96be4Bd-ACCD-46Be-6535-fdCf8DbD426B",
        "name": "石娟",
        "addr": "黑龙江省 绥化市 北林区",
        "age": 49,
        "birth": "1985-03-25",
        "sex": 1
    },
    {
        "id": "be5Caf42-EF5b-2D9d-6256-AC9CB71eB122",
        "name": "苏强",
        "addr": "宁夏回族自治区 固原市 彭阳县",
        "age": 50,
        "birth": "1999-02-06",
        "sex": 1
    }];

var a2 = list.filter(function (item) {
    console.log(item.name);
    return item.name == '石娟';
});
console.log(a2); // logs 10,20,30