//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    //存储所有的分类
    epub: [ ]
  },
  onLoad() {
    wx.request({
      //获取所有排行榜的接口
      url: 'https://api.zhuishushenqi.com/ranking/gender',
      method: 'get',
      success: res => {
        let epub = this.data.epub;       
        //存储数据
        let temp = [];
        // 获取接口返回的数据
        let data = res.data.epub;
        // 数据结构: [{title:'新书榜',books:[]},{title:'新书榜',books:[]}]
        // 数据的遍历 --  因为我们期望得到按自己的想法使用的数据结构
        data.forEach(item => {
          wx.request({
            url: 'https://api.zhuishushenqi.com/ranking/' + item._id,
            method: 'GET',
            success: result => {
              //////////////////////////////////////
              //空对象 -- 单一的一个分类的信息
              let object = {};
              // 将原来分类的标题赋予当前自己声明的对象的属性
              object.title = item.title;
              object.books = result.data.ranking.books;
              // 将对象添加到数组的未尾
              temp.push(object);              
              this.setData({
                epub:temp
              }) ;          
              // console.log(temp)  ;
              // 第一次的样子: [{title:'新书榜',books:[]}]
              // 第二次的样子: [{title:'新书榜',books:[]},{title:'VIP榜',books:[]}]
              //console.log(object);                
              //////////////////////////////////////
            }
          });

        });        
        
      }
    })
  }
})
