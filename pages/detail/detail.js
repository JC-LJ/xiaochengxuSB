// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {    
      bookInfo:{},
      reviews:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取地址栏传递的URL参数
    let id = options.id;
    //发送请求，以获取图书的详细信息
    wx.request({
      url: 'https://api.zhuishushenqi.com/book/' + id,
      method:'GET',
      success:res=>{
        console.log(res.data);
        this.setData({
          bookInfo:res.data
        });
        //动态设置标题栏文本
        wx.setNavigationBarTitle({
          title:res.data.title
        })
      }
    });

    //获取图书的评论信息
    wx.request({
      url:'https://api.zhuishushenqi.com/post/review/by-book',
      method:'GET',
      //请求参数
      data:{
        book:id,
        sort:'updated',
        start:0,
        limit:10
      },
      success:res=>{
        //console.log(res.data);
        this.setData({
          reviews:res.data.reviews
        })
      }
    })


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})