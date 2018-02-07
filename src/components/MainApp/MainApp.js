import React from 'react';

import ApplicationsTable from '../ApplicationsTable';
import MuleSoftHero from '../MuleSoftHero';

import styles from './styles.scss';

class MainApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { applications: [] };
  }

  componentDidMount() {
    const { userToken } = this.props;

    if (!userToken) {
      return;
    }

    const runtimeManagerAppsUrl = '/armui/api/v1/applications';
    const options = {
      method: 'GET',
      headers: new Headers({
        Authorization: userToken,
        'X-ANYPNT-ORG-ID': '6f239eab-2dc5-4a5d-8992-32689e5da6ac',
        'X-ANYPNT-ENV-ID': 'ca905b21-87be-4220-a261-21752c87763a',
      }),
    };

    fetch(runtimeManagerAppsUrl, options)
      .then(result => result.json())
      .then(result => this.setState({ applications: result.data }))
      .catch(console.error)
    ;
  }

  render() {
    const { applications } = this.state;
    return (
      <div className={styles.mainApp}>
        <MuleSoftHero
          message="Welcome to MuleSoft!"
        />
        <div className={styles.content}>
          <ApplicationsTable
            applications={applications}
          />
        </div>
      </div>
    );
  }
}

export default MainApp;
