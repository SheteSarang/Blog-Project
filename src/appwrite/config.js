import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    Databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.Databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.Databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        }
        catch(error){
            console.error("appwrite service :: createPost::error", error);
        }
        }
    async updatePost(slug, {title, content, featuredImage, status}){
        try{
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        }
        catch(error){
            console.error("appwrite service :: updatePost::error", error);
        }



    }
    async deletePost(slug){
        try{
             await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        }
        catch(error){
            console.error("appwrite service :: deletePost::error", error);
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.Databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        }
        catch(error){
            console.error("appwrite service :: getPost::error", error);
            return false
        }
    }
    async getPosts(queries = [Query.equal("status","active")]){
        try{
            return await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,  //Query.equal("status","active")
            )
        }
        catch(error){
            console.error("appwrite service :: getPosts::error", error);
            return false
        }

    }

    // Services for file upload
    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        }
        catch(error){
            console.error("appwrite service :: uploadFile::error", error);
            return false
        }
    }
    async deleteFile(fileId){
        try{
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        }
        catch(error){
            console.error("appwrite service :: deleteFile::error", error);
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }

}
const service = new Service();
export default service;
