import os
import subprocess


def build_web(is_develop=True):
    os.chdir("labelpt/web")
    if is_develop:
        subprocess.run(["npm", "run", "dev-build"], shell=True)
    else:
        subprocess.run(["npm", "run", "prod-build"], shell=True)
    os.chdir("../../")


def rewrite_file_path():
    with open("labelpt/web/build/index.html", "r") as file:
        text = file.read()
        text = text.replace("/sta", "./sta")
    with open("labelpt/web/build/index.html", "w") as file:
        file.write(text)
