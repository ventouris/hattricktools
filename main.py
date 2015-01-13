#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Copyright 2007 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
from flask import Flask
from flask import render_template
from flask import request

from flask import jsonify

app = Flask(__name__)



@app.route("/")
def index():
	tools = []
	names = ["training estimation","arena calculator","healing calculator","future coach","training plan","team spirit","players comparison"]
	for name in names:
		tools.append({"name":name,"desc":"Here is some more information about this product that is only revealed once clicked on.","img":"/static/images/futurecoach.png"})
	
	return render_template("index.html", tools=tools)

@app.route("/training")
def training():
    param = {}
    param["years"] = request.args.get('years',17)
    param["days"] = request.args.get('days',0)
    param["skilllevel"] = request.args.get('skilllevel',1)
    param["subskill"] = request.args.get('subskill',0)
    param["coachlevel"] = request.args.get('coachlevel',7)
    param["assistants"] = request.args.get('assistants',10)
    param["intensity"] = request.args.get('intensity',100)
    param["stamina"] = request.args.get('stamina',5)
    param["skill"] = request.args.get('skill',"")
    param["skill"].replace("%","%25").replace(" ","%20").replace("(","%28").replace(")","%29")

    return render_template("training.html", param=param)

@app.route("/healing")
def healing():
    param = {}
    param["TSIA"] = request.args.get('TSIA',0)
    param["TSIB"] = request.args.get('TSIB',0)
    param["mediclevel"] = request.args.get('mediclevel',0)
    param["age"] = request.args.get('age',17)
    param["weeks"] = request.args.get('weeks',0)

    TSIA = int(param["TSIA"])
    TSIB = int(param["TSIB"])
    if TSIA != 0 and TSIB != 0:
        param["weeks"] = round(((float(TSIB-TSIA))/TSIB)*10,1)
   
    return render_template("healing.html", param=param)

if __name__ == "__main__":
	app.run(debug=True)
