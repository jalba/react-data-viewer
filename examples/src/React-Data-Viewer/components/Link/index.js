import React, { Component } from 'react';

class Link extends Component {
    static isUrl(str) {
        const urlPattern = /^\s*((http|https)\:\/\/)?([a-z\d\-]{1,63}\.)*[a-z\d\-]{1,255}\.[a-z]{2,6}/;
        return urlPattern.test(str);
    }
    static isEmail(str) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(str);
    }
    render() {
        const mailto = Link.isEmail(this.props.address) ? 'mailto:' : '';
        return(
            <a href={mailto + this.props.address}>{ this.props.address }</a>
        );
    }
}

Link.propTypes = {
    address: React.PropTypes.string,
};

export default Link;