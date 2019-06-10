/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, Dimensions, StyleSheet, Text, View, Button} from 'react-native';
import {createStackNavigator, createAppContainer, createBottomTabNavigator, StackActions, NavigationActions} from 'react-navigation';
import Toast, {DURATION} from 'react-native-easy-toast'
const Realm = require('realm')
const {height, width} = Dimensions.get('window');


class RealmPage extends Component
{
  constructor(props){
    super(props);
    this.state = {realm: null};
  }

  componentWillMount(){
    Realm.open({
      schema: [{name: 'Dog', properties: {name: 'string'}}]
    }).then((realm) =>{
      realm.write(()=>{ realm.create('Dog', {name: 'Rex01'})});
      this.setState({realm});
    });
  }

  loadDogs(){

  }

  render(){
    const info = this.state.realm ? "number of dogs in this Realm: "+ this.state.realm.objects("Dog").length
    : 'Loading...';

    const objs = this.state.realm ? this.state.realm.objects("Dog") : {};

    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent:"center"}}>
        <Text>{info}</Text>
        <Text>{JSON.stringify(objs)}</Text>
        <Button title="Next page" onPress={()=> { this.props.navigation.dispatch(StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: 'Details'})]
        }))}}></Button>
      </View>
    );
  }
}

class HomeScreen2 extends Component
{
  static navigationOptions = {
    title : 'My App',
    headerStyle: {
      backgroundColor: "#1e6086"
    },
    headerTintColor: "#fff",
    headerTitleStyle:{
      fontWeight: 'bold',
    }
  }
  render(){
    return (
      <View style={{ flex:1, alignItems: 'center', justifyContent:"center"}}>
        <Text>{`Window: width:${width}; height: ${height}`}</Text>
        <Text>HomeScreen</Text>
        <Button title="Next page" onPress={()=> { this.props.navigation.push('MyDetails', {
          itemId: 0x0089, others: "anything you wanted."
        })}}></Button>
      </View>
    );
  }

  componentWillMount(){
    console.warn('componentWillMount');
  }

  componentDidMount(){
    console.warn('componentDidMount');
  }

  componentWillUnmount(){
    console.warn('componentWillUnmount');
  }

  mounted() {
    console.warn('mounted');
  }
}

class MyDetailsScreen extends Component
{

  constructor(props){
    super(props);
    this.toast = this.toast.bind(this);
  }
  // 设置导航标题
  static navigationOptions = ({ navigation }) => {
    return {
      title : navigation.getParam('others', 'details')
  }
  }
  render(){
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'None');
    const other = navigation.getParam("others", "---")
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <Text>Details page {JSON.stringify(itemId)} {JSON.stringify(other)}</Text>
        <Button style={{marginTop: 5}} title="Go to Details page agin" onPress={()=> this.props.navigation.push("MyDetails")}></Button>
        <Button style={{marginTop: 5}} title="Go to home" onPress={()=> this.props.navigation.navigate("Home")}></Button>
        <Button style={{marginTop: 5}} title="Go back" onPress={()=> this.props.navigation.goBack()}></Button>
        <Button style={{marginTop: 5}} title="Go to Realm" onPress={()=> this.props.navigation.push("Realm")}></Button>
        <Button style={{marginTop: 5}} title="Toast" onPress={this.toast}></Button>
        <Toast ref="toast"/>
      </View>
    );
  }

  toast(){
    this.refs.toast.show('hello world: ');
  }
  //Realm
  componentWillMount(){
    console.warn('componentWillMount');
  }

  componentDidMount(){
    console.warn('componentDidMount');
  }

  componentWillUnmount(){
    console.warn('componentWillUnmount');
  }
  componentDidUnmount(){
    console.warn('componentDidUnmount');
  }
}
//navigate
class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
      </View>
    );
  }  
}

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
class MyApp extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen2
  },
  MyApp: {
    screen: MyApp,
  },
  Details: {
    screen: DetailsScreen,
  },
  MyDetails: {
    screen: MyDetailsScreen
  },
  Realm: {
    screen: RealmPage
  }
},{
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    title: 'a page.',
    headerStyle: {
      backgroundColor: "#1e6086"
    },
    headerTintColor: "#fff",
    headerTitleStyle:{
      fontWeight: 'bold',
    }
  },
  navigationOptions: {
    tabBarLabel: 'Home!',
  },
});

const UseApp = createAppContainer(AppNavigator);
//
export default class App extends Component
{
  render(){
    return(<UseApp />);
  }
}
