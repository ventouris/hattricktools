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
from flask import Flask, render_template, request, json, redirect, make_response, jsonify

from xml.dom.minidom import parse, parseString

import os
from oauthhelper import OAuthHelper

import json


app = Flask(__name__)
oauth_helper = OAuthHelper()


def languages(page):
    langcode = request.cookies.get("Language","en")
    json_file = "/data/locale/%s/%s.json" % (langcode, page)

    ROOT_PATH = os.path.abspath(os.path.dirname(__file__))
    file_path = ROOT_PATH + json_file

    json_data = open(file_path)
    strings = json.load(json_data)

    pagestr = {}

    for i in strings:
        pagestr[i] = strings[i]

    json_file = "/data/locale/%s/header.json" % (langcode)

    ROOT_PATH = os.path.abspath(os.path.dirname(__file__))
    file_path = ROOT_PATH + json_file

    json_data = open(file_path)
    strings = json.load(json_data)
    
    headerstr = {}

    for i in strings:
        headerstr[i] = strings[i]

    jsonfile = "/data/locale/%s/htlang.json" % (langcode)
    file_path = ROOT_PATH + jsonfile

    json_data = open(file_path)
    data = json.load(json_data)

    dic = {}

    dic["fans"] = {}
    for i in data["language"]["fans"]:
        dic["fans"][i["value"]] = i["text"]
    dic["fans"] = json.dumps(dic["fans"], ensure_ascii=False)

    dic["levels"] = {}
    for i in data["language"]["levels"]:
        dic["levels"][i["value"]] = i["text"]
    dic["levels"] = json.dumps(dic["levels"], ensure_ascii=False)

    dic["skills"] = {}
    for i in data["language"]["skills"]:
        dic["skills"][i["type"]] = i["value"]

    dic["leagueNames"] = {}
    for i in data["language"]["leagueNames"]:
        dic["leagueNames"][i] = data["language"]["leagueNames"][i]

    dic["spirit"] = {}
    for i in data["language"]["spirit"]:
        dic["spirit"][i["value"]] = i["text"]
    dic["spirit"] = json.dumps(dic["spirit"], ensure_ascii=False)

    return pagestr,dic,headerstr

@app.route("/login")
def login():
    verifier = request.args.get("oauth_verifier","")
    if verifier:
        token = request.cookies.get("token")
        secret = request.cookies.get("secret")
        access_token = oauth_helper.get_access_token(token,secret,verifier)

        token_key = access_token.key
        secret_key = access_token.secret

        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'managercompendium',{"version":1.0})
        dom = parseString(xml)
        manager = dom.getElementsByTagName("Loginname")[0].firstChild.nodeValue

        resp = redirect("/")
        resp.set_cookie("token_key", token_key, max_age= 7*60*60 * 1000)
        resp.set_cookie("secret_key", secret_key, max_age= 7*60*60 * 1000)
        resp.set_cookie("username", manager, max_age= 7*60*60 * 1000)

        return resp
    else:
        token, secret, registration_url = oauth_helper.get_request_token_url()
        resp = redirect(registration_url)
        resp.set_cookie('token', token)
        resp.set_cookie("secret", secret)

        return resp

def islogin():
    token_key = request.cookies.get("token_key")
    secret_key = request.cookies.get("secret_key")
    login = False
    teams = []
    if token_key:
        login = True

        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'teamdetails',{"version":3.1})
        dom = parseString(xml)
        teamsapi =  dom.getElementsByTagName("Team")
        
        for i in teamsapi:
            mylist = [i.getElementsByTagName("TeamID")[0].firstChild.nodeValue,i.getElementsByTagName("TeamName")[0].firstChild.nodeValue]
            teams.append(mylist)

    return login,teams



@app.route("/")
def index():
	tools = []
	names = ["training estimation","arena calculator","healing calculator","future coach","training plan","team spirit","players comparison"]
	for name in names:
		tools.append({"name":name,"desc":"Here is some more information about this product that is only revealed once clicked on.","img":"/static/images/futurecoach.png"})
	
	return render_template("index.html", tools=tools)

@app.route("/training")
def training():

    pagestr, htlang, headerstr = languages("training")
    login, teams = islogin()
    
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

    return render_template("training.html", param=param, pagestr=pagestr, htlang=htlang, headerstr=headerstr, login=login, teams=teams)


@app.route("/guessmainskill")
def guessmainskill():

    pagestr, htlang, headerstr = languages("guessmainskill")
    login, teams = islogin()

    param = {}
    param["age"] = request.args.get('age',17)
    param["wage"] = request.args.get('wage',"")
    param["skill"] = request.args.get('skill',"")
    

    return render_template("guessmainskill.html", param=param, pagestr=pagestr, htlang=htlang, headerstr=headerstr,login=login, teams=teams)


