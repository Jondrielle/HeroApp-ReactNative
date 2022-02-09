import React,{useContext} from "react";
import {Text,TouchableOpacity,View,StyleSheet,FlatList,Image,Dimensions} from "react-native";
import {Context} from "../context/HeroContext";
import Fight1 from "../../assets/Fight1.png";
import Fight2 from "../../assets/Fight2.jpg";
import Fight3 from "../../assets/Fight3.jpg";
import Fight4 from "../../assets/Fight4.png";
import Fight5 from "../../assets/Fight5.jpg";
import Fight6 from "../../assets/Fight6.jpg";
import Fight7 from "../../assets/Fight7.jpg";
import Fight8 from "../../assets/Fight8.jpg";
import Fight9 from "../../assets/Fight9.png";

const generateAdventure = () => {
	let adventure = {};
	
	//Randomly creates adventure text 
	const adjectives = ["Awful","Scary","Annoying","Grim","Miserable","Exhausting"]
	const locations = ["Caves","Dugeon","Hell","Forest","Woods","Alley","Farm"]
	const qualifiers = ["No hope", "Death","Evil", "Turmoil", "Decay", "Desturction"]
	const images = [Fight1,Fight2,Fight3,Fight4,Fight5,Fight6,Fight7,Fight8,Fight9]

	adventure.name = "The " + adjectives[Math.floor(Math.random() * adjectives.length)] + " " +
	locations[Math.floor(Math.random() * locations.length)] + " of " + 
	qualifiers[Math.floor(Math.random() * qualifiers.length)] 

	adventure.battleImage = images[Math.floor(Math.random() * images.length)]
	adventure.challengeLevel = Math.floor(Math.random() * 10) + 1;

	return adventure;
}


const AdventureScreen = (props) => {
	
    const adventure = generateAdventure();
	const {state,editHero,deleteHero} = useContext(Context);

	//Battle results text for use later
	let battleResultsMessage;
	const successMessage = "You have lost 3 health points but have gained 20 gold coins";
	const failureMessage = "You have managed to survive this gruesome battle but in doing so you lost half of your health points and gained only 5 gold coins";
	let deviceWidth = Dimensions.get('window').width;

	return <>
		<Text style = {styles.title}>Current Adventure:</Text>
		 <Text style = {styles.infoTitle}>{adventure.name}</Text>
		<Text style = {styles.title}>Challenge Level:</Text>
		<Text style = {styles.infoTitle}>{adventure.challengeLevel}</Text>
		<Image style = {styles.imageBattle} source = {adventure.battleImage}/>
		<Text style = {styles.title}>Who do you want to send?</Text>
		<FlatList
			keyExtractor = { (hero) => {return hero.id} }
			data = {state}
			renderItem = { ({item}) => {
				return <TouchableOpacity onPress = { () => {
				     {item.power >= adventure.challengeLevel? battleResultsMessage = successMessage : battleResultsMessage = failureMessage }
					 {battleResultsMessage === successMessage ? editHero(item.id,item.name,item.power,item.level,item.currentHealth - 3,item.maxHealth,item.gold+20):
					 editHero(item.id, item.name, item.power, item.level, item.currentHealth / 2, item.maxHealth ,item.gold + 3)}
					 props.navigation.navigate("Hero", {id:item.id, results:battleResultsMessage})} }>
					 <Text style = {styles.info}>Name:{item.name} Power:{item.power} Level:{item.level} 
					 Health:{item.currentHealth}/{item.maxHealth} Gold:{item.gold}</Text>					
				  </TouchableOpacity>
			} }
		/>
	</>
}

const styles = StyleSheet.create({
	imageBattle:{
		width:400,
		height:300,
		alignSelf:"center"
	},
	title:{
		fontSize:20,
		fontStyle:"italic",
		fontWeight:"bold",
		alignSelf:"center",
		color:"darkblue"
	},
	info:{
		fontSize:19,
		fontStyle:"italic",
	},
	infoTitle:{
		fontSize:19,
		fontStyle:"italic",
		alignSelf:"center"
	}
});

export default AdventureScreen;
