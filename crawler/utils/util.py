def store_json(json_data: str, output_path: str):
    with open(output_path, 'w+') as fp:
        fp.write(json_data)
        print(f'[INFO] JSON data is written to "{output_path}"')
