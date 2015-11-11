'use strict';

import React from 'react';
import chai from 'chai';

const expect = chai.expect;

chai.should();

import TestUtils from 'react-addons-test-utils';

import ReactDataViewer from './../index.js';


const shallowRenderer = TestUtils.createRenderer();
const data = { some: [ 'one', 'two', 'three' ] };

describe('A ReactDataViewer component', () => {
    shallowRenderer.render(<ReactDataViewer data={ data } />);
    let result = shallowRenderer.getRenderOutput();

    it('should render a div tag as its root element', () => {
        expect(result.type).to.equal('div');
        expect(result.props.className).to.equal('react-data-viewer');
    });
    it('should render a expanded object by default', () => {
  	    expect(result.props.children.props.children.length).to.equal(3);
    });
    it('should render an opening tag with the type of the the data passed to it', () => {
        const openingTag = result.props.children.props.children[0];
        expect(openingTag.props.onClick).to.be.a('function');
  	    expect(openingTag.props.children[1]).to.equal(' Object {');
    });
    it('should render an attribute list with nested objects', () => {
    	const atributesList = result.props.children.props.children[1];
    	const attributeKey = atributesList.props.children[0].props.children[0].props.children;
    	const dataKey = Object.keys(data)[0];
    	const nestedArray = atributesList.props.children[0].props.children[1]
    	                        .props.children.props.children[0].props.children[1];
    	expect(atributesList.type).to.equal('ul');
    	expect(atributesList.props.children.length).to.equal(1);
    	expect(atributesList.props.children[0].type).to.equal('li');
    	expect(attributeKey.indexOf(dataKey)).to.be.above(-1);
    	expect(nestedArray).to.equal(' Array [3]');
    });
    it('when expanded, it should render a closing tag', () => {
        const closingTag = result.props.children.props.children[2];
        expect(closingTag.props.children).to.equal('}');
    });
});