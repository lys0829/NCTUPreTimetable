import json
import re
import requests

Year = 109
Semester = 1

reqData = {"m_acy":Year,
            "m_sem":Semester,
            "m_acyend":Year,
            "m_semend":Semester,
            "m_dep_uid":"**",
            "m_group":"**",
            "m_grade":"**",
            "m_class":"**",
            "m_option":"**",
            "m_crsname":"**",
            "m_teaname":"**",
            "m_cos_id":"**",
            "m_cos_code":"**",
            "m_crstime":"**",
            "m_crsoutline":"**",
            "m_costype":"**"}
res = requests.post("https://timetable.nctu.edu.tw/?r=main/get_cos_list",data = reqData,headers={'user-agent': 'Mozilla/5.0'})
if res.status_code != 200:
    print("Request data error!!")
    exit()
OriginData = json.loads(res.text)

#with open("origin.json","r") as f:
#    OriginData = json.loads(f.read())

CourseData = {}
for D in OriginData:
    for SID in OriginData[D]:
        if re.match("^[0-9]+$",SID) == None:
            continue
        #print(SID)
        for CourseID in OriginData[D][SID]:
            if CourseID in CourseData:
                continue
            C = OriginData[D][SID][CourseID]
            CourseData[CourseID] = {
                "id": C["cos_id"],
                "name": C["cos_cname"],
                "time": C["cos_time"],
                "credit": C["cos_credit"],
                "teacher": C["teacher"]
            }

with open(str(Year)+str(Semester)+"-data.json","w") as f:
    f.write(json.dumps(CourseData))