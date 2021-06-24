import React,{ createContext } from "react";
import Pool from "../src/UserPool";
import { CognitoUser,AuthenticationDetails } from "amazon-cognito-identity-js";

const AccountContext = createContext();

function Account(props)
{   
    const Authenticate = async (Username,Password) => {
        return await new Promise((resolve,reject)=>{
            const user = new CognitoUser({
                Username,
                Pool,
            });
            
            const authDetails = new AuthenticationDetails({
                Username,
                Password,
            })
    
            user.authenticateUser(authDetails,{
                onSuccess:data => {
                    resolve(data)
                },
                onFailure:err => {
                    reject(err)
                },
                newPasswordRequired:data => {
                    console.log('newPasswordRequired',data)
                    resolve(data)
                }
            });
        })
    }

    return (
        <AccountContext.Provider value={{Authenticate}}>
            {props.children}
        </AccountContext.Provider>
    )
}

export {Account,AccountContext};