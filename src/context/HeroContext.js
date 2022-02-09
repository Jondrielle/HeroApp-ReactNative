import React, {useReducer} from "react";
import createDataContext from "./createDataContext";

const heroReducer = (state, action) => {
    switch(action.type){
        case 'get_blogposts':
            return action.payload;
        case 'add_hero':
            return [...state, { 
                    id: Math.floor(Math.random() * 999999), 
                    name: action.payload.name,
                    level: action.payload.level,
                    power: action.payload.power,
                    currentHealth: action.payload.currentHealth,
                    maxHealth: action.payload.maxHealth,
                    gold: action.payload.gold,
                }
            ]
        case 'delete_hero':
            return state.filter((hero) => {
                return hero.id !== action.payload
            });

        case 'edit_hero':
            return state.map((hero) => {
                if (hero.id === action.payload.id) {
                    return action.payload;
                }
                else{
                    return hero;
                }
            })
        case 'level_cost':
            return state.map((hero) => {
                if (hero.id === action.payload.id){
                    return action.payload;
                }
                else{
                    return hero;
                }
            })
        default:
            return state;
    }
}

const getBlogPosts = dispatch => {
    return async () => {
        console.log("about to make network request...?")
        try{
            const response = await jsonServer.get("/blogposts");
            console.log("network request completed!!!");
            //response.data === [{}, {}, {}]
            console.log(response.data);
            dispatch({type: 'get_blogposts', payload: response.data})
        }
        catch(e){
            console.log("something went wrong...")
            console.log(e);
        }
    }
}

const addHero = (dispatch) => {
    return (name, level, power, currentHealth, maxHealth, gold) => {
        dispatch( {type: "add_hero", payload: {name:name, level:level, power:power,currentHealth: currentHealth, maxHealth:maxHealth, gold:gold} } )
    }
}

const deleteHero = (dispatch) => {
    return async (id) => {
        dispatch({ type: 'delete_hero', payload: id  })
    }
}

const editHero = (dispatch) => {
    return (id,name,level,power,currentHealth,maxHealth,gold) => {
        dispatch({type: 'edit_hero', payload: {id:id, name:name, level:level, power:power, currentHealth: currentHealth, maxHealth:maxHealth, gold:gold}})
    }
}

const levelUpHero = (dispatch) => {
    return (id, name, level, power,maxHealth,currentHealth,gold ) => {
        dispatch( {type: "level_cost", payload: {id: id, name:name, level:level, power: power, 
            maxHealth:maxHealth,currentHealth:currentHealth, gold:gold } } )
    }
}

export const {Context, Provider} = createDataContext(heroReducer, {addHero,deleteHero,levelUpHero,editHero}, [ ] );