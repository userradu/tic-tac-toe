#!/usr/bin/env python3

from http.server import BaseHTTPRequestHandler,HTTPServer
import json
from ticTacToe import getNextMove

class RequestHandler(BaseHTTPRequestHandler):

    def do_OPTIONS(self):
        print('options request made')
        
        #send code 200 response  
        self.send_response(200)  

        #send header first 
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header('Access-Control-Allow-Headers', 'Authorization, Content-Type')
        self.send_header('Access-Control-Allow-Methods', 'POST')
        self.end_headers()  
        return
 
    def do_POST(self):
        print('post requset made')
        params = self.rfile.read(int(self.headers['Content-Length']))
        params = json.loads(params)
        nextMove = getNextMove(params["board"], params["playerToMove"]) 

        #send code 200 response  
        self.send_response(200)  

        #send header first  
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header('Content-type','application/json')  
        self.end_headers()  

        #send file content to client
        self.wfile.write(bytes(json.dumps(nextMove["state"]), 'UTF-8'))
        return
        
       
def run():
    print('http server is starting...')
    server_address = ('', 8000)
    httpd = HTTPServer(server_address, RequestHandler)
    print('http server is running...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