@app.route("/trainingintensity")
def trainingintensity():

    pagestr, htlang, headerstr = languages("trainingintensity")
    login, teams = islogin()

    param = {}
    

    return render_template("trainingintensity.html", param=param, pagestr=pagestr, htlang=htlang, headerstr=headerstr,login=login, teams=teams)


@app.route("/formationexperience")
def formationexperience():

    pagestr, htlang, headerstr = languages("formationexperience")
    login, teams = islogin()

    param = {}
   

    return render_template("formationexperience.html", param=param, pagestr=pagestr, htlang=htlang, headerstr=headerstr,login=login, teams=teams)



@app.route("/totalexperience")
def totalexperience():

    pagestr, htlang, headerstr = languages("totalexperience")
    login, teams = islogin()

    param = {}
    

    return render_template("totalexperience.html", param=param, pagestr=pagestr, htlang=htlang, headerstr=headerstr, login= login, teams=teams)


@app.route('/hattrickweek/')
def hattrickweek():

    pagestr, htlang, headerstr = languages("hattrickweek")
    login, teams = islogin()

    ## country : [training, economy, league, cup]

    param = {}
    param["program"] = {'133': ['Thursday,13:15', 'Sunday,00:18', 'Sunday,16:35', 'Wednesday,16:35'], '132': ['Friday,06:07', 'Saturday,02:22', 'Sunday,07:45', 'Wednesday,06:30'], '131': ['Thursday,16:30', 'Friday,23:20', 'Saturday,11:55', 'Wednesday,11:55'], '130': ['Thursday,13:00', 'Saturday,04:27', 'Saturday,19:40', 'Tuesday,19:40'], '137': ['Thursday,13:15', 'Sunday,01:12', 'Sunday,18:25', 'Wednesday,18:25'], '136': ['Friday,08:00', 'Saturday,01:50', 'Sunday,05:00', 'Wednesday,05:00'], '135': ['Thursday,13:15', 'Sunday,00:18', 'Sunday,16:40', 'Wednesday,16:40'], '134': ['Thursday,13:15', 'Sunday,00:18', 'Sunday,16:40', 'Wednesday,16:40'], '139': ['Thursday,13:00', 'Saturday,04:33', 'Sunday,18:45', 'Wednesday,11:45'], '138': ['Thursday,17:15', 'Friday,22:30', 'Saturday,08:00', 'Wednesday,05:15'], '24': ['Friday,02:30', 'Saturday,23:45', 'Sunday,09:00', 'Wednesday,18:00'], '25': ['Thursday,19:00', 'Saturday,01:30', 'Saturday,21:45', 'Wednesday,21:45'], '26': ['Thursday,18:00', 'Friday,23:35', 'Saturday,17:30', 'Wednesday,11:30'], '27': ['Thursday,13:00', 'Saturday,04:27', 'Sunday,09:30', 'Wednesday,21:30'], '20': ['Friday,06:05', 'Saturday,04:44', 'Sunday,08:15', 'Wednesday,06:00'], '21': ['Friday,05:45', 'Saturday,01:45', 'Sunday,16:30', 'Wednesday,20:15'], '22': ['Friday,04:15', 'Saturday,03:15', 'Sunday,04:15', 'Wednesday,02:30'], '23': ['Friday,05:30', 'Sunday,02:25', 'Monday,00:45', 'Thursday,02:15'], '28': ['Thursday,23:00', 'Sunday,03:41', 'Monday,00:30', 'Thursday,00:30'], '29': ['Friday,06:15', 'Sunday,03:15', 'Monday,01:30', 'Wednesday,23:30'], '4': ['Thursday,23:45', 'Saturday,02:00', 'Saturday,12:00', 'Tuesday,19:00'], '8': ['Friday,03:30', 'Sunday,01:30', 'Monday,01:00', 'Thursday,01:00'], '120': ['Thursday,13:09', 'Sunday,01:09', 'Sunday,14:40', 'Wednesday,17:40'], '121': ['Thursday,11:44', 'Saturday,04:44', 'Sunday,18:20', 'Wednesday,11:50'], '122': ['Thursday,18:31', 'Sunday,00:31', 'Sunday,14:10', 'Wednesday,14:40'], '123': ['Thursday,13:15', 'Sunday,00:18', 'Sunday,16:50', 'Wednesday,16:50'], '124': ['Friday,01:45', 'Sunday,03:43', 'Sunday,22:10', 'Wednesday,22:10'], '125': ['Thursday,13:15', 'Sunday,01:12', 'Sunday,18:25', 'Wednesday,18:25'], '126': ['Thursday,13:00', 'Saturday,04:33', 'Sunday,18:55', 'Wednesday,18:55'], '127': ['Thursday,13:15', 'Sunday,00:18', 'Sunday,16:10', 'Wednesday,16:10'], '128': ['Thursday,13:15', 'Sunday,00:18', 'Sunday,16:25', 'Wednesday,16:25'], '129': ['Thursday,18:30', 'Sunday,00:58', 'Sunday,14:25', 'Wednesday,14:25'], '59': ['Thursday,13:30', 'Friday,22:45', 'Saturday,08:30', 'Wednesday,11:00'], '58': ['Thursday,16:45', 'Friday,23:20', 'Saturday,13:45', 'Wednesday,08:45'], '55': ['Thursday,14:15', 'Saturday,03:21', 'Sunday,06:15', 'Wednesday,03:30'], '54': ['Thursday,17:00', 'Friday,23:00', 'Saturday,09:00', 'Wednesday,07:45'], '57': ['Thursday,16:30', 'Friday,23:20', 'Saturday,12:45', 'Wednesday,12:45'], '56': ['Thursday,18:15', 'Friday,23:45', 'Saturday,11:15', 'Wednesday,12:15'], '51': ['Thursday,17:45', 'Friday,23:15', 'Saturday,15:30', 'Wednesday,09:45'], '50': ['Thursday,17:15', 'Friday,23:25', 'Saturday,11:00', 'Wednesday,09:45'], '53': ['Thursday,18:45', 'Friday,23:15', 'Saturday,11:45', 'Wednesday,13:45'], '52': ['Thursday,17:30', 'Friday,23:30', 'Saturday,11:30', 'Wednesday,14:00'], '88': ['Friday,00:50', 'Sunday,03:25', 'Sunday,23:15', 'Wednesday,23:15'], '89': ['Thursday,17:15', 'Friday,23:25', 'Saturday,20:15', 'Tuesday,20:15'], '111': ['Friday,01:15', 'Sunday,03:26', 'Sunday,23:40', 'Wednesday,23:40'], '110': ['Friday,02:15', 'Sunday,03:44', 'Sunday,22:20', 'Wednesday,22:20'], '113': ['Thursday,23:30', 'Sunday,03:37', 'Sunday,23:10', 'Wednesday,23:10'], '112': ['Friday,06:04', 'Saturday,02:24', 'Sunday,08:00', 'Wednesday,12:10'], '83': ['Thursday,13:15', 'Sunday,00:49', 'Sunday,11:50', 'Wednesday,18:45'], '80': ['Thursday,13:15', 'Sunday,00:47', 'Sunday,16:15', 'Wednesday,16:45'], '81': ['Friday,07:45', 'Sunday,03:33', 'Sunday,23:45', 'Wednesday,23:45'], '119': ['Thursday,14:29', 'Friday,22:29', 'Saturday,07:50', 'Wednesday,07:50'], '118': ['Thursday,13:11', 'Sunday,01:12', 'Sunday,19:25', 'Wednesday,20:10'], '84': ['Friday,04:40', 'Saturday,23:39', 'Sunday,14:45', 'Wednesday,14:45'], '85': ['Friday,06:06', 'Saturday,03:23', 'Sunday,15:45', 'Wednesday,15:45'], '3': ['Friday,00:30', 'Saturday,00:00', 'Saturday,18:00', 'Tuesday,18:00'], '7': ['Friday,06:00', 'Saturday,03:30', 'Sunday,21:40', 'Thursday,01:30'], '102': ['Friday,06:03', 'Saturday,02:23', 'Sunday,07:30', 'Wednesday,07:30'], '103': ['Thursday,18:30', 'Sunday,00:54', 'Sunday,17:45', 'Wednesday,17:45'], '100': ['Friday,03:50', 'Sunday,03:10', 'Monday,01:45', 'Thursday,01:45'], '101': ['Friday,04:25', 'Saturday,02:00', 'Sunday,19:15', 'Wednesday,17:15'], '106': ['Thursday,13:15', 'Sunday,01:19', 'Sunday,18:40', 'Wednesday,18:40'], '107': ['Friday,04:30', 'Sunday,03:20', 'Monday,01:10', 'Thursday,01:10'], '104': ['Thursday,18:30', 'Sunday,00:58', 'Sunday,14:20', 'Wednesday,14:20'], '105': ['Friday,06:25', 'Saturday,01:28', 'Sunday,15:15', 'Wednesday,15:15'], '39': ['Friday,07:00', 'Saturday,23:52', 'Sunday,09:30', 'Wednesday,09:30'], '38': ['Friday,06:45', 'Saturday,23:35', 'Sunday,19:30', 'Wednesday,20:45'], '33': ['Thursday,04:07', 'Friday,15:07', 'Saturday,10:50', 'Tuesday,18:50'], '32': ['Thursday,16:06', 'Saturday,04:30', 'Sunday,15:00', 'Wednesday,08:00'], '31': ['Friday,04:20', 'Saturday,02:20', 'Sunday,05:30', 'Wednesday,05:30'], '30': ['Friday,04:45', 'Saturday,04:40', 'Sunday,04:45', 'Wednesday,02:00'], '37': ['Thursday,21:15', 'Friday,23:15', 'Saturday,10:00', 'Wednesday,10:00'], '36': ['Friday,01:00', 'Saturday,01:00', 'Saturday,14:00', 'Wednesday,12:00'], '35': ['Thursday,18:30', 'Saturday,23:40', 'Sunday,08:30', 'Wednesday,08:30'], '34': ['Thursday,14:30', 'Friday,22:30', 'Saturday,07:00', 'Wednesday,07:00'], '60': ['Thursday,15:30', 'Friday,22:16', 'Saturday,05:00', 'Wednesday,03:00'], '61': ['Thursday,15:30', 'Friday,21:30', 'Saturday,21:30', 'Tuesday,21:30'], '62': ['Thursday,15:30', 'Friday,22:15', 'Saturday,13:25', 'Tuesday,21:15'], '63': ['Thursday,15:30', 'Friday,22:15', 'Saturday,10:30', 'Tuesday,20:30'], '64': ['Thursday,15:30', 'Friday,22:17', 'Saturday,13:20', 'Tuesday,19:30'], '66': ['Thursday,17:30', 'Friday,23:30', 'Saturday,15:20', 'Wednesday,19:20'], '67': ['Thursday,17:30', 'Friday,23:30', 'Saturday,15:25', 'Tuesday,19:25'], '68': ['Thursday,18:30', 'Saturday,23:50', 'Sunday,09:45', 'Wednesday,08:15'], '69': ['Thursday,16:30', 'Friday,23:20', 'Saturday,13:30', 'Wednesday,14:15'], '2': ['Thursday,21:00', 'Friday,21:00', 'Sunday,18:00', 'Tuesday,21:00'], '6': ['Friday,03:45', 'Sunday,01:00', 'Sunday,17:30', 'Thursday,02:00'], '99': ['Friday,03:45', 'Sunday,03:28', 'Monday,01:15', 'Thursday,01:15'], '98': ['Thursday,16:30', 'Friday,23:20', 'Saturday,16:45', 'Tuesday,20:45'], '91': ['Thursday,18:30', 'Sunday,00:44', 'Sunday,10:15', 'Wednesday,09:15'], '93': ['Thursday,15:30', 'Friday,22:15', 'Saturday,22:15', 'Tuesday,22:15'], '95': ['Thursday,13:15', 'Sunday,00:44', 'Sunday,12:45', 'Wednesday,11:15'], '94': ['Friday,01:45', 'Sunday,03:43', 'Sunday,22:15', 'Wednesday,22:15'], '97': ['Thursday,16:30', 'Friday,23:20', 'Saturday,12:15', 'Wednesday,10:15'], '96': ['Friday,00:45', 'Sunday,03:31', 'Monday,00:16', 'Thursday,00:15'], '11': ['Friday,03:00', 'Sunday,01:20', 'Sunday,16:00', 'Wednesday,16:30'], '12': ['Friday,05:00', 'Saturday,00:20', 'Saturday,20:00', 'Tuesday,20:00'], '15': ['Friday,04:00', 'Saturday,00:10', 'Sunday,04:00', 'Wednesday,04:00'], '14': ['Friday,01:05', 'Sunday,02:00', 'Sunday,20:00', 'Wednesday,17:00'], '17': ['Friday,07:30', 'Sunday,02:15', 'Sunday,23:00', 'Wednesday,23:00'], '16': ['Friday,00:05', 'Sunday,01:45', 'Monday,00:15', 'Thursday,00:00'], '19': ['Friday,06:30', 'Sunday,03:40', 'Monday,00:50', 'Thursday,00:50'], '18': ['Friday,08:15', 'Sunday,03:30', 'Sunday,22:40', 'Wednesday,22:40'], '117': ['Thursday,05:18', 'Saturday,01:59', 'Saturday,19:50', 'Tuesday,19:50'], '46': ['Thursday,23:15', 'Saturday,02:15', 'Saturday,17:00', 'Wednesday,10:30'], '47': ['Friday,00:15', 'Saturday,03:27', 'Sunday,04:30', 'Wednesday,04:30'], '44': ['Friday,01:00', 'Sunday,00:25', 'Sunday,13:00', 'Wednesday,13:00'], '45': ['Friday,08:00', 'Saturday,01:50', 'Sunday,05:00', 'Wednesday,05:00'], '1': ['Thursday,22:00', 'Sunday,00:00', 'Sunday,10:00', 'Wednesday,19:00'], '5': ['Friday,05:15', 'Saturday,02:30', 'Saturday,21:00', 'Wednesday,15:00'], '9': ['Thursday,20:30', 'Friday,23:00', 'Saturday,16:00', 'Wednesday,16:00'], '146': ['Thursday,13:00', 'Saturday,04:33', 'Sunday,18:55', 'Wednesday,18:55'], '147': ['Friday,00:50', 'Sunday,03:25', 'Sunday,23:15', 'Wednesday,23:15'], '144': ['Friday,06:05', 'Saturday,04:44', 'Sunday,08:15', 'Wednesday,06:00'], '145': ['Thursday,18:30', 'Sunday,00:58', 'Sunday,14:30', 'Wednesday,14:30'], '142': ['Thursday,13:15', 'Sunday,00:44', 'Sunday,12:45', 'Wednesday,11:15'], '143': ['Thursday,13:15', 'Sunday,00:18', 'Sunday,16:20', 'Wednesday,16:20'], '140': ['Thursday,13:15', 'Sunday,00:18', 'Sunday,16:35', 'Wednesday,16:35'], '141': ['Thursday,13:15', 'Sunday,00:18', 'Sunday,16:10', 'Wednesday,16:10'], '148': ['Thursday,13:20', 'Sunday,00:23', 'Sunday,16:15', 'Wednesday,16:15'], '77': ['Thursday,13:15', 'Sunday,01:12', 'Sunday,15:25', 'Wednesday,20:50'], '76': ['Friday,06:42', 'Saturday,23:32', 'Sunday,16:45', 'Wednesday,16:45'], '75': ['Thursday,13:00', 'Saturday,04:33', 'Sunday,18:45', 'Wednesday,11:45'], '74': ['Thursday,09:40', 'Friday,22:45', 'Saturday,22:45', 'Tuesday,22:45'], '73': ['Thursday,09:35', 'Friday,23:45', 'Saturday,23:45', 'Tuesday,23:45'], '72': ['Thursday,09:35', 'Friday,23:15', 'Saturday,23:15', 'Tuesday,23:15'], '71': ['Friday,06:07', 'Saturday,02:22', 'Sunday,07:30', 'Wednesday,06:15'], '70': ['Thursday,17:15', 'Friday,22:30', 'Saturday,08:00', 'Wednesday,05:15'], '79': ['Thursday,13:15', 'Sunday,00:18', 'Sunday,16:20', 'Wednesday,16:20']}
    return render_template("hattrickweek.html", param = param, pagestr=pagestr, htlang=htlang, headerstr=headerstr, login= login, teams=teams)


