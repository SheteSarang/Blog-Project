import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client);
            
    }
    async createAccount({email, password, name}) {
         try{
           const userAccount= await this.account.create(ID.unique(),email, password, name);
           if(userAccount){
               //call another method
                return this.login({email, password}); //calling login method
           }else{
                return userAccount 
           }
         }
         catch(error){
             throw error;
         }
    }
    async login({email, password}){
        try{
           return await this.account.createEmailPasswordSession(email,password);
        }
        catch(error){throw error;}
    }
    async getCurrentUser(){
        try{
            await this.account.get();
        }
        catch(error){
            throw error;
        }
        return null;
    }
    async logout(){
        try{
            await this.account.deleteSession('current');
        }
        catch(error){
            throw error;
        }
    }
}

let authService = new AuthService(); 

export default authService;

//https://appwrite.io/docs/products/auth/quick-start