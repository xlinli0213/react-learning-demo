### 【2020/04/22】重构的一些点

1. 把`数据的获取`放在`componentDidMount`
2. 数据更新后的操作放在回调里，而不是`componentDidUepdate`，生命周期不可控，但是回调是可控的，入后要拿到`setState`更新后的数据，可以将操作移到`setState`的回调里
3. 用`Public class field`的方式去绑定事件，兼容问题在构建里面解决
4. 正确理解`map`的含义是映射，所以只做循环的话用`forEach`
