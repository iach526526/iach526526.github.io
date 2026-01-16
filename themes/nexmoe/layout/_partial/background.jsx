const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        const { config, theme, url_for } = this.props;

        return (
            <div id="nexmoe-background">
                <div
                    class="nexmoe-bg"
                    style={`background-image: url(${theme.background.path})`}
                ></div>
                <div class="mdui-appbar mdui-shadow-0">
                    <div class="mdui-toolbar">
                        <a
                            // eslint-disable-next-line react/no-unknown-property
                            mdui-drawer="{target: '#drawer', swipe: true}"
                            title="menu"
                            class="mdui-btn mdui-btn-icon mdui-ripple"
                        >
                            <i class="mdui-icon nexmoefont icon-menu"></i>
                        </a>
                        <div class="mdui-toolbar-spacer"></div>

                    </div>
                </div>
                <div class="quick-links">
                    <a href="/" class="quick-btn">回首頁</a>
                    <a href="/achive" class="quick-btn">文章列表</a>
                    <a href="/blogroll" class="quick-btn">部落滾</a>
                    <a href="/bookshelf" class="quick-btn">書架</a>
                    <a href="/about" class="quick-btn">關於</a>
                    <a href="/rss.xml" class="quick-btn">RSS</a>
                    <form id="search_form">
                      <form id="search_form" class="quick-search" action="/search/" method="get">
                        <input
                        class="quick-search-input"
                        id="search_value"
                        name="q"
                        type="search"
                        placeholder="Search"
                        autocomplete="off"
                        />
                    </form>
                </form>
                </div>
            </div>
        );
    }
};
