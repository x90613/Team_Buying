# Team_Buying
## Project Introduction
Group ordering meals or drinks is a common scenario in everyday life, especially for teams or groups of friends. However, organizing orders and tracking payments can be heavy, especially for the organizer. Our project aims to simplify this process by developing an online team buying system, which allows the host to create and share order links for participants, streamline ordering, and track payments efficiently.
In this system, the host can quickly log in to the platform without registering an account, create a new order (such as "Lunch Bento" or "Drink Order"), and generate a shareable link for participants. The link allows participants to choose their desired meals or drinks, making it easy for the host to gather all the orders in one place. Once the ordering process is complete, the host can access a final order list for easy reference when placing the phone or online order.
Furthermore, the system includes features to assist with payment collection. The host can display their bank transfer details or a QR code for participants to make payments. After payment, the host can track the payment status through a list showing which participants have completed their payments, manually marking them as paid.
The scope of this project includes user authentication, order creation, link generation and sharing, payment tracking, and notification functionalities, ensuring a seamless and efficient group ordering experience for both the host and participants.


```
Mysql port = 3306
Spring boot port = 9090
```

Start up your SQL Database
```bash 
# Start up the SQL database container in detached mode
docker compose up -d

# Stop and remove all containers
docker-compose down

# List all containers and their statuses
docker ps -a

# Restart a stopped container
docker start <container_name_or_id>

```