@app.route("/ratingspredictor")
def ratingspredictor():

    pagestr, htlang, headerstr = languages("training")
    login, teams = islogin()

    param = {}
    param["coachlevel"] = request.args.get('coachlevel',7)
    param["assistants"] = request.args.get('assistants',12)
    param["intensity"] = request.args.get('intensity',100)
    param["stamina"] = request.args.get('stamina',5)
    

    return render_template("ratingspredictor.html", param=param, pagestr=pagestr, htlang=htlang, headerstr=headerstr, login= login, teams=teams)


@app.route("/subskill")
def subskill():

    pagestr, htlang, headerstr = languages("subskill")
    login, teams = islogin()

    players = []

    if login:
        token_key = request.cookies.get("token_key")
        secret_key = request.cookies.get("secret_key")
        
        for team in teams:
            xml = oauth_helper.request_resource_with_key(token_key,secret_key,'players',{"version":2.3,"teamID":team[0]})
            dom = parseString(xml)
            player = dom.getElementsByTagName("Player")
            for i in player:
                i = [i.getElementsByTagName("PlayerID")[0].firstChild.nodeValue+"-"+team[0],i.getElementsByTagName("FirstName")[0].firstChild.nodeValue+" " +i.getElementsByTagName("LastName")[0].firstChild.nodeValue]
                if i not in players:
                    players.append(i)

    param = {}
    param["age"] = request.args.get('age',17)
    param["keeper"] = request.args.get('keeper',0)
    param["defending"] = request.args.get('defending',0)
    param["playmaking"] = request.args.get('playmaking',0)
    param["winger"] = request.args.get('winger',0)
    param["passing"] = request.args.get('passing',0)
    param["scoring"] = request.args.get('scoring',0)
    param["setpieces"] = request.args.get('setpieces',0)
    param["wage"] = request.args.get('wage',"")

    return render_template("subskill.html", param=param, pagestr=pagestr, htlang=htlang, headerstr=headerstr, login=login, players = players)

