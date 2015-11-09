import React,{ Component } from 'react';


class ReactJson extends Component {
	render() {
        return (
            <div>
                <pre>
                    <code>
                        { 'Hey, \n this code should be in \n three lines' }
                    </code>
                </pre>
            </div>
        );
	}
}

export default ReactJson;