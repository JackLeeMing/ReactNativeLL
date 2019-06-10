import React, {Component} from 'react';
import { Button, ThemeProvider } from 'react-native-elements';

const RaisedButton = props => <Button raised {...props} />;
const MyApp = () => {
    return (
      <ThemeProvider>
        <Button title="Hey!" />
        <RaisedButton title="Hey!"/>
      </ThemeProvider>
    );
  };

  export default MyApp;