hexo.extend.filter.register('before_post_render', function (data) {
  const categories = Array.isArray(data.categories) ? data.categories : [];
  const hasBookCategory = categories.some(cat => (cat && cat.name) ? cat.name === 'books' : cat === 'books');
  const isBookSource = data.source.startsWith('bookshelf/') || data.source.startsWith('books/') || data.source.startsWith('_posts/books/');

  if ((isBookSource || hasBookCategory) && !data.no_date) {
    data.no_date = true;
    console.log("[hexo] 自動設定 no_date: true 給", data.source);
  }
  return data;
});
