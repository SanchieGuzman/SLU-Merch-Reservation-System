# CS312-MidtermProject-Leonardos
## Get Started
### Prerequisites 
1. Latest Version of WAMP Server is installed in your machine.
2. Git is installed in your machine as well.

### Procedure
1. Clone the project repository from this link: https://github.com/Stephen-Coloma/CS312-MidtermProject-Leonardos
2. If you do not have access to the repository, you can download unzip the files named "Leonardos-mid.zip" attached in the attachment bin.
3. Copy the folder "Leonardos" inside the "Leonardos-mid" folder into this path **C:\wamp64\www** (assuming that you have WAMP Server installed)
4. Run the WAMP Server
5. Click the WAMP server icon in the icons tray, hover "Your VirtualHosts" and click "VirtualHost Management".
  ![My Image](https://example.com/image.jpg)
    
6. Set Up the Virtual Host. Follow what is in the image below. 
  ![My Image](https://example.com/image.jpg)

7. Click "Start the Creation..."
8. Restart the DNS Server by right clicking WAMP Server Icon on icons tray --> Tools --> Restart DNS.
  ![My Image](https://example.com/image.jpg)

10. Login to 'phpMyAdmin' into your browser, create a new database and import the sql file 'leonardos_webdev_schema.sql' from the path '/admin/src
/database/'
11. Modify the config file to properly access the database. This config file is found in path 'admin/src/database
/config.php'
12. Go to localhost, click 'leonardos' in the "Your VirtualHost" column, click the 'admin' --> 'src'
13. Login using this credential: **username: admin, password: admin**

---
## Project Contributor:
1. COLOMA, Stephen M.
2. GUZMAN, Sanchie Earl M.
3. LEUNG, Leonhard T.
4. NONATO, Marius Glenn M.
5. RAGUDOS, Hannah T.
6. RAMOS, Jerwin Kyle R.
