# Team Buying Project  
## Introduction  
<img width="660" alt="Screenshot 2024-12-11 at 12 10 33 PM" src="https://github.com/user-attachments/assets/d2a8d68d-3fd4-4153-b9ac-3fded1f5574a">

Group ordering meals or drinks can be convenient, but organizing orders and tracking payments is often a hassle. This project provides a streamlined solution with an online team buying system, making the process simple and efficient for both organizers and participants.  

### Key Features  

1. **Quick Access Without Registration**  
   - No need for account creation. Organizers can log in quickly to start.  

2. **Order Creation and Sharing**  
   - Hosts can create new orders (e.g., "Lunch Bento," "Drink Order").  
   - Generate a shareable link for participants to choose their items.  

3. **Centralized Order Collection**  
   - Participants' choices are collected in one place for easy management.  
   - Final order summary provided for the host to place the order.  

4. **Payment Assistance**  
   - Hosts can display bank transfer details or a QR code for payments.  
   - Track payment statuses and manually mark participants as "paid."  

5. **Seamless and Efficient Workflow**  
   - Simple steps for both hosts and participants.  
   - Ensures a smooth experience from ordering to payment collection.  

This system is designed to take the stress out of group orders, letting everyone focus on enjoying their meals or drinks instead of worrying about logistics!

### Main Page 
  <img width="496" alt="Screenshot 2024-12-11 at 12 12 25 PM" src="https://github.com/user-attachments/assets/50a61053-1401-4a65-8b68-c41abc6a009c">


# Start Database

### Ports
- MySQL port: **3306**
- Spring Boot port: **9090**

### Start up your SQL Database

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


# How to Use Pre-commit in This Project

Pre-commit is a tool used in this project to ensure consistent code quality by automatically running checks and formatting code before you commit it. This guide explains how to set up and use pre-commit effectively.

---

## **1. Setting Up Pre-commit**

1. **Ensure Python is Installed**
   - Pre-commit requires Python (version 3.6 or higher). Verify Python is installed by running:

2. **Install Pre-commit**
   - Install Pre-commit globally using pip:
     ```bash
     pip install pre-commit
     ```

3. **Install Git Hooks**
   - Run the following command in the root directory of the repository to set up pre-commit hooks:
     ```bash
     pre-commit install
     ```
   - This command installs git hooks so that pre-commit runs automatically on every `git commit`.

4. **Optional: Update Pre-commit Hooks**
   - To ensure you have the latest hooks, run:
     ```bash
     pre-commit autoupdate
     ```

---

## **2. Running Pre-commit**

1. **Get the needed pre-commit file in the main branch**
     ```bash
     git checkout main -- .pre-commit-config.yaml
     git checkout main -- google-java-format.jar
     ```

2. **Manually for All Files**
   - To manually check all files in the repository, run:
     ```bash
     pre-commit run --all-files
     ```

3. **Manually for Specific Files**
   - To check specific files, run:
     ```bash
     pre-commit run --files <file1> <file2>
     ```

---

## **3. Common Issues and Solutions**

### **No Changes Detected**
- If pre-commit skips hooks with "no files to check," it means there are no relevant files staged or no issues found.

### **File Auto-Fixes**
- If pre-commit fixes some issues automatically, you need to stage the modified files and re-commit:
  ```bash
  git add .
  git commit -m "Apply pre-commit fixes"
