import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

export default class MyScene extends Component {
static defaultProps = {
title: 'MyScene'
};
render() {
return (
<View style={{
	padding :24,
	flexDirection: 'row',
    justifyContent: 'space-between',
    width: 420, height:64, backgroundColor: 'powderblue',
}}>
<TouchableHighlight onPress={this.props.onBack}><Text>点我返回</Text></TouchableHighlight >
<TouchableHighlight onPress={this.props.onForward}><Text>点我增加任务</Text></TouchableHighlight >

</View>
)
}
}