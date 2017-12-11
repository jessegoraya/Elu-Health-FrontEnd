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
import  '../../scss/custom.scss';
import {Route, Router} from 'react-router';
import OverviewWrapper from '../components/patientoverviewwrapper.js';
import OverviewPane from '../components/patientoverview.js';
import OverviewEditPane from '../components/patientoverviewedit.js';

export default class Patient extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);

    this.directLine = new DirectLine({
      secret: "Hzmf2Hpea50.cwA.bEE.GWx_x2y4P1Eks_zTe0hSKWj0VWzLuiVtllviLHdLaxs"
    });

    this.state = {
      PATIENT: [],
      COMPPROPS: [],
    };

    this.setPanelState = this.setPanelState.bind(this);

  }

    setPanelState(activity) {
          var _compState = 'Edit';
          this.setState({COMPPROPS: {compState: _compState}});
          return _compState;
    }
 
  componentWillMount() {   

    getPatient().then((result) => {
        this.setState({PATIENT: result});
    });

    
    this.directLine.activity$
        .filter(function (activity) {
          return activity.type === 'event' && activity.value === 'Update Patient';
        })
        .subscribe((activity) => {
         // console.log("Im editing the overview");
         var _compState2
         _compState2 = this.setPanelState(activity);
         //console.log('CompState:'+ this.state.COMPPROPS.compState)
        })
  }

  render() {
    const OverviewWrapper = this.state.COMPPROPS.compState === 'Edit' ? OverviewEditPane:  OverviewPane
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
                                   <div>
                                      <OverviewWrapper overview={this.state.PATIENT} ovtype={this.state.COMPPROPS} />
                                  </div>
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

