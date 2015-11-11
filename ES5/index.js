var React = require('react');

var Link = require('./components/Link');

const rightArrow = {
    width: 0, 
    height: 0, 
    borderTop: '5px solid transparent',
    borderBottom: '5px solid transparent',
    borderLeft: '5px solid black',
    fontSize: 0,
    lineHeight: 0,
    float: 'left',
    marginRight: '5px',
    marginTop: '4px'
};
const downArrow = {
    width: 0,
    height: 0, 
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderTop: '5px solid black',
    float: 'left',
    marginRight: '5px',
    marginTop: '7px'
};

var ReactDataViewer = React.createClass({displayName:'ReactDataViewer',
    propTypes: {
        data: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.array
        ]).isRequired,
        indent: React.PropTypes.number,
        name: React.PropTypes.string,
        expanded: React.PropTypes.bool,
        ellipsis: React.PropTypes.number,
        className: React.PropTypes.string
    },
    getInitialState: function() {
        return { main: this.props.expanded || true };
    },
    clickHandlerFactory: function(name, expanded) {
        return function(event) {
            event.preventDefault();
            event.stopPropagation(); 
            var state= {};
            state[ name ] = !expanded;
            this.setState(state);
        }.bind(this);
    },
    getDataElement: function(obj, name) {
        var expanded = this.state[name] || false;
        var type;
        if(obj !== null && typeof obj === 'object') type = 'Object';
        if(Array.isArray(obj)) type = 'Array';
        if(Link.isUrl(obj) || Link.isEmail(obj)) return (<Link address={ obj } />);
        if(!type) return obj.toString ? obj.toString() : obj;

        return(
            type === 'Array' ? 
            this.getArrayElement(obj, expanded, name ) : 
            this.getObjectElement(obj, expanded, name)       
        );
    },
    getObjectElement: function(obj, expanded, name) {
        var notExpanded = expanded ? '' : '...}';
        var closingTag = !expanded ? null : <div style={ { marginLeft: '20px' } }>{ '}' }</div>;
        return(
            <div>
                <div onClick={ this.clickHandlerFactory(name, expanded).bind(this) }>
                    <span style={ expanded ? downArrow : rightArrow } ></span>
                    { ' Object {' + notExpanded }
                </div> 
                { this.getObjectContent(obj, expanded) }
                { closingTag }
            </div>
        );
    },
    getArrayElement: function(obj, expanded, name) {
        var notExpanded = expanded ? '' : (obj.length.toString() + ']');
        var closingTag = !expanded ? null : <div style={ { marginLeft: '20px' } }>{ ']' }</div>;
        return(
            <div>
                <div onClick={ this.clickHandlerFactory(name, expanded) }>
                    <span style={ expanded ? downArrow : rightArrow } ></span>
                    { ' Array [' + notExpanded } 
                </div>
                { this.getObjectContent(obj, expanded) }
                { closingTag }
            </div>
        );
    },
    getObjectContent: function(obj, expanded, name) {
        var keys = Object.keys(obj);
        var indent = this.props.indent ? this.props.indent : 40;
        return (
            !expanded ?
            null :
            <ul style={ { listStyleType: 'none', padding: 0, marginLeft: indent+'px' } }>
                { 
                    keys.map(function(key) {
                        return (
                            <li key={ key }>
                                <span style={ { float: 'left', display: 'inline-block' } }>{ key +'  :'}</span>
                                <span style={ { display: 'inline-block', width: '70%', marginLeft: '8px' } }>{ this.getDataElement(obj[ key ], key) }</span>
                            </li>
                        );
                    })
                }
            </ul>
        );
    },
    render: function() {
        return (
            <div className={ "react-data-viewer" + (this.props.className ? ' ' + this.props.className : '') }>
                { this.getDataElement(this.props.data, this.state.main, 'main') }
            </div>
        );
    }
});

module.exports = ReactDataViewer;