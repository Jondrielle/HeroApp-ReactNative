import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import RosterScreen from "./src/screens/RosterScreen";
import {Provider as HeroProvider} from "./src/context/HeroContext";
import DetailScreen from "./src/screens/DetailScreen";
import AdventureScreen from "./src/screens/AdventureScreen";
import React from "react";

const navigator = createStackNavigator( 
	{
		Roster:RosterScreen,
		Hero: DetailScreen,
		Adventure:AdventureScreen,
	}, 
	{
		initialRouteName: "Roster",
		defaultNavigationOptions:{
			title:"Hero Guild",
		},
	}
);

const App =  createAppContainer(navigator);

export default () => {
	return <HeroProvider>
		<App/>
	</HeroProvider>
}