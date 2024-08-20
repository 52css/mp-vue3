// var options = {
//   onLoad: function (this, query) {
//     console.log("this", this, "query", query);
//   },
// };
// var options2 = {
//   onLoad: function (query) {
//     console.log("this", this, "query", query);
//   },
// };
var options3 = {
  onLoad(this, query) {
    console.log("this", this, "query", query);
  },
};

// pages/demo/demo.ts
Page(options3);
