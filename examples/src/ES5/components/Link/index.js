var React = require('react');

var Link = React.createClass({ displayName: 'Link',
    propTypes: {
        address: React.PropTypes.string
    },
    statics: {
        isUrl(str) {
            var urlPattern = /^\s*((http|https)\:\/\/)?([a-z\d\-]{1,63}\.)*[a-z\d\-]{1,255}\.[a-z]{2,6}/;
            return urlPattern.test(str);
        },
        isEmail(str) {
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(str);
        }
    },
    render: function() {
        var mailto = Link.isEmail(this.props.address) ? 'mailto:' : '';
        return(
            <a href={mailto + this.props.address}>{ this.props.address }</a>
        );
    }
});

module.exports = Link;