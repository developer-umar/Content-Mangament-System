

import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {

    client = new Client();
    account;

    constructor() {
        //from appwrite

        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);

    }

    //method me apprwrite ki services ke liye 
    //jo bhi method call karega wo ek object pass karega jisme email,pass,name hoga 
    //ID.unique() ye appwrite me milta hai jo  unique id genarate karta hai 
    //method me phla parameter hamesha  id hota hai docs me hai isliye 


    // for creating account  registering account
    async createAccount({ email, password, name }) {

        try {

            const userAcoount = await this.account.create(ID.unique(), email, password, name);

            if (userAcoount) {
                //agar account ban gya to doosra method call karo  matlab login karlo
                return this.login({ email, password });

            }
            else {
                return userAcoount;
            }

        } catch (error) {
            throw error;

        }




    }

    async login({ email, password }) {

        try {

            return await this.account.createEmailPasswordSession(email, password);




        } catch (error) {

            return error;

        }





    }
    //app login ho yaa nhi check kar rah hai 
    async getCurrentUser() {

        try {
            return await this.account.get();

        } catch (error) {
            console.log("Apperite service :: get currentuser ::error", error);

        }
        //agar kuch nhi mila to null return karo 

        return null;


    }

    // logout (deleteSessions  sabhi browser se logout ho jaae ar  ek ar hai deleteSession jo khli usi particular device  pr session over ya logout kar deta hai )

    async logOut() {

        try {
            await this.account.deleteSessions();

        } catch (error) {
            console.log("Apperite service :: get currentuser ::error", error);

        }



    }




}

const authService = new AuthService();

export default authService;       // class banane ke object ko export kar dia taaki kbhi  method ko access karna ho to  directly object se access kar le 