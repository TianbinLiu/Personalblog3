---
toc: True
comments: False
layout: post
description: Some useful command
title: Linux Commands
type: hacks
---

# Some Linux Commands I usually used


```java
mkdir [folder name]  //create a new folder/directory

cd //change to root directory

cd [folder name] //change to certain folder/directory

code [directory name] //vscode command, open certain repository on vscode

code . //vscode command, open the directory you are in now.

rm -rf [foldernamehere] //remove folder

//----------------------------------git commands-----------------------------------------------------


git clone [link] //git command, git clone repository

git pull //pull the changes from repository

git push //push your changes to repository

//----------------------------------------------------------------------------------------------------
//pm2 command, used in AWS, or when you need to host your web on server.
pm2 restart all
pm2 start [js file name]

//Keep command running in background/server (AWS EC2), Using tmux

sudo apt update           //install tmux
sudo apt install tmux

tmux           //start a new tmux session

cd [directory name]         //where your script file is located

node script.js             //run your script

Ctrl b,    then press "d"      //Detach from the tmux session

Now the command is running in background, you can freely log out and exit the terminal.

tmux attach       //Reattach to the tmux session (Optional)

//-------------------------------Some useful commands-------------------------------------------------------
vim commands //by those commands you can directly edit the file on server

ls commands: //ls means "list", https://linuxize.com/post/how-to-list-files-in-linux-using-the-ls-command/
ls  //to list all the file under your current directory

cat [file name] //To view the content of certain file under current directory
//--------------------------------Running Github Pages locally (WSL)------------------------------------------

command:
// WSL/Ubuntu commands
sudo apt install //installs packages for Ubuntu
echo "=== Ugrade Packages ==="
sudo apt update
sudo apt upgrade -y

echo "=== Install Ruby ==="
sudo apt install -y ruby-full build-essential zlib1g-dev

echo "=== Install Python ==="
sudo apt-get install -y python3 python3-pip python-is-python3

echo "=== Install Jupyter Notebook ==="
sudo apt-get install -y jupyter-notebook

after that, run:
bundle install
make

//make commands
make //This runs the local server

make clean //stops the local server and cleans the files (recommended to use this to stop). This means you will be unable to access your blog on http://localhost until you run make again.

make stop //stops the local server.

make convert //converts Jupyter Notebook files, run this if your .ipynb files are not updating on the server.

//----------------------------------------------Tool/dependencies version check-----------------------------------------------------------
// Show the active Ruby version, MacOS is 3.1.4
ruby -v

// Show active Python version, it needs to be 3.9 or better
python --version

// Setup Python libraries for Notebook conversion
pip install nbconvert  # library for notebook conversion
pip install nbformat  # notebook file utility
pip install pyyaml  # notebook frontmatter

// Show Jupyter packages, nbconvert needs to be in the list
jupyter --version
// Show Kernels, python3 needs to be in list
jupyter kernelspec list // does not work on Cloud Ubuntu
```
