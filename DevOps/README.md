**Run Jenkins using Docker**
==========================

This repository contains a Docker image for Jenkins, which can be run using the following command:

```bash
docker run -d -p 8080:8080 -p 50000:50000 -v /mnt/c/Users/~~/Jenkins:/var/jenkins_home ian80327/my-jenkins-updated:latest
```

**Prerequisites**
---------------

* Docker installed on your machine
* A directory on your host machine to persist Jenkins data (in this case, `/mnt/c/Users/ian80/OneDrive/Desktop/Jenkins`)

**Explanation of the command**
-----------------------------

* `docker run`: Runs a new container from the specified image.
* `-d`: Detaches the container from the terminal, running it in the background.
* `-p 8080:8080`: Maps port 8080 on the host machine to port 8080 in the container, allowing access to the Jenkins web interface.
* `-p 50000:50000`: Maps port 50000 on the host machine to port 50000 in the container, used for Jenkins slaves.
* `-v /mnt/c/Users/ian80/OneDrive/Desktop/Jenkins:/var/jenkins_home`: Mounts a volume from the host machine to the container, persisting Jenkins data even after the container is restarted or deleted.
* `ian80327/my-jenkins-updated:latest`: Specifies the Docker image to use.

**Accessing Jenkins**
--------------------

After running the command, you can access Jenkins by visiting `http://localhost:8080` in your web browser.

**Setting up Jenkins**
---------------------

### Step 1: Input Administrator Password

* Go to the directory where you mounted the Jenkins data volume (e.g., `/mnt/c/Users/ian80/OneDrive/Desktop/Jenkins`)
* Look for a file called `secrets/initialAdminPassword` inside that directory
* Open the file and copy the password
* Go back to the Jenkins web interface and paste the password into the "Administrator password" field
* Click "Continue" to proceed with the setup

### Next Steps

* You will be prompted to create a new admin user or continue with the default admin user
* Follow the on-screen instructions to complete the setup process

**Troubleshooting**
------------------

If you encounter any issues, check the Docker logs for errors:

```bash
docker logs -f <container_id>
```

Replace `<container_id>` with the ID of the container running Jenkins.

I hope this helps! If you have any questions or need further assistance, feel free to ask.
