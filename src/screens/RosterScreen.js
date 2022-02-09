import React,{useContext} from "react";
import {Text,StyleSheet,View,TouchableOpacity,Button,FlatList,ScrollView} from "react-native";
import {Context} from "../context/HeroContext";
import NavBar from "../components/NavBar";
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);


const generateHero = () => {
	let hero = {};
	hero.level = 1;

	//Randomly creates a new hero name
	let firstNameList = ["Jondrielle", "Kevin", "Robert", "Major Ben", "50 Cent", "Megan", "Ted", "Norman", "Lisa", "Ivan"]
	let lastNameList = ["KillsMaster", "HeadBuster", "KnucleSandwich", "StompMaster", "HeartBreaker", "SoulEater"]
	hero.name = firstNameList [Math.floor(Math.random() * firstNameList.length)] + " " + lastNameList[Math.floor(Math.random() * lastNameList.length)]

	hero.gold = Math.floor(Math.random() * 1000);
	hero.power = Math.floor(Math.random() * 5 ) + 1;
	hero.maxHealth = Math.floor(Math.random () * 7) + 3;
	hero.currentHealth = hero.maxHealth; 

	return hero;
}

const RosterScreen = (props) => {

	const newHero = generateHero();
	const {addHero,state} = useContext(Context);

	return <ScrollView style = {{flex:1}}>
		<Text style = {styles.title}>Roster Screen{"\n"}</Text>
		<FlatList
			keyExtractor = { (hero) => {return hero.id} } 
			data = {state}
			renderItem = { ({item}) => {
			return <TouchableOpacity onPress = { () => {props.navigation.navigate( "Hero", {id: item.id} ) } }>
						<Text style = {styles.heroDetail}>Name: {item.name} | ID: {item.id} | Power: {item.power} | Level: {item.level} | 
							Health: {item.currentHealth} / {item.maxHealth} | Gold: {item.gold} {"\n"}</Text>
					</TouchableOpacity>
			} } 
		/>
		<TouchableOpacity onPress = { () => { 
				addHero(newHero.name, newHero.level, newHero.power, newHero.currentHealth, newHero.maxHealth, newHero.gold)
				for(let i = 0; i < state.length; i++){
					console.log(state[i].id); } } } >
			<Text style = {styles.hireButton}>Hire a Hero</Text>
		</TouchableOpacity>
		<View style = {styles.buttonStyle}>
			<NavBar screen = "Roster"/>
			<NavBar screen = "Adventure"/>
		</View>
	</ScrollView>
}

const styles = StyleSheet.create({
	title:{
		fontSize:50,
		alignSelf:"center"
	},
	buttonStyle:{
		flexDirection:"row"
	},
	hireButton:{
		fontSize:30,
		marginTop:10,
		alignSelf:"center"
	},
	heroDetail:{
		fontSize:20
	}
});
export default RosterScreen;