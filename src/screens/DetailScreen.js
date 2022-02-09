import React,{useContext} from "react";
import {Text,View,TouchableOpacity,StyleSheet,Button} from "react-native";
import {Context} from "../context/HeroContext";
import NavBar from "../components/NavBar";

const DetailScreen = (props) => {

	const {state,levelUpHero,editHero} = useContext(Context);
	const heroID = props.navigation.getParam("id");
	const missionStatus = props.navigation.getParam("results");
	const hero = state.find( (currenthero) => {
		return  heroID === currenthero.id;
	})
	
	//Checks whether or not the hero has enough coins to level up
	const goldCostCheck = () => {
		if(newCost <= 0)
			goldStatus = "You need to earn more gold by going on an adventure"

		else
			goldStatus = goldCost;

		return goldStatus;
	}
	

	let goldCost = hero.level * 10;
	let newCost = hero.gold - goldCost;
	let goldStatus = goldCostCheck();

	return <View style = {styles.background}>
		<Text style = {styles.battleMessage}>{missionStatus}</Text>
		<Text style = {styles.name}>{hero.name}</Text>
		<View style = {styles.innerbackground}>
			<Text style = {styles.heroInfo}>Level: {hero.level} </Text>
			<Text style = {styles.heroInfo}>Health: {hero.currentHealth} / {hero.maxHealth}</Text>
			<Text style = {styles.heroInfo}>Power: {hero.power}</Text>
			<Text style = {styles.heroInfo}>Gold: {hero.gold}</Text>
		</View>
		<TouchableOpacity onPress = { () => { 
		    levelUpHero( hero.id, hero.name, hero.level + 1, hero.power + 3, 
			hero.maxHealth + 5, hero.currentHealth, hero.gold - goldCost) } }>
			<Text style = {styles.upgrade}>Level Up: ( {goldStatus} )</Text>
		</TouchableOpacity>
		<TouchableOpacity onPress = { () => { 
			editHero(hero.id,hero.name,hero.level,hero.power, hero.currentHealth + (hero.maxHealth - hero.currentHealth) ,hero.maxHealth, hero.gold - 10 ) } } >
			<Text style = {styles.potion}>Buy Potion Cost (10)</Text>
		</TouchableOpacity>
		<View style = {styles.buttonStyle}>
			<NavBar screen = "Roster"/>
			<NavBar screen = "Adventure"/>
		</View>
	</View>
}

const styles = StyleSheet.create({
	background:{
		alignItems:"center"
	},
	innerbackground:{
		alignSelf:"flex-start",
		marginTop:35
	},
	buttonStyle:{
		flexDirection:"row"
	},
	cost:{
		fontSize: 20,
		alignSelf:"center",
		marginTop:150,
		borderWidth:2,
		borderColor:"gray",
		paddingTop: 15,
		paddingHorizontal:100
	},
	name: {
		fontSize:50,
		marginTop:150,
		fontStyle: "italic"
	},
	heroInfo:{
		fontSize:20,
		padding:6,
	},
	potion:{
		fontSize:30,
		fontWeight:"bold"
	},
	upgrade:{
		fontSize:25,
		fontWeight:"bold"
	},
	battleMessage:{
		fontSize:20,
		fontStyle:"italic",
		fontWeight:"bold",
		marginTop:30
	}
});

export default DetailScreen;