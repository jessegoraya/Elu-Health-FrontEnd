import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import Form from 'grommet/components/Form';
import TextInput from 'grommet/components/TextInput';
import NumberInput from 'grommet/components/NumberInput';
import DateTime from 'grommet/components/DateTime';
import FormFields from 'grommet/components/FormField';

export default class OverviewEditPane extends React.Component {  
    
    constructor(props) {
      super(props);
      autoBind(this);

      //this.onOverviewChange = this.onOverviewChange.bind(this);
    }

    onOverviewChange(event) {
      let state = this.state;
      let field = event.target.name;
      let value = event.target.value;
      state[field] = value;
      this.setState({state});
    }
  
    render () {
      return (
              <table>
                <FormFields>
                <tbody>
                    <tr>
                      <td>{this.props.overview.map(function(P){return <TextInput size='small'  key={P.id} id={P.id} value={P.FName} onChange={() => this.onOverviewChange.bind(this)} />;})}</td>
                    </tr>
                    <tr>
                      <td>{this.props.overview.map(function(P){return <TextInput size='small' key={P.id} id={P.id} value={P.LName} onChange={() => this.onOverviewChange.bind(this)} />;})}</td>
                    </tr>
                    <tr>
                      <td>{this.props.overview.map(function(P){return <DateTime size='small' key={P.id} id={P.id} value={P.DOB} onChange={() => this.onOverviewChange.bind(this)} />;})}</td>
                    </tr>
                    <tr>
                      <td>{this.props.overview.map(function(P){return <TextInput size='small' key={P.id} id={P.id} value={P.Height} onChange={() => this.onOverviewChange.bind(this)} />;})}</td>
                    </tr>  
                    <tr>
                      <td>{this.props.overview.map(function(P){return <NumberInput size='small' key={P.id} id={P.id} value={P.Weight} onChange={() => this.onOverviewChange.bind(this)} />;})}</td>
                    </tr>
                </tbody>
                </FormFields>
              </table>
      );
    }
  }