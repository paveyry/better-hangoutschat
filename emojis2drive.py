from __future__ import print_function
import os
import sys
from apiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from httplib2 import Http
from oauth2client import file as oauthfile, client, tools
import json
import requests

"""
Usage: python3 emojis2drive.py <GDriveFolderID> <InputEmojiJson1> <InputEmojiJson2>...
You can specify as many emoji sheets as you want and they will be merged into one
"""


def main(args):
   folderID = args[1]
   inputjson = {}
   for s in args[2:]:
      with open(s) as f:
         inputjson.update(json.loads(f.read()))

   # Setup the Drive v3 API
   SCOPES = 'https://www.googleapis.com/auth/drive'
   store = oauthfile.Storage('credentials.json')
   creds = store.get()
   if not creds or creds.invalid:
      flow = client.flow_from_clientsecrets('client_secret.json', SCOPES)
      creds = tools.run_flow(flow, store)
   drive_service = build('drive', 'v3', http=creds.authorize(Http()))

   driveEmojis = {}

   for k, v in inputjson.items():
      img_data = requests.get(v).content
      image_type = str(v).split('.')[-1]
      filename = '%s.%s' % (k, image_type)
      with open(filename, 'wb') as handler:
         handler.write(img_data)

      file_metadata = {'name': k, 'parents': [folderID]}
      media = MediaFileUpload(filename,
                              mimetype='image/%s' % image_type)
      file = drive_service.files().create(body=file_metadata,
                                          media_body=media,
                                          fields='id').execute()
      driveEmojis[k] = 'https://drive.google.com/uc?id=' + file.get('id')
      print("Added " + filename)
      os.remove(filename)

   with open('drive_emojis.json', 'w') as f:
      json.dump(driveEmojis, f)


if __name__ == '__main__':
   main(sys.argv)