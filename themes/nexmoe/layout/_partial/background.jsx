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

                    {/* 兩個 2×2 區塊 */}
                    <div class="top-grid">
                        <div class="quick-links card emfont-ChironGoRoundTC">
                            <a href="/rss.xml" class="quick-btn">RSS</a>
                            <a href="/about" class="quick-btn">關於本站</a>
                            <a href="/bookshelf" class="quick-btn">書架</a>
                            <a href="/blogroll" class="quick-btn">部落滾</a>
                        </div>

                        {/* 名片 */}
                        <div class="profile-card card">
                        <a
                            href={url_for()}
                            title={config.author || config.title}
                            class="profile-avatar"
                        >
                            <img
                                src={theme.avatar}
                                alt={config.author || config.title}
                            />
                        </a>
                            <h3 class="profile-name emfont-XiaoLaiMono">{config.author || "name"}</h3>
                            <p class="profile-desc emfont-Tiejili">世界上大部分事，都沒有太大意義。<br/><br/>真理與熱愛除外。</p>
                            {/* <div class="profile-icons">
                                <a href="https://github.com/" target="_blank">github icon</a>
                            </div> */}
                            <div class="profile-action">➜</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
