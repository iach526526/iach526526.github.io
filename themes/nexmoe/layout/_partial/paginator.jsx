const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        const { paginator } = this.props;
        const pagination = paginator({
            prev_text: '<span class="nexmoe-sr-only">上一頁</span><i class="nexmoefont icon-left" aria-hidden="true"></i>',
            next_text: '<span class="nexmoe-sr-only">下一頁</span><i class="nexmoefont icon-right" aria-hidden="true"></i>',
            escape: false
        })
            .replace('class="extend prev"', 'class="extend prev" title="上一頁" aria-label="上一頁"')
            .replace('class="extend next"', 'class="extend next" title="下一頁" aria-label="下一頁"');

        return (
            <nav
                class="nexmoe-page-nav"
                dangerouslySetInnerHTML={{
                    __html: pagination
                }}
            ></nav>
        );
    }
};
