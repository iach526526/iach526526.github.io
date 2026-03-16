'use strict';

const pagination = require('hexo-pagination');

hexo.extend.generator.register('index', function (locals) {
  const config = this.config;
  const perPage = config.index_generator.per_page;
  const order = config.index_generator.order_by;
  const paginationDir = config.index_generator.pagination_dir || config.pagination_dir || 'page';
  const path = config.index_generator.path || '';

  // Exclude posts under the "books" category from index pagination
  const filtered = locals.posts
    .filter(post => !post.categories.some(cat => cat.name === 'books'))
    .sort(order);

  // Keep sticky ordering consistent with default behavior
  filtered.data.sort((a, b) => (b.sticky || 0) - (a.sticky || 0));

  return pagination(path, filtered, {
    perPage,
    layout: config.index_generator.layout || ['index', 'archive'],
    format: `${paginationDir}/%d/`,
    data: { __index: true }
  });
});
