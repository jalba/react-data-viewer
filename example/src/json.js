import React,{ Component } from 'react';

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

class ReactJson extends Component {
    constructor(props) {
        super(props);
        this.state = {
            main: this.props.expanded || true
        };
        this.clickHandlerFactory = this.clickHandlerFactory.bind(this);
    }
    clickHandlerFactory({ name, expanded }) {
        return (event) => {
            event.stopPropagation(); 
            const state= {};
            state[ name ] = !expanded;
            this.setState(state);
        };
    }
    getDataElement({ obj, name }) {
        const expanded = this.state[name] || false;
        let type;
        if(obj !== null && typeof obj === 'object') type = 'Object';
        if(Array.isArray(obj)) type = 'Array';
        if(!type) return obj.toString ? obj.toString() : obj;
        
        return(
            type === 'Array' ? 
            this.getArrayElement({ obj, expanded: expanded, name } ) : 
            this.getObjectElement({ obj, expanded: expanded, name })       
        );
    }
    getObjectElement({ obj, expanded, name }) {
        const notExpanded = expanded ? '' : '...}';
        const closingTag = !expanded ? null : <div>{ '}' }</div>;
        return(
            <div onClick={ this.clickHandlerFactory({ name: name, expanded: expanded }) }>
                <span style={ expanded ? downArrow : rightArrow } ></span>{ ' Object {' + notExpanded } 
                { this.getObjectContent({ obj: obj, expanded: expanded }) }
                { closingTag }
            </div>
        );
    }
    getArrayElement({ obj, expanded, name }) {
        const notExpanded = expanded ? '' : (obj.length.toString() + ']');
        const closingTag = !expanded ? null : <div>{ ']' }</div>;
        return(
            <div onClick={this.clickHandlerFactory({ name: name, expanded: expanded })}>
                <span style={ expanded ? downArrow : rightArrow } ></span>{ ' Array [' + notExpanded } 
                { this.getObjectContent({ obj: obj, expanded: expanded }) }
                { closingTag }
            </div>
        );
    }
    getObjectContent({ obj, expanded, name }) {
        const keys = Object.keys(obj);
        return (
            !expanded ?
            null :
            <ul>
                { 
                    keys.map(key => {
                        return (
                            <li key={ key }>
                                <div style={ { float: 'left' } }>{ key +' : '}</div> { this.getDataElement({ obj: obj[ key ], name: key }) }
                            </li>
                        );
                    })
                }
            </ul>
        );
    }
	render() {
        return (
            <div className={ "react-object-renderer" + (this.props.className ? ' ' + this.props.className : '') }>
                { this.getDataElement({ obj: this.props.data, expanded: this.state.main, name: 'main' }) }
            </div>
        );
	}
}

ReactJson.propTypes = {
    data: React.PropTypes.object.isRequired,
    indent: React.PropTypes.number,
    name: React.PropTypes.string,
    expanded: React.PropTypes.bool,
    className: React.PropTypes.string
};

export default ReactJson;