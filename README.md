# E-COMMERCE ANIME MART 

We have built an Ecommerce Webite : Anime Mart .

![dc2c1311-df8d-47ed-a2d6-3db1deed681d](https://github.com/user-attachments/assets/e44e03eb-3e07-4fed-952b-49e188867179)



![27577d7c-02c3-4485-bc1d-7b5e7feea2ea](https://github.com/user-attachments/assets/6ed7fc7a-0451-4e0a-99cd-60e64a624659)




By: Bidyashree Aditya, Arpit Sharma, Pankil kamboj, Sakshi Kumari

Approach : 1: Building  Backend 

# Project Management : Discussion and Dividing the Task 

On Jira we used Scrum for agile project management methodology. Raised 2 epics and 2 sprints for team members dividing sub-parts of backends and making frontend.

# The tools and frameworks we have used are : Django, Rest Framework,  MySql, React, Css.


![Screenshot 2024-11-08 095347](https://github.com/user-attachments/assets/fda2b9ab-398b-4f91-a943-eaa78ee01952)




![Screenshot 2024-11-08 101501](https://github.com/user-attachments/assets/22b10ffe-0c1c-4d2a-9c90-23b57051f7de)





# Now for the Backend the ER Diagram is as followed : 

1: Ecommerceapp_product 
2: Ecommerceapp_cart    
3: Ecommercea_order_product 
4: Ecommerceapp_order   

![ermmmm](https://github.com/user-attachments/assets/d8ad9aed-0cbb-4d1e-af1b-c39c1acd8c76)

# Skeleton of our Project: (Uploading to the Github)

# We started our : Django project -> Django_app >


# 1- Settings.py : for configuration of our app.

Dabatbase: Configured Mysql

Connection with front-end: cross origin resource sharing (cors-headers)

Throtelling: For security, Controlling Rate of requests ( Limit the number of times a user can access our endpoints)

Installed Apps: The apps we will be using in our project : Rest_FRAMEWORK, Swagger, Cors__headers, Ecommerce app


# 2- Models.py : Creating a models.py file involves defining classes that represent our database tables.

# 3- Admins.py : By registering these models, make them accessible and manageable through django admin interface.

# 5- Serializer.py: Converts our data into json.

# 6- Views.py: 

 A: It is used for handling the requests and returning responses.


 B: Querset will fetch all the records from any model.
 

 C: Using ModelSerializer to convert model objects to json and vice-versa


 D:BasicAuthentication → user must provide a username and password


 E: IsAuthenticateed → restric access to authenticated users.

# 7- urls.py : Creating Rest-Api points that maps specific URL paths to Views.py and Swagger for API documentation.




# FEATURES IN OUR APPLICATION :

1: Throtelling (security).

2: Filter - LOW TO HIGH PRICE
          - SPECIFIC PRICE 

3: Authentication ( default authentication of django for users )          








 














           




