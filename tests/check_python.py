import json,subprocess,sys
bad=0;n=0
for q in json.load(open('data/questions.json')):
    if q['t']!='po':continue
    n+=1
    r=subprocess.run([sys.executable,'-c',q['code']],capture_output=True,text=True,timeout=5)
    out=r.stdout.strip()
    if r.returncode or out!=q['a']:
        bad+=1;print('MISMATCH',q['id'],repr(q['code']),'got',repr(out or r.stderr[-80:]),'expected',repr(q['a']))
print('predict-output questions executed in Python:',n,'| mismatches:',bad);sys.exit(1 if bad else 0)
