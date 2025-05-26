hexo.extend.filter.register('before_post_render', function (data) {
  if (data.source.startsWith('bookshelf/') && !data.no_date) {
    data.no_date = true;
    console.log("[hexo] 自動設定 no_date: true 給", data.source);
  }
  return data;
});
