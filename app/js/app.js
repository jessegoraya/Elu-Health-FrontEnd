import React from 'react';
import ReactDOM from 'react-dom';
import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Split from 'grommet/components/Split';
import Sidebar from 'grommet/components/Sidebar';
import Box from 'grommet/components/Box';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Label from 'grommet/components/Label';
import Image from 'grommet/components/Image';
import Form from 'grommet/components/Form';
import FormField from 'grommet/components/FormField';
import DateTime from 'grommet/components/DateTime';
import TextInput from 'grommet/components/TextInput';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
//import patientdata from '../app/data.js'
import autoBind from 'react-autobind';
import {headers, buildQuery, processStatus} from 'grommet/utils/Rest';
import {Chat} from 'botframework-webchat';
import {DirectLine} from 'botframework-directlinejs';
import  '../scss/custom.scss';
import {Router, Route, Link, IndexRoute, hashHistory, browserHistory} from 'react-router';


export default class PatientApp extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.directLine = new DirectLine({
      secret: "Hzmf2Hpea50.cwA.bEE.GWx_x2y4P1Eks_zTe0hSKWj0VWzLuiVtllviLHdLaxs"
    });

    this.state = {
      PATIENT: []
    };
  }


  componentDidMount() {   

    getPatient().then((result) => {
        this.setState({PATIENT: result});
    });

    //test to see if an Appointment call can be used to change the background color of the app
    this.directLine.activity$
        //.filter(activity => activity.type === "event" && activity.name === "changeBackground")
        //.subscribe(activity => changeBackgroundColor(activity.value));
        .filter(function (activity) {
          //console.log("i have filtered by the activity type which is" + activity.type + ", activity value" + activity.value);
          return activity.type === 'event' && activity.value === 'Update Patient';
        })
        .subscribe(function (activity) {
          console.log("Im changing the color");
          loadOverviewEditPane(activity);  
        });

  }



  render() {
    return (
      <App centered={false}>
        <Article>
            <Split flex='right'>
              <Section>
                <Box margin='none' pad='none'>
                    <Chat className={'wc-app'} botConnection={this.directLine} user={{id:'jesse', name: 'me'}}/>
                </Box>
              </Section>
              <Section>
                    <Box margin='none' pad='none'>
                      <Accordion openMulti={false} active='0'>
                        <AccordionPanel heading='Overview'>
                          <Box colorIndex='light-2'  direction='row' flex={false}>
                            <OverviewPane overview={this.state.PATIENT}/>
                          </Box>
                        </AccordionPanel>
                        <AccordionPanel heading='Medications'>
                          <Box colorIndex='light-2' full='horizontal' direction='row' flex={false}>
                          {this.state.PATIENT.map(p => {
                            return (p.Meds && p.Meds.length > 0) ? <MedicationsPane meds={p.Meds}/> : null;
                          })}
                        </Box>
                        </AccordionPanel>
                        <AccordionPanel heading='Allergies'>
                          <Box colorIndex='light-2' full='horizontal' direction='row' flex={false}>
                          {this.state.PATIENT.map(p => {
                            return (p.Allergies && p.Allergies.length > 0) ? <AllergiesPane allergies={p.Allergies}/> : null;
                          })}
                          </Box>
                        </AccordionPanel>
                        <AccordionPanel heading='History'>
                          <Box colorIndex='light-2' full='horizontal' direction='row' flex={false}>
                            History
                          </Box>
                        </AccordionPanel>
                        <AccordionPanel heading='Visits'>
                          <Box colorIndex='light-2' full='horizontal' direction='row' flex={false}>
                            List Visits
                          </Box>
                        </AccordionPanel>
                      </Accordion>
                    </Box>
                  </Section>
              </Split>
        </Article>
      </App>
    );
  }
}

class OverviewPane extends React.Component {  
  
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

class OverviewEditPane extends React.Component {  
  
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render () {
    return (
            <table>
              <tbody>
                  <tr>
                    <td>{this.props.overview.map(function(P){return <text size='small' key={P.id}>First Name: {P.FName} </text>;})}</td>
                  </tr>
                  <tr>
                    <td>{this.props.overview.map(function(P){return <text size='small' key={P.id}>Last Name: {P.LName} </text>;})}</td>
                  </tr>
                  <tr>
                    <td>{this.props.overview.map(function(P){return <text size='small' key={P.id}>DOB: {P.DOB} </text>;})}</td>
                  </tr>
                  <tr>
                    <td>{this.props.overview.map(function(P){return <text size='small' key={P.id}>Height: {P.Height} </text>;})}</td>
                  </tr>  
                  <tr>
                    <td>{this.props.overview.map(function(P){return <text size='small' key={P.id}>Weight: {P.Weight} </text>;})}</td>
                  </tr>
              </tbody>
            </table>
    );
  }
}

class MedicationsPane extends React.Component {  
  
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render () {
    return (
      <List>
            {this.props.meds.map(function(Meds) {
            return <ListItem justify='between' separator='horizontal' key={Meds.MedicationName}>{Meds.MedicationName}</ListItem>;
          })}
      </List>
    );
  }
}

class AllergiesPane extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  render () {
    return (
      <List>
          {this.props.allergies.map(function(Allergies) {
            return <ListItem justify='between' separator='horizontal' key={Allergies.AllergyName}><span>{Allergies.AllergyName}</span><span> {Allergies.AllergySince}</span></ListItem>;
          })}
      </List>
    );
  }
}


  function getPatient()  {
      const urlGetPatient = 'http://bloomskyperson.azurewebsites.net/api/Person/GetPersonByName/GeannieandNicky/Discharge/Patient/Chris%20Baker';

     return fetch(urlGetPatient).then(function(response) {
        return response.json();
      }).then(function(json) {
        return json;
      }); 
  }

  function loadOverviewEditPane(activity) {
      this.context.Router.transitionTo('/OverviewEditPane')
  }


//Removing code since it is now in index.js
/*
ReactDOM.render(
  <PatientApp /> , document.getElementById('main')
); */


