from dev_util import build_web, rewrite_file_path
import argparse

arg_parser = argparse.ArgumentParser()
arg_parser.add_argument("-dev", action="store_true", help="develop build")

args = arg_parser.parse_args()

build_web(args.dev)
rewrite_file_path()
