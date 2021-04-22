import os
import socket
from tkinter import Tk
from tkinter import messagebox
import eel
from labelpt.app.presenter import *  # required


def is_port_used(host: str, port: int) -> bool:
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    result_code = sock.connect_ex((host, port))
    sock.close()
    return result_code == 0


def disable_tk_window():
    root = Tk()
    root.attributes('-topmost', True)
    root.withdraw()


def main():
    disable_tk_window()
    port = 14141
    host = "localhost"
    if is_port_used(host, port):
        messagebox.showerror("Error", f"Port {port} is not opened. \nPlease open the port.")
        return
    eel.init(os.path.dirname(os.path.abspath(__file__)) + "/labelpt/web/build")
    eel.start("index.html", port=port)


main()
