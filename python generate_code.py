import os

def generate_code(path):
    if not os.path.exists(path):
        os.makedirs(path)
    with open(os.path.join(path, "generated_code.txt"), "w") as f:
        f.write("This is generated code.")
