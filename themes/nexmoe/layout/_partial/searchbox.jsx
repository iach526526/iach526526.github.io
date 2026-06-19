const { Component } = require('inferno');

module.exports = class extends Component {
    render() {
        const { __ } = this.props;
        return (
            <div id="nexmoe-search-space">
                <div class="search-container">
                    <a class="search-close" onclick="sclose();">×</a>
                    <div class="search-header">
                        <div class="search-input-container">
                            <input
                                class="search-input"
                                id="nexmoe-search-input"
                                type="text"
                                title={ __('search')}
                                aria-label={ __('search')}
                                placeholder={ __('search')}
                                onInput="sinput();"
                            />
                        </div>
							
                        
                    </div>
                    <div class="search-body"></div>
                </div>
            </div>
        );
    }
};
