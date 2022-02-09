import React from "react";
import {Text,StyleSheet,View,TouchableOpacity} from "react-native";
import {withNavigation} from "react-navigation";

const NavBar = (props) => {
	return <View>
		<TouchableOpacity onPress = { () => {props.navigation.navigate(props.screen)} }>
			<Text style = {styles.screenFont}>{props.screen}</Text>
		</TouchableOpacity>
	</View>
}

const styles = StyleSheet.create({
	screenFont:{
		fontSize:20,
		fontStyle:"italic",
		borderWidth:2,
		paddingHorizontal:59
	}
});

export default withNavigation(NavBar);