@app.route("/botification")
def botification():

    pagestr, htlang, headerstr = languages("botification")
    login, teams = islogin()

    param = {}
    param["lastlogin"] = request.args.get('date',"")
    param["teamid"] = request.args.get('teamid',"")
    
    

    return render_template("botification.html", param=param, pagestr=pagestr, htlang=htlang, headerstr=headerstr, login=login,teams=teams)

@app.route("/skilldrop")
def skilldrop():

    pagestr, htlang, headerstr = languages("skilldrop")
    login, teams = islogin()

    param = {}
    param["skilllevel"] = request.args.get('skilllevel',15)
    
    

    return render_template("skilldrop.html", param=param, pagestr=pagestr, htlang=htlang, headerstr=headerstr, login = login, teams=teams)

@app.route("/healing")
def healing():

    login, teams = islogin()
    players = []

    if login:
        token_key = request.cookies.get("token_key")
        secret_key = request.cookies.get("secret_key")
        
        for team in teams:
            xml = oauth_helper.request_resource_with_key(token_key,secret_key,'players',{"version":2.3,"teamID":team[0]})
            dom = parseString(xml)
            player = dom.getElementsByTagName("Player")
            for i in player:
                try:
                    injury = int(i.getElementsByTagName("InjuryLevel")[0].firstChild.nodeValue)
                except:
                    injury = 0
                if  injury > 0:
                    i = [i.getElementsByTagName("PlayerID")[0].firstChild.nodeValue+"-"+team[0],i.getElementsByTagName("FirstName")[0].firstChild.nodeValue+" " +i.getElementsByTagName("LastName")[0].firstChild.nodeValue]
                    if i not in players:
                        players.append(i)

    pagestr,htlang,headerstr = languages("healing")

    param = {}
    param["TSIA"] = request.args.get('TSIA',"")
    param["TSIB"] = request.args.get('TSIB',"")
    param["mediclevel"] = request.args.get('mediclevel',0)
    param["age"] = request.args.get('age',17)
    param["weeks"] = request.args.get('weeks',0)

    
    if param["TSIA"] != "" and param["TSIB"] != "":
        TSIA = int(param["TSIA"])
        TSIB = int(param["TSIB"])
        param["weeks"] = round(((float(TSIB-TSIA))/TSIB)*10,1)
   
    return render_template("healing.html", param=param, pagestr=pagestr, login=login, teams=teams, players=players,headerstr=headerstr)



@app.route("/arena")
def arena():

    login, teams = islogin()

    pagestr,htlang,headerstr = languages("arena")

    param = {}
    param["terper"] = request.args.get('terper',60)
    param["basper"] = request.args.get('basper',23.5)
    param["roofper"] = request.args.get('roofper',14)
    param["vipper"] = request.args.get('vipper',2.5)
    param["fans"] = request.args.get('fans',"")
    param["fansmood"] = request.args.get('fansmood',0)
    param["arenasize"] = request.args.get('arenasize',"")

      
    return render_template("arena.html", param=param, pagestr=pagestr, login=login, teams=teams, htlang=htlang,headerstr=headerstr)


@app.route("/youthplayerstars")
def youthplayerstars():

    pagestr,htlang,headerstr = languages("youthplayerstars")
    login, teams = islogin()

    param = {}
    
    return render_template("youthplayerstars.html", param=param, pagestr=pagestr,  htlang=htlang,headerstr=headerstr, login=login, teams=teams)


@app.route("/futurecoach")
def futurecoach():

    login, teams = islogin()

    players = []

    if login:
        token_key = request.cookies.get("token_key")
        secret_key = request.cookies.get("secret_key")
        
        for team in teams:
            xml = oauth_helper.request_resource_with_key(token_key,secret_key,'players',{"version":2.3,"teamID":team[0]})
            dom = parseString(xml)
            player = dom.getElementsByTagName("Player")
            for i in player:
                experience = i.getElementsByTagName("Experience")[0].firstChild.nodeValue
                leadership = i.getElementsByTagName("Leadership")[0].firstChild.nodeValue
                if int(experience) >= 4 and int(leadership) >= 3:
                    i = [i.getElementsByTagName("PlayerID")[0].firstChild.nodeValue+"-"+team[0],i.getElementsByTagName("FirstName")[0].firstChild.nodeValue+" " +i.getElementsByTagName("LastName")[0].firstChild.nodeValue]
                    players.append(i)


    pagestr,htlang,headerstr = languages("futurecoach")

    param = {}
    param["experience"] = request.args.get('experience',5)
    param["leadership"] = request.args.get('leadership',3)
    param["coachlevel"] = request.args.get('coachlevel',6)
      
    return render_template("futurecoach.html", param=param, pagestr=pagestr, login=login,teams=teams, htlang=htlang,headerstr=headerstr, players=players)





@app.route('/_jquerydownloaddata')
def jquerydownloaddata():

    team = request.args.get('team')
    name = request.args.get('name')
    token_key = request.cookies.get("token_key")
    secret_key = request.cookies.get("secret_key")

    if name == "healing":
        player = team.split("-")[0]
        team = team.split("-")[1]
        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'playerdetails',{"version":2.6,"playerID":player})
        dom = parseString(xml)
        age = dom.getElementsByTagName("Age")[0].firstChild.nodeValue
        injury = dom.getElementsByTagName("InjuryLevel")[0].firstChild.nodeValue

        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'stafflist',{"version":1.0,"teamID":team})
        dom = parseString(xml)
        staffs = dom.getElementsByTagName("Staff")
        for i in staffs:
            if i.getElementsByTagName("StaffType")[0].firstChild.nodeValue == "2":
                staff = i.getElementsByTagName("StaffLevel")[0].firstChild.nodeValue
                break
            else:
                staff = 0

        return jsonify(age = int(age), injury = float(injury), staff = int(staff))

    elif name == "arena":
        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'fans',{"version":1.2,"teamID":team})
        dom = parseString(xml)
        fans = dom.getElementsByTagName("Members")[0].firstChild.nodeValue
        try:
            fansmood = dom.getElementsByTagName("FanMood")[0].firstChild.nodeValue
        except:
            fansmood = 0

        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'arenadetails',{"version":1.5,"teamID":team})
        dom = parseString(xml)
        realterraces = int(dom.getElementsByTagName("Terraces")[0].firstChild.nodeValue)
        realbasic = int(dom.getElementsByTagName("Basic")[0].firstChild.nodeValue)
        realroof = int(dom.getElementsByTagName("Roof")[0].firstChild.nodeValue)
        realvip = int(dom.getElementsByTagName("VIP")[0].firstChild.nodeValue)
        realtotal = int(dom.getElementsByTagName("Total")[0].firstChild.nodeValue)

        return jsonify(fans = int(fans), fansmood = int(fansmood), realterraces = realterraces, realbasic = realbasic, realroof = realroof, realvip = realvip, realtotal = realtotal)

    elif name == "futurecoach":
        player = team.split("-")[0]
        team = team.split("-")[1]
        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'playerdetails',{"version":2.6,"playerID":player})
        dom = parseString(xml)
        experience = dom.getElementsByTagName("Experience")[0].firstChild.nodeValue
        leadership = dom.getElementsByTagName("Leadership")[0].firstChild.nodeValue

        return jsonify(experience = int(experience), leadership = int(leadership))

    elif name == "botification":
        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'teamdetails',{"version":3.2,"teamID":team})
        dom = parseString(xml)
        lastlogin = dom.getElementsByTagName("LastLoginDate")[0].firstChild.nodeValue
        supporter = dom.getElementsByTagName("SupporterTier")[0].firstChild.nodeValue

        return jsonify(lastlogin = lastlogin.split(" ")[0], supporter = supporter)

    elif name =="subskill":
        player = team.split("-")[0]
        team = team.split("-")[1]
        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'playerdetails',{"version":2.6,"playerID":player})
        dom = parseString(xml)

        age = dom.getElementsByTagName("Age")[0].firstChild.nodeValue
        keeper = dom.getElementsByTagName("KeeperSkill")[0].firstChild.nodeValue
        defending = dom.getElementsByTagName("DefenderSkill")[0].firstChild.nodeValue
        playmaking = dom.getElementsByTagName("PlaymakerSkill")[0].firstChild.nodeValue
        winger = dom.getElementsByTagName("WingerSkill")[0].firstChild.nodeValue
        passing = dom.getElementsByTagName("PassingSkill")[0].firstChild.nodeValue
        scoring = dom.getElementsByTagName("ScorerSkill")[0].firstChild.nodeValue
        setpieces = dom.getElementsByTagName("SetPiecesSkill")[0].firstChild.nodeValue
        wage = int(dom.getElementsByTagName("Salary")[0].firstChild.nodeValue)/10
        abroad = dom.getElementsByTagName("IsAbroad")[0].firstChild.nodeValue
        if abroad == "True":
            wage = wage/1.2

        return jsonify(age = int(age), keeper = int(keeper), defending = int(defending), playmaking = int(playmaking), winger = int(winger),
            passing = int(passing), scoring = int(scoring), setpieces = int(setpieces), wage = int(wage))

    elif name == "totalexperience":
        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'players',{"version":2.3,"teamID":team})
        dom = parseString(xml)
        players = dom.getElementsByTagName("Player")
        playerslist = []
        for i in players:
            playerslist.append([i.getElementsByTagName("FirstName")[0].firstChild.nodeValue + " " + i.getElementsByTagName("LastName")[0].firstChild.nodeValue, int(i.getElementsByTagName("Leadership")[0].firstChild.nodeValue),int(i.getElementsByTagName("Experience")[0].firstChild.nodeValue),i.getElementsByTagName("PlayerID")[0].firstChild.nodeValue])

        div = ""
        for i in playerslist:
            div = div + '''<input type="checkbox" id="%s" experience="%s" leadership="%s" playername="%s"> <label for="%s">%s</label> <br>''' % (i[3], i[2],i[1],i[0],i[3],i[0])

        
        return jsonify(div = div)

    elif name == "ratingspredictor":
        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'players',{"version":2.3,"teamID":team})
        dom = parseString(xml)
        players = []
        playersdom = dom.getElementsByTagName("Player")
        for i in playersdom:
            firstname = i.getElementsByTagName("FirstName")[0].firstChild.nodeValue
            lastname = i.getElementsByTagName("LastName")[0].firstChild.nodeValue
            name = firstname + " " + lastname
            playerid = i.getElementsByTagName("PlayerID")[0].firstChild.nodeValue
            form = i.getElementsByTagName("PlayerForm")[0].firstChild.nodeValue
            experience = i.getElementsByTagName("Experience")[0].firstChild.nodeValue
            loyalty = i.getElementsByTagName("Loyalty")[0].firstChild.nodeValue
            keeper = i.getElementsByTagName("KeeperSkill")[0].firstChild.nodeValue
            defender = i.getElementsByTagName("DefenderSkill")[0].firstChild.nodeValue
            playmaker = i.getElementsByTagName("PlaymakerSkill")[0].firstChild.nodeValue
            winger = i.getElementsByTagName("WingerSkill")[0].firstChild.nodeValue
            passing = i.getElementsByTagName("PassingSkill")[0].firstChild.nodeValue    
            scorer = i.getElementsByTagName("ScorerSkill")[0].firstChild.nodeValue
            kicker = i.getElementsByTagName("SetPiecesSkill")[0].firstChild.nodeValue
            motherclub = i.getElementsByTagName("MotherClubBonus")[0].firstChild.nodeValue

            pl = '''<li name="%s" id="%s" form="%s" experience="%s" loyalty="%s" keeper="%s" defender="%s" playmaker="%s" winger="%s" passing="%s" scorer="%s" kicker="%s" motherclub="%s">%s</li>''' % (name,playerid,form,experience,loyalty,keeper,defender,playmaker,winger,passing,scorer,kicker,motherclub,name)
            players.append(pl)
          
        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'training',{"version":2.2,"teamID":team})
        dom = parseString(xml)
        try:
            teamspirit = dom.getElementsByTagName("Morale")[0].firstChild.nodeValue
            confidence = dom.getElementsByTagName("SelfConfidence")[0].firstChild.nodeValue
        except:
            teamspirit = 5
            confidence = 5  
        
        return jsonify(players = players)

    elif name =="formationexperience":

        xml = oauth_helper.request_resource_with_key(token_key,secret_key,'training',{"version":2.2,'teamID':team})
        dom = parseString(xml)

        x550 = int(dom.getElementsByTagName("Experience550")[0].firstChild.nodeValue)
        x541 = int(dom.getElementsByTagName("Experience541")[0].firstChild.nodeValue)
        x532 = int(dom.getElementsByTagName("Experience532")[0].firstChild.nodeValue)
        x523 = int(dom.getElementsByTagName("Experience523")[0].firstChild.nodeValue)
        x451 = int(dom.getElementsByTagName("Experience451")[0].firstChild.nodeValue)
        x442 = int(dom.getElementsByTagName("Experience442")[0].firstChild.nodeValue)
        x433 = int(dom.getElementsByTagName("Experience433")[0].firstChild.nodeValue)
        x352 = int(dom.getElementsByTagName("Experience352")[0].firstChild.nodeValue)
        x343 = int(dom.getElementsByTagName("Experience343")[0].firstChild.nodeValue)
        x253 = int(dom.getElementsByTagName("Experience253")[0].firstChild.nodeValue)

      
        result = {"5-5-0":x550,"5-4-1":x541,"5-3-2":x532,"4-5-1":x451,"4-4-2":x442,"4-3-3":x433,"3-5-2":x352,"3-4-3":x343,"2-5-3":x253,"5-2-3":x523}
        return jsonify(result = result)


if __name__ == "__main__":
	app.run(debug=True)
