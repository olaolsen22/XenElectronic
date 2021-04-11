import React, { Component } from 'react';
 
export default function(ComposedComponent) {
  class withHelpers extends Component {
 
    speeds_for_location(number) {
      }
 
    render() {
      return <ComposedComponent {...this.props} />
    }
    
}
  return withHelpers;
}