# Contacts app

## Folder structure
![](./resources/2023-01-24-21-11-14.png)

##Api Flow 

![](./resources/2023-01-24-21-29-28.png)

#### Api calls

##### User 
    GET Request "/user/users" : get request to fetch all the users

    GET Request "/user/one" : get request to fetch a user
        Query Parameters : 
            userId : which is MongoDB OBjectId of user

    POST Request "/user/signup" : post request to signup the user
        Body Parameters :
             name  : which is the name of the user
             userName : which is the username of the user. It is unique
             password : which is the user account password
    
    POST Request "/user/singin" : post request to signin the user
        Body Parameters :
            userName : which is the name of the user
            password : which is the password of the user

    
##### Contact

    GET Request "/contact/all" : get request to fetch the contacts with pagination
        Query Parameters : 
            pageNo : which is the pageNo 
        
        Headers :
            Authorization header : which is the authorization token obtained after login of the user 
    
    GET Request "/contact/by/userId" : get request to fetch the contacts with same userId
        Headers :
            Authorization header : which is the authorization token obtained after login of the user

    POST Request "/contact/upload" : post request to upload the csv and save it to contacts
        Headers :
            Authorization header : which is the authorization token obtained after login of the user
        
        Body Parameters (Formdata):
            docs : csv file which has the heading name, phone, email , linkedInProfile
                  eg: [Sample file](https://bit.ly/3woDE0K)
        
##### CSV

    GET Request "csv/by/userId" : get request to fetch the csv file info
        Headers :
            Authorization header : which is the authorization token obtained after login of the user 
    
    GET Request "csv/info" : get request to fetch the single csv file
        Headers :
            Authorization header : which is the authorization token obtained after login of the user 
        
        Query Parameters : 
            csvId : which is MongoDB OBjectId of user

    GET Request "csv/file/:csvS3Id" : get request to fetch the uploaded file from S3
        Headers :
            Authorization header : which is the authorization token obtained after login of the user 
        
        Param Parameter :
            csvS3Id : which is s3 Key of that csv file 