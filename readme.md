# ins 工具

## 获取主页地址

主页地址：https://www.instagram.com/nasa/

## 获取用户 id 

## 获取总帖子数量

## 调用接口拿到帖子数据

原接口 

```js
https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"45290591","first":12,"after":"AQCyoVkgkNr0gQUUf8b_FKowvKc7fuRQWquE7_7VJlsTzHnyGhoPyTtlkAenwbvkpVWTETFG7H9f1tbiJO_8Mfz_xby8W4xTtoqzh0WjmrXmgQ"}
```

改成以下

```js
https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"45290591","first":12}
```

-   `query_id` 自己的账户 id
-   `variables` 查询的参数
-   `variables.id` 用户 id
-   `variables.first` 要查询的数量，之前获取的帖子总数

接口返回信息见 readme.js