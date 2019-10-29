#### Description:

<p>This is a small spring boot application which simulates the booking of a cab by a customer. Based on the pickup location of the customer, the availability of drivers & the current location of the drivers, the system assigns drivers to pickup the customers.</p>
<p>The app was coded as part of an interview assignment.</p>

#### Given Requirements:

1. Create tables to store driver data (Driver Name, Current Latitude, Current Longitude, Status) and
   order/booking data (Order Number, Customer Name, Customer Latitude, Customer Longitude).
2. Find the best pick-up driver for the above scenario using Java and MySQL or any other database of your choice.
3. Create UI for:
   1. Screen A - Booking a cab
      1. Input - Capture latitude and longitude of customer address, Customer Name
      2. Submit Button – To get the best driver
      3. Table - Displays the current status of the drivers in below grid format.<br/>
         |Driver|Customer|Status|<br/>
         D1,C1,BUSY<br/>
         D2, - ,AVAILABLE

#### Deploy and Run Instructions:

1. Install MySql
2. Open cmd prompt & login to mysql client as root:<br/>
   ./mysql --user=root --password
3. Enter your root password when prompted
4. Copy the init script at "pickup-scheduler/src/main/resources/db/init.sql" to any location such that there are no spaces in the full location path
5. Run the foll. cmd in sql client:<br/>
   source \<path-to-copied-init-script\><br/><br/>
   Note: Run this cmd with double quoting the path. It is necessary the path does not have any spaces. (http://philip.yurchuk.com/software/mysql-failed-to-open-file-error-2-and-22-on-windows/)
6. Ensure the mysql databse is running
7. import the maven project in eclipse, run maven install & then run the application class PickupSchedulerApplication.java <br/>
   Note: For now,<br/>
   The url for rest api used by the UI is hard-coded in "/pickup-scheduler/src/main/js/services/httpService.js" to "http://localhost:8080/api". <br/>
   The mysql url is added in "/pickup-scheduler/src/main/resources/application.properties". <br/>
   Please change before running maven install if reqd.

8. the tomcat server starts on port 8080
9. Visit http://localhost:8080/ from you browser to open the UI
10. For simplicity, we can only make bookings if there are drivers available. (Please read comments in class BookingService.getDriver())
11. To edit availability info of drivers use POSTMAN & the rest api http PUT http://localhost:8080/api/drivers/\<driverId\> and passing appriopriate json in the body.<br/>
    Example: To reset "status" & "currentBooking" fields for driver Geeta Das with id=2 , make http PUT request at http://localhost:8080/api/drivers/2 with foll. body: <br/>
    {
    "name": "Geeta Das",
    "latitude": 19.130176,
    "longitude": 72.829017,
    "status": "avl",
    "currentBooking":null
    }
12. To view all bookings use rest api http GET at http://localhost:8080/api/bookings
