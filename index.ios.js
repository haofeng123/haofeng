import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  AsyncStorage,
  View
} from 'react-native';

var STORAGE_KEY_ONE = '@haofeng:key_one';
export default class haofeng extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ToDos:[]
    }
  }

//组件挂载之后回调方法
  componentDidMount(){
      this._didMount = true;
      this._loadInitialState().done();
  }
  //初始化数据-默认从AsyncStorage中获取数据
  async _loadInitialState(){
       try{
          var value=await AsyncStorage.getItem(STORAGE_KEY_ONE);
          if(value!=null){
             var obj = JSON.parse(value);
            this.setState( obj);
          }
        }catch(error){
        }
  }
  //进行储存数据_ONE
  async _saveValueOne(){
      try{
        var str =JSON.stringify(this.state);
        console.log("aaaaaa"+str);
         await AsyncStorage.setItem(STORAGE_KEY_ONE,str);
      }catch(error){
        console.log(error);
      }
  }
  
  //进行把message信息添加到messages数组中
  _appendMessage(ToDos){
     this.setState({ToDos:this.state.ToDos.concat(ToDos)});
  }




 addTask (task) {
    let newTask = {
      key: Date.now(),
      name: task
    }
    let toDos = this.state.ToDos
    console.log(toDos)
    toDos.push(newTask)
    this.setState({ToDos: toDos})
  }

  deleteTask(key) {
    let todos = this.state.ToDos
    let newtodos = todos.filter(task =>  task.key != key)
    this.setState({ToDos: newtodos})
  }

  clearText () {
    this._textInput.setNativeProps({text:''})
  }


  render() {

    this._didMount && this._saveValueOne();
    return (
      <View style={styles.container} >
        <Text >
          Welcome To My Life
        </Text>
        <TextInput
          placeholder='say something'
          style={{width: 200, height: 40}}
          onEndEditing={task => {
            this.addTask(task.nativeEvent.text)
            this.clearText.call(this)
          }}
          ref = { component => this._textInput = component}
        />
        <Text style={styles.content}>
        </Text>
       <ScrollView>
        {this.state.ToDos.map(task => <Text key={task.key}
                                            onPress={ () => this.deleteTask(task.key)}
          >{task.name}
          
          </Text>)}
        
       </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  content:{
    fontSize: 13,
    textAlign: 'left',
    margin: 10,
  }
});

AppRegistry.registerComponent('haofeng', () => haofeng);