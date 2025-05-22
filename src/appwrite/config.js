import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";


export class Service {

    client = new Client();
    databases;
    bucket;


    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    //create post 

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, content, featuredImage, status, userId })

        } catch (error) {
            console.log("Apprite service :: get currentuser ::error", error);

        }

    }
    //update post
    //document ki id maine slug maana hai 

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug, { title, title, content, featuredImage, status })

        } catch (error) {
            console.log("Apprite service :: get currentuser ::error", error);

        }



    }
    //deleeting post
    //document id = slug
    //deleete ko return nhi kaarya ku ki ye kuch dega nhi isliye ham sirf return true karenge pta chale taki delete hua hai ya nhi

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
            return true;

        } catch (error) {
            console.log("Apperite service :: get currentuser ::error", error);
            return false;
        }

    }

    //koi ek post chaiye to retrive karna hai to 

    async getPost(slug) {
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);

        } catch (error) {
            console.log("Apperite service :: get currentuser ::error", error);

        }



    }

    //saaare post  ya list of post  retrive karne hai to (posts) 
    //queries ek variable hai 
    //indexex bane honge tbhi queries use kar skte ho yha pr otherwise nhi  
    //hame khli whi posts  chaiye jinka  ststus active ho(  yha status ek key hai or active uski value )
    async getPosts(queries = [Query.equal("status", "active")]) {


        try {
            //yha pr queries oopar na likhne ke  bjaye yha bhi likh skte the listdocument function ke nadar 
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries);



        } catch (error) {

            console.log("Apperite service :: get currentuser ::error", error);

        }



    }

                                                  // < --- file se related  services --- >

                                                  
    //files means the image we are uploading
    //  file kaise upload karna hai 
    //file upload services 
    //yha par mujhe ek unique id deni to yha pr maine id le lia 
    //ye featured image hai usko ye file kh rha hai 

    async uploadfile(file) {
        
        try {

            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file)

        } catch (error) {
            console.log("Apperite service :: get currentuser ::error", error);
            return false

        }


    }
    //delete file 
    async deletefile(fileId) {
        try {

            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Apperite service :: get currentuser ::error", error);
            return false;

        }


    }
    //get file preview

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);

    }








}

const service = new Service();

export default service 