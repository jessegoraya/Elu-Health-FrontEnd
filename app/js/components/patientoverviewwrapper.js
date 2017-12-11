import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import OverviewPane from '../components/patientoverview.js';
import OverviewEditPane from '../components/patientoverviewedit.js';

export default class OverviewWrapper extends React.Component {

    constructor(props) {
        super(props);
        autoBind(this);
      }

    render() {

        const overview = this.props.overview;
        const type = this.props.compState;

        let OverviewWrapper = null
        switch (type) {
            case "Edit" : 
                OverviewWrapper = OverviewEditPane
                break
            default: 
                OverviewWrapper = OverviewPane
                break
        }

        return <OverviewWrapper {...this.props} />
    }
}