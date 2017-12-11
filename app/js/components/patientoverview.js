import React from 'react';
import ReactDOM from 'react-dom';
import autoBind from 'react-autobind';
import Image from 'grommet/components/Image';
import Label from 'grommet/components/Label';

export default class OverviewPane extends React.Component {  
    
    constructor(props) {
      super(props);
      autoBind(this);
    }
  
    render () {
      return (
                <table>
                  <tbody>
                      <tr>
                        <td>{this.props.overview.map(function(P){return <Image key={P.id} src={P.ProfileImg}></Image>;})}</td>
                      </tr>
                      <tr>
                        <td>{this.props.overview.map(function(P){return <label size='small' key={P.id}>First Name: {P.FName} </label>;})}</td>
                      </tr>
                      <tr>
                        <td>{this.props.overview.map(function(P){return <label size='small' key={P.id}>Last Name: {P.LName} </label>;})}</td>
                      </tr>
                      <tr>
                        <td>{this.props.overview.map(function(P){return <label size='small' key={P.id}>DOB: {P.DOB} </label>;})}</td>
                      </tr>
                      <tr>
                        <td>{this.props.overview.map(function(P){return <label size='small' key={P.id}>Height: {P.Height} </label>;})}</td>
                      </tr>  
                      <tr>
                        <td>{this.props.overview.map(function(P){return <label size='small' key={P.id}>Weight: {P.Weight} </label>;})}</td>
                      </tr>
                  </tbody>
                </table>
      );
    }
  }
  