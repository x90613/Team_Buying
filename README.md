# Team_Buying
## Project Introduction
Group ordering meals or drinks is a common scenario in everyday life, especially for teams or groups of friends. However, organizing orders and tracking payments can be heavy, especially for the organizer. Our project aims to simplify this process by developing an online team buying system, which allows the host to create and share order links for participants, streamline ordering, and track payments efficiently.
In this system, the host can quickly log in to the platform without registering an account, create a new order (such as "Lunch Bento" or "Drink Order"), and generate a shareable link for participants. The link allows participants to choose their desired meals or drinks, making it easy for the host to gather all the orders in one place. Once the ordering process is complete, the host can access a final order list for easy reference when placing the phone or online order.
Furthermore, the system includes features to assist with payment collection. The host can display their bank transfer details or a QR code for participants to make payments. After payment, the host can track the payment status through a list showing which participants have completed their payments, manually marking them as paid.
The scope of this project includes user authentication, order creation, link generation and sharing, payment tracking, and notification functionalities, ensuring a seamless and efficient group ordering experience for both the host and participants.

